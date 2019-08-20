module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cidades', 'est_sigla', {
      type: Sequelize.STRING(2),
      primaryKey: true,
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
