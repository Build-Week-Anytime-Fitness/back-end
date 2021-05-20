const db = require("../../data/dbConfig.js")

function find() {
    return db("users")
}

function findByEmail(email) {
    return db("users as u")
        .where("email", email)
        .select("u.id", "u.email", "u.name", "u.password", "u.isInstructor")
}

function findById(id) {
    return db("users as u")
        .where("id", id)
        .select("u.id", "u.email", "u.name", "u.password", "u.isInstructor").first()
}

async function add(newUser) {
    const [id] = await db("users as u").insert(newUser)
    return findById(id)
}

module.exports = {
    find,
    findById,
    findByEmail,
    add,
}