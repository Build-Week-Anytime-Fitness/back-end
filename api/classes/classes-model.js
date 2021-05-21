const db = require("../../data/dbConfig.js")

function find() {
    return db("classes")
}

function findByName(name) {
    return db("classes")
        .where("className", name)
        .select("*")
}

function findById(id) {
    return db("classes")
        .where("id", id)
        .select("*").first()
}

//Instructor ID must also be passed by the client
async function add(newClass) {
    const [id] = await db("classes").insert(newClass);
    return findById(id)
}

module.exports = {
    find,
    findByName,
    findById,
    add,
}