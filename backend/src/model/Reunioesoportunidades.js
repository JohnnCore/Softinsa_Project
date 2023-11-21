var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Oportunidades = require('./Oportunidades');
const Estadosreuniao = require('./Estadosreuniao');

var Reunioesoportunidades = sequelize.define('reunioesoportunidades',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Users,
        key: 'id'
    }
    },
    oportunidadeId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Oportunidades,
        key: 'id'
    }
    },
    estadosreuniaoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Estadosreuniao,
        key: 'id'
    }
    },
    titulo: Sequelize.STRING,
    data_reuniao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    detalhes: Sequelize.STRING
},
{
    timestamps:false,
});
Reunioesoportunidades.belongsTo(Users)
Reunioesoportunidades.belongsTo(Oportunidades)
Reunioesoportunidades.belongsTo(Estadosreuniao)
module.exports = Reunioesoportunidades