var Sequelize = require('sequelize');
var sequelize = require('./database');

var Tiposbeneficios = require('./Tiposbeneficios');

var Beneficios = sequelize.define('beneficios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tiposbeneficioId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Tiposbeneficios,
        key: 'id'
    }
    },
    beneficio: Sequelize.STRING
},
{
    timestamps:false,
});
Beneficios.belongsTo(Tiposbeneficios)
module.exports = Beneficios