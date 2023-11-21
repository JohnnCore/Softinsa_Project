var Sequelize = require('sequelize');
var sequelize = require('./database');

var Tiposbeneficios = sequelize.define('tiposbeneficios',{
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
module.exports = Tiposbeneficios