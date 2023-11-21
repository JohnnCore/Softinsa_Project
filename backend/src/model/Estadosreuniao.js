var Sequelize = require('sequelize');
var sequelize = require('./database');

var Estadosreuniao = sequelize.define('estadosreuniaos',{
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
module.exports = Estadosreuniao