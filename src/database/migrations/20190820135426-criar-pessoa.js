module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas', {
      pes_codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('pessoas');
  },
};
