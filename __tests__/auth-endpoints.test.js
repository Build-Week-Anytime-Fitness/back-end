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

describe("test login and register endpoints", () => {
    it("checks that name, email, password and is_instructor value are provided while registering ", async () => {
        const res = await supertest(server).post("/api/register").send({ name: 'Batman', email: 'bt@dc.org', password: 'password' })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('specify a bool value to specify if the user is an instructor')
    })

    it("checks that the user gets a welcome message upon successful login", async () => {
        const res = await supertest(server).post("/api/login").send({ email: 'ca@marvel.org', password: 'password' })
        expect(res.statusCode).toBe(200)
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
})