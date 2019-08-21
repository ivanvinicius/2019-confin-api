import Sequelize, { Model } from 'sequelize';

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        cnt_numero: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        descricao: Sequelize.STRING,
        data: Sequelize.DATE,
        valor: Sequelize.FLOAT,
        tipo: Sequelize.STRING,
        situacao: Sequelize.STRING,
      },
      {
        tableName: 'contas',
        freezeTableName: true,
        timestamps: false,

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
