'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PreviousTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreviousTrip.init(
    {
      RouteId: DataTypes.INTEGER,
      SourceId: DataTypes.INTEGER,
      DestinationId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      ScheduledDate: DataTypes.DATE,
      BusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'PreviousTrip',
    }
  )
  return PreviousTrip
}
