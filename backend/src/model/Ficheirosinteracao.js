var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Interacoes = require('./Interacoes')

var Ficheirosinteracao = sequelize.define('ficheirosinteracaos',{
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
    ficheiro: Sequelize.STRING
},
{
    timestamps:false,
});
Ficheirosinteracao.belongsTo(Users)
Ficheirosinteracao.belongsTo(Interacoes)
module.exports = Ficheirosinteracao