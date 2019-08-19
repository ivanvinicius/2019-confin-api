import Sequelize, { Model } from 'sequelize';

class Estado extends Model {
  static init(sequelize) {
    super.init(
      {
        est_sigla: Sequelize.STRING,
        nome: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Estado;
