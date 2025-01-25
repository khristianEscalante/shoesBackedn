require('dotenv').config(); // Asegúrate de cargar las variables de entorno

module.exports = {
  development: {
    // Si hay una URL de conexión disponible, úsala
    use_env_variable: 'DB_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false,
      } : false,
    },
  },
  test: {
    username: process.env.DATA_BASE_USER,
    password: process.env.DATA_BASE_PASSWORD,
    database: process.env.DATA_BASE_NAME_TEST,
    host: process.env.DATA_BASE_HOST,
    port: process.env.DATA_BASE_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DB_URL', 
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
