'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Route.belongsTo(models.Buses)
      Route.belongsTo(models.Stations, {
        as: 'Source',
        foreignKey: 'SourceId',
      })
      Route.belongsTo(models.Stations, {
        as: 'Destination',
        foreignKey: 'DestinationId',
      })
      Route.hasMany(models.Tickets, {
        foreignKey: 'RouteId',
      })
    }
  }
  Route.init(
    {
      BusId: DataTypes.INTEGER,
      SourceId: DataTypes.INTEGER,
      DestinationId: DataTypes.INTEGER,
      seat_price: DataTypes.INTEGER,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Routes',
    }
  )
  return Route
}
