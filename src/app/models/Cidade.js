import Sequelize, { Model } from 'sequelize';

class Cidade extends Model {
  static init(sequelize) {
    super.init(
      {
        cid_codigo: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        nome: Sequelize.STRING,
      },
      {
        tableName: 'cidades',
        freezeTableName: true,
        timestamps: false,

        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Estado, { foreignKey: 'est_sigla', as: 'estado' });
  }
}

export default Cidade;
