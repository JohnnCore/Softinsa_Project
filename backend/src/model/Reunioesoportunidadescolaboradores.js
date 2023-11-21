var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Reunioesoportunidades = require('./Reunioesoportunidades');

var Reunioesoportunidadescolaboradores = sequelize.define('reunioesoportunidadescolaboradores',{
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // referência a outro modelo
        references: {
        model: Users,
        key: 'id'
    }
    },
    reunioesoportunidadeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // referência a outro modelo
        references: {
        model: Reunioesoportunidades,
        key: 'id'
    }
    },
},
{
    timestamps:false,
});
Reunioesoportunidadescolaboradores.belongsTo(Users)
Reunioesoportunidadescolaboradores.belongsTo(Reunioesoportunidades)
module.exports = Reunioesoportunidadescolaboradores