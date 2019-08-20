module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contas', {
      cnt_numero: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      descricao: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      tipo: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },

      situacao: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('contas');
  },
};
