import Sequelize, { Model } from 'sequelize';

class Pessoa extends Model {
  static init(sequelize) {
    super.init(
      {
        pes_codigo: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        nome: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        email: Sequelize.STRING,
      },
      {
        tableName: 'pessoas',
        freezeTableName: true,
        timestamps: false,

        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cidade, { foreignKey: 'cid_codigo', as: 'cidade' });
  }
}

export default Pessoa;
