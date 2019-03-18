import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    timestamps: false,
    underscored: true,
  },
});

const models = {};
const currFile = path.basename(__filename);

// Import and connect all the models to the DB.
fs
  .readdirSync(__dirname)
  .forEach((file) => {
    if (file !== currFile) {
      const model = sequelize.import(path.join(__dirname, file));
      models[model.name] = model;
    }
  });

// Process any associations.
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.Sequelize = Sequelize;
models.sequelize = sequelize;

module.exports = models;
