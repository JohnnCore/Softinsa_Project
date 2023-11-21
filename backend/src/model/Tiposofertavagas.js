var Sequelize = require('sequelize');
var sequelize = require('./database');

var tiposofertavagas = sequelize.define('tiposofertavagas',{
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
module.exports = tiposofertavagas