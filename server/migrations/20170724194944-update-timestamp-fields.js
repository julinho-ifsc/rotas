module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    })
  }
}
