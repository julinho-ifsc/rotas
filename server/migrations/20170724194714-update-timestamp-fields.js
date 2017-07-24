module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    })
  }
}
