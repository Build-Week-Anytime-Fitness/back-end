const db = require("../../data/dbConfig.js")

function find() {
    return db("classes")
}

function findByName(name) {
    return db("classes")
        .where("class_name", name)
        .select("*")
}

function findById(id) {
    return db("classes")
        .where("instructor_id", id)
        .select("*")
}

//Instructor ID must also be passed by the instructor user account
async function add(newClass) {
    const id = await db("classes").insert(newClass);
    return id
}

module.exports = {
    find,
    findByName,
    findById,
    add,
}