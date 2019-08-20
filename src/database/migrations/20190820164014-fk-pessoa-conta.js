module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contas', 'pes_codigo', {
      type: Sequelize.INTEGER,
      references: { model: 'pessoas', key: 'pes_codigo' },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('contas', 'pes_codigo');
  },
};
