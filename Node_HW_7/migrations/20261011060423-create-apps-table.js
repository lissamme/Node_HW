
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Apps", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Apps");
  }
};
