module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('pessoas', 'cid_codigo', {
      type: Sequelize.INTEGER,
      references: { model: 'cidades', key: 'cid_codigo' },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('pessoas', 'cid_codigo');
  },
};
