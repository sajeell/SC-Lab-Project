'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Station.hasMany(models.Routes, {
        foreignKey: 'SourceId',
      })
      Station.hasMany(models.Routes, {
        foreignKey: 'DestinationId',
      })
    }
  }
  Station.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Stations',
    }
  )
  return Station
}
