var Sequelize = require('sequelize');
var sequelize = require('./database');
var Entrevistas = require('./Entrevistas');
const Users = require('./Users');

var Notasentrevistas = sequelize.define('notasentrevistas',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    entrevistaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Entrevistas,
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
Notasentrevistas.belongsTo(Entrevistas)
Notasentrevistas.belongsTo(Users)
module.exports = Notasentrevistas