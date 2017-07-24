module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.TEXT,
    password: DataTypes.STRING
  })
  return User
}
