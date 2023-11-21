var Sequelize = require('sequelize');
var sequelize = require('./database');

var Users = require('./Users');
var Ideias = require('./Ideias');
var Estadosreuniao = require('./Estadosreuniao');

var Reunioesideias = sequelize.define('reunioesideias',{
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
    ideiaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Ideias,
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
Reunioesideias.belongsTo(Users)
Reunioesideias.belongsTo(Ideias)
Reunioesideias.belongsTo(Estadosreuniao)
module.exports = Reunioesideias