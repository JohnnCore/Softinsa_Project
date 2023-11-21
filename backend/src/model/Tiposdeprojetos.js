var Sequelize = require('sequelize');
var sequelize = require('./database');

var Tiposdeprojetos = sequelize.define('tiposdeprojetos',{
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
module.exports = Tiposdeprojetos