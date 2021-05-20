exports.up = async function (knex) {

    await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('name', 255).notNullable()
        table.string('email', 255).notNullable().unique()
        table.string('password', 255).notNullable()
        table.boolean('isAdult').defaultTo(true)
        table.boolean('isInstructor').notNull()
    })


    await knex.schema.createTable('fitnessClasses', (table) => {
        table.increments('id')
        table.string('className', 255).notNullable().unique()
        table.string('classType', 255).notNullable()
        table.string('classDate', 255).notNullable()
        table.string('startTime', 255).notNullable()
        table.integer('duration').unsigned().notNullable()
        table.string('intensity', 255).notNullable()
        table.string('location', 255)
        table.integer('maxClassSize').unsigned()
        table.integer('instructor_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    })

    await knex.schema.createTable('classes_users', (table) => {
        table.integer('class_id').unsigned().references('id').inTable('fitnessClasses').onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('client_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
        table.primary(['class_id', 'client_id'])
    })

};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('classes_users')
    await knex.schema.dropTableIfExists('fitnessClasses')
    await knex.schema.dropTableIfExists('users')
};
