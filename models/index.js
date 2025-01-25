'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Configuración de la base de datos a partir de variables de entorno
const config = {
  database: process.env.DATA_BASE_NAME,
  username: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PASSWORD,
  host: process.env.DATA_BASE_HOST,
  port: process.env.DATA_BASE_PORT, 
  dialect: 'postgres', 
};

let sequelize;
if (process.env.DB_URL) {
  // Si se proporciona una URL de conexión, se utiliza
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Permite certificados autofirmados o no verificados
      },
    },
  });
} else {
  // De lo contrario, se utiliza la configuración desglosada
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port, // Agrega el puerto aquí
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
