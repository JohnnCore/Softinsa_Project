var Sequelize = require('sequelize');
var sequelize = require('./database');
const Contactos = require('./Contactos');
const Users = require('./Users');
const Tiposinteracao = require('./Tiposinteracao')

var Interacoes = sequelize.define('interacoes',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contactoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Contactos,
        key: 'id'
    }
    },
    userId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Users,
        key: 'id'
    }
    },
    tiposinteracaoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Tiposinteracao,
        key: 'id'
    }
    },
    motivo: Sequelize.STRING,
    data_interacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
},
{
    timestamps:false,
});
Interacoes.belongsTo(Contactos)
Interacoes.belongsTo(Users)
Interacoes.belongsTo(Tiposinteracao)
module.exports = Interacoes