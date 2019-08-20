import Sequelize, { Model } from 'sequelize';

class Estado extends Model {
  static init(sequelize) {
    super.init(
      {
        est_sigla: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        nome: Sequelize.STRING,
      },
      {
        tableName: 'estados',
        freezeTableName: true,
        sequelize,
      }
    );

    return this;
  }
}

export default Estado;
