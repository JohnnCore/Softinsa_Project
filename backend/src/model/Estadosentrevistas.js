var Sequelize = require('sequelize');
var sequelize = require('./database');

var Estadosentrevistas = sequelize.define('estadosentrevistas',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: Sequelize.STRING
},
{
    timestamps:false,
});
module.exports = Estadosentrevistas