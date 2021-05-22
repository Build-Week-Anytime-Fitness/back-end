const db = require("../../data/dbConfig.js")

function find() {
    return db("classes")
}

function findByName(name) {
    return db("classes")
        .where("class_name", name)
        .select("*")
}

function findByClassId(id) {
    return db('classes')
        .where('id', id)
        .select("*")
}

function findByInstructorId(id) {
    return db("classes")
        .where("instructor_id", id)
        .select("*")
}

//Instructor ID must also be passed by the instructor user account
async function add(newClass) {
    const id = await db("classes").insert(newClass);
    return id
}

async function remove(id) {
    const response = db('classes').where('id', id).del();
    return response
}

module.exports = {
    find,
    findByName,
    findByInstructorId,
    findByClassId,
    add,
    remove
}