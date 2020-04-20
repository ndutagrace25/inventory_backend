'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: 'Grace',
      lastName: 'Nduta',
      phone: '0708807403',
      userType: 1,
      password: '$2a$10$ECdOnZkH6ZRE9jzvUst4x.PNqKwgSHcaoceTxazjMRg1VojEpHh6S',
      status: 1,
      resetPassword: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};