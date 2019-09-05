module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('logins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('logins');
  },
};
