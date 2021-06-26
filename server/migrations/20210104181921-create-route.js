'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BusId: {
        type: Sequelize.INTEGER,
      },
      SourceId: {
        type: Sequelize.INTEGER,
      },
      DestinationId: {
        type: Sequelize.INTEGER,
      },
      seat_price: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Routes')
  },
}
