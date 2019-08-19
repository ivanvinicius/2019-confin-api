module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cidades', {
      cid_codigo: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('cidades');
  },
};
