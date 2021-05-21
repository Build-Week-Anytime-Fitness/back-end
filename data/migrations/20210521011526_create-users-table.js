exports.up = async function (knex) {

    await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('name', 255).notNullable()
        table.string('email', 255).notNullable().unique()
        table.string('password', 255).notNullable()
        table.boolean('is_adult').defaultTo(true)
        table.boolean('is_instructor').notNull()
    })



    await knex.schema.createTable('classes', (table) => {
        table.increments('id')
        table.string('class_name', 255).notNullable().unique()
        table.string('class_type', 255).notNullable()
        table.string('class_date', 255).notNullable()
        table.string('start_time', 255).notNullable()
        table.integer('duration').unsigned().notNullable()
        table.string('intensity', 255).notNullable()
        table.string('location', 255)
        table.integer('max_class_size').unsigned().notNull()
        table.integer('instructor_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    })


    await knex.schema.createTable('classes_users', (table) => {
        table.integer('class_id').unsigned().references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('client_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
        table.primary(['class_id', 'client_id'])
    })

};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('classes_users')
    await knex.schema.dropTableIfExists('classes')
    await knex.schema.dropTableIfExists('users')
};
