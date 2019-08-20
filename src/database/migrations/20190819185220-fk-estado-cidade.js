module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cidades', 'est_sigla', {
      type: Sequelize.STRING(2),
      references: { model: 'estados', key: 'est_sigla' },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('cidades', 'est_sigla');
  },
};
