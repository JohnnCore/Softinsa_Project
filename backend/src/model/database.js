const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://admin:BVjUI5xsGJt45Ykq5aYG9vt0yYvqMCVG@dpg-chag25e7avj5o4bcc4pg-a.frankfurt-postgres.render.com/projeto_7avi', 
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
