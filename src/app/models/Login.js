import Sequelize, { Model } from 'sequelize';

class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.STRING,
      },
      {
        timestamps: false,
        freezeTableName: true,
        tableName: 'logins',

        sequelize,
      }
    );

    return this;
  }

  checaSenha(senha) {
    return senha === this.senha;
  }
}

export default Login;
