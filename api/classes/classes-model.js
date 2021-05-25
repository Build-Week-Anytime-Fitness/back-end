const db = require("../../data/dbConfig.js")

function find() {
    return db("classes").orderBy('id')
}

function findByName(name) {
    return db("classes")
        .where("class_name", name)
        .select("*")
        .first()
}

function findByClassId(id) {
    return db('classes')
        .where('id', id)
        .select("*")
        .first()
}

function findByInstructorId(id) {
    return db("classes")
        .where("instructor_id", id)
        .select("*")
}

//Instructor ID must also be passed by the instructor user account
async function add(newClass) {
    const [id] = await db("classes").insert(newClass).returning('id');
    return findByClassId(id)
}

async function remove(id) {
    const record = db('classes').where('id', id).del();
    return record
}

async function updateClass(id, mutatedClass) {
    const [updatedId] = await db('classes').where('id', id).update(mutatedClass).returning('id')
    return findByClassId(updatedId);
}

module.exports = {
    find,
    findByName,
    findByInstructorId,
    findByClassId,
    add,
    remove,
    updateClass,
}