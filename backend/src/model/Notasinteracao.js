var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Interacoes = require('./Interacoes');

var Notasinteracao = sequelize.define('notasinteracaos',{
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
    interacoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Interacoes,
        key: 'id'
    }
    },
    titulo: Sequelize.STRING,
    detalhes: Sequelize.STRING,
    data_criacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    data_atualizacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
},
{
    timestamps:false,
});
Notasinteracao.belongsTo(Users)
Notasinteracao.belongsTo(Interacoes)
module.exports = Notasinteracao