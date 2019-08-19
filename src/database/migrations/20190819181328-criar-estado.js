module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('estados', {
      est_sigla: {
        type: Sequelize.STRING(2),
        allowNull: false,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('estados');
  },
};
