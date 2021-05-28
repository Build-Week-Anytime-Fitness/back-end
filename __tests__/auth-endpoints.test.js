const supertest = require("supertest")
const server = require("../api/server.js")
const db = require("../data/dbConfig.js")


beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})



test('sanity', () => {
    expect(true).toBe(true)
})

describe("test login, register, instructorClasses and client classes endpoints", () => {
    it("checks that name, email, password and is_instructor value are provided while registering ", async () => {
        const res = await supertest(server).post("/api/register").send({ name: 'Batman', email: 'bt@dc.org', password: 'password' })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('specify a bool value to specify if the user is an instructor')
    })



    it("checks that the user gets a welcome message upon successful login", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'ca@marvel.org', password: 'password' })
        expect(res.body.token).toBeDefined()
        expect(res.body.message).toBe('welcome, Captain America')
    })

    it("checks that the user gets a account does not exist message if the account does not exist yet", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'bt@dc.org', password: 'password' })
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toBe('This account does not exist')
    })


    it("checks that the user gets a success message upon successful registeration", async () => {
        const res = await supertest(server).post("/api/register").send({ name: "Batman", email: 'bt@dc.org', password: 'password', is_instructor: true })
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe('User Batman successfully registered')
    })


    it("checks that the user cannot register with email which already exists", async () => {
        const res = await supertest(server).post("/api/register").send({ name: 'Winter Soldier', email: 'ca@marvel.org', password: 'password', is_instructor: false })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('email already taken')
    })


    it("checks that all available classes are obtained after successfull login", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'ca@marvel.org', password: 'password' })
        expect(res.statusCode).toBe(200)
        const res2 = await supertest(server).get("/api/classes").set('authorization', res.body.token)
        expect(res2.body.length).toBe(5)
    })


    it("checks that classes can be obtained for each specific instructor", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'bp@marvel.org', password: 'password' })
        expect(res.statusCode).toBe(200)
        const res2 = await supertest(server).get("/api/classes/2").set('authorization', res.body.token)
        expect(res2.body.length).toBe(2)
        expect(res2.body[0].instructor_id).toBe(2)
    })

    it("checks that a class can only be deleted by an instructor", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'gl@dc.org', password: 'password' })
        expect(res.statusCode).toBe(200)
        const res2 = await supertest(server).delete("/api/classes/5").set('authorization', res.body.token)
        expect(res2.body.message).toBe('You are not an instructor!!!')
    })

    it("checks that a class belonging to another instructor cannot be deleted", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'ca@marvel.org', password: 'password' })
        expect(res.statusCode).toBe(200)
        const res2 = await supertest(server).delete("/api/classes/5").set('authorization', res.body.token)
        expect(res2.body.message).toBe("You cannot delete someone else's class!!!")

    })

    it("checks that a unique_name is provided while adding a new fitness class", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'ca@marvel.org', password: 'password' })
        expect(res.statusCode).toBe(200)
        const res2 = await supertest(server).post("/api/classes").set('authorization', res.body.token).send({
            "class_name": "Trip to Nirvana",
            "class_type": "weights plus cardio",
            "class_date": "Monday",
            "start_time": "7:30 PM",
            "duration": 30,
            "intensity": "high",
            "location": "park",
            "max_class_size": 15,
            "instructor_id": 5
        })
        expect(res2.statusCode).toBe(400)
        expect(res2.body.message).toBe("Select a different class name!")

    })
})