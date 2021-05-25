const db = require("../../data/dbConfig.js")

function find() {
    return db("users")
}

function findByEmail(email) {
    return db("users")
        .where("email", email)
        .select("id", "email", "name", "password", "is_instructor")
}

function findById(id) {
    return db("users")
        .where("id", id)
        .select("id", "email", "name", "password", "is_instructor").first()
}

async function add(user) {
    const [id] = await db("users as u").insert(user).returning('id');
    return findById(id);
}

module.exports = {
    find,
    findById,
    findByEmail,
    add,
}