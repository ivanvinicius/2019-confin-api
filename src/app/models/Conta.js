import Sequelize, { Model } from 'sequelize';

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        cnt_numero: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        descricao: Sequelize.STRING(120),
        data: Sequelize.DATE,
        valor: Sequelize.FLOAT,
        tipo: Sequelize.STRING(1),
        situacao: Sequelize.STRING(1),
      },
      {
        tableName: 'contas',
        freezeTableName: true,
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pessoa, { foreignKey: 'pes_codigo', as: 'pessoa' });
  }
}

export default Conta;
