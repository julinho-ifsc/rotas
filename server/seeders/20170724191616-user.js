const {generateSecurePassword} = require('../entities/user-entity')

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'willian',
          cpf: '532.820.857-96',
          email: 'riker@enterprise.com',
          password: await generateSecurePassword('Str0ngP4ssw0rd$'),
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()')
        }
      ],
      {}
    )
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
