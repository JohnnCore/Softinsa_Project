var Sequelize = require('sequelize');
var sequelize = require('./database');

var Estadosopurtunidades = sequelize.define('estadosoportunidades',{
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
module.exports = Estadosopurtunidades