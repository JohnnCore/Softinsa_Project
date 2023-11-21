var Sequelize = require('sequelize');
var sequelize = require('./database');

var Tiposinteracao = sequelize.define('tiposinteracaos',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: Sequelize.STRING
},
{
    timestamps:false,
});
module.exports = Tiposinteracao