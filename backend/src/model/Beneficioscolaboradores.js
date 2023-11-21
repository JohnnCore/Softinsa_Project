var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Beneficios = require('./Beneficios');

var beneficioscolaboradores = sequelize.define('beneficioscolaboradores',{
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // referência a outro modelo
        references: {
        model: Users,
        key: 'id'
    }
    },
    beneficioId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // referência a outro modelo
        references: {
        model: Beneficios,
        key: 'id'
    }
    }
},
{
    timestamps:false,
});
beneficioscolaboradores.belongsTo(Users)
beneficioscolaboradores.belongsTo(Beneficios)
module.exports = beneficioscolaboradores