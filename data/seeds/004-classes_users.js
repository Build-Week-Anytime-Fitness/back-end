exports.seed = async function (knex) {
  await knex('classes_users').insert([
    { class_id: 1, client_id: 3 },
    { class_id: 2, client_id: 4 },
    { class_id: 3, client_id: 4 },
    { class_id: 4, client_id: 3 },
    { class_id: 5, client_id: 3 },
  ])
};
