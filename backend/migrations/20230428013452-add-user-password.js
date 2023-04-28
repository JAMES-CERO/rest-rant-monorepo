'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 'password_digest', {
        type: Sequelize.DataTypes.STRING
      })
  },

   down: async(queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'password_digest')
  }
};
