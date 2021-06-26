'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Routes, {
        foreignKey: 'RouteId',
      })
    }
  }
  Ticket.init(
    {
      CustomerId: DataTypes.INTEGER,
      RouteId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Tickets',
    }
  )
  return Ticket
}
