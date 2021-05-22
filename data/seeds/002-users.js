exports.seed = async function (knex) {
  await knex('users').insert([
    { name: 'Captain America', email: 'ca@marvel.org', password: '$2y$14$tbXiGzQd.VpUPOUFoMRefeihG9i398gU.GosJa4.YG0XJ7IoXeQdS', is_adult: true, is_instructor: true },
    { name: 'Black Panther', email: 'bp@marvel.org', password: '$2y$14$tbXiGzQd.VpUPOUFoMRefeihG9i398gU.GosJa4.YG0XJ7IoXeQdS', is_adult: true, is_instructor: true },
    { name: 'The Hulk', email: 'th@marvel.org', password: '$2y$14$tbXiGzQd.VpUPOUFoMRefeihG9i398gU.GosJa4.YG0XJ7IoXeQdS', is_adult: true, is_instructor: false },
    { name: 'Green Lantern', email: 'gl@dc.org', password: '$2y$14$tbXiGzQd.VpUPOUFoMRefeihG9i398gU.GosJa4.YG0XJ7IoXeQdS', is_adult: true, is_instructor: false },
  ])
};
