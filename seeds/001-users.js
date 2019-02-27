
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
        username: 'test1',
        password: 'password',
        department: 'Homeland Security'
      },
        {
        username: 'test2',
        password: 'password',
        department: 'Homeland Security'
      },
        {
        username: 'test3',
        password: 'password',
        department: 'Homeland Security'
      }
      ]);
    });
};
