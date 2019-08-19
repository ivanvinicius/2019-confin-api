module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'confin',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
