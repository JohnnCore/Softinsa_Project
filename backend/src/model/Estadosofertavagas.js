var Sequelize = require('sequelize');
var sequelize = require('./database');

var estadosofertavagas = sequelize.define('estadosofertavagas',{
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
module.exports = estadosofertavagas