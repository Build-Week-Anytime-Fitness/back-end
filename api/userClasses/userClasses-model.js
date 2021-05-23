const db = require("../../data/dbConfig.js")

function findByClientID(clientID) {
    return db('classes_users as cus')
        .innerJoin('classes as cls', 'cls.id', 'cus.class_id')
        .innerJoin('users as urs', 'urs.id', 'cus.client_id')
        .where('urs.id', clientID)
        .select('urs.id as client_id',
            'urs.email',
            'cls.id as class_id',
            'cls.class_name',
            'cls.class_type',
            'cls.class_date',
            'cls.start_time',
            'cls.duration',
            'cls.duration',
            'cls.intensity',
            'cls.max_class_size',
            'cls.number_of_students')
}


async function signUpClasses(clientID_classIDObj) {
    const id = await db('classes_users as cus')
        .insert(clientID_classIDObj)
    return id;
}

async function dropClasses(id) {
    const removed = await db('classes_users as cus').where('class_id', id).del();
    return removed;
}

module.exports = {
    findByClientID,
    signUpClasses,
    dropClasses,
}