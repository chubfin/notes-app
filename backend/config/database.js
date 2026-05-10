// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'notes_123230124',
  'admin',       
  'mypassword', 
  {
    host: '34.172.113.167',
    dialect: 'mysql',
    logging: false, // Biar log terminal bersih
  }
);

module.exports = sequelize;