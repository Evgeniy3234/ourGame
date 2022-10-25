const sha256 = require('sha256');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Evgeniy',
        email: 'evgeniy@gmail.com',
        password: sha256('123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Roman',
        email: 'roman@gmail.com',
        password: sha256('123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Evgeniya',
        email: 'evgeniya@evgeniya.com',
        password: sha256('123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
