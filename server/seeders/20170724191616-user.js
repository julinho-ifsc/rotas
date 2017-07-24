const {generateSecurePassword} = require('../entities/user-entity')

module.exports = {
  up: async function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'willian',
      cpf: '532.820.857-96',
      email: 'riker@enterprise.com',
      password: await generateSecurePassword('Str0ngP4ssw0rd$'),
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }], {})
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
