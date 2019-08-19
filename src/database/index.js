import Sequelize from 'sequelize';

import Estado from '../app/models/Estado';

import databaseConfig from '../config/database';

const models = [Estado];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
