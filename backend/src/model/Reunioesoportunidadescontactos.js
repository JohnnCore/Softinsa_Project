var Sequelize = require('sequelize');
var sequelize = require('./database');
const Contactos = require('./Contactos');
const Reunioesoportunidades = require('./Reunioesoportunidades');

var Reunioesoportunidadescontactos = sequelize.define('reunioesoportunidadescontactos',{
    contactoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // referência a outro modelo
        references: {
        model: Contactos,
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
    }
},
{
    timestamps:false,
});
Reunioesoportunidadescontactos.belongsTo(Contactos)
Reunioesoportunidadescontactos.belongsTo(Reunioesoportunidades)
module.exports = Reunioesoportunidadescontactos