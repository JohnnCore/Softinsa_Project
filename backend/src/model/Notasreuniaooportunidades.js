var Sequelize = require('sequelize');
var sequelize = require('./database');
var Reunioesoportunidades = require('./Reunioesoportunidades');
const Users = require('./Users');

var Notasreuniaooportunidades = sequelize.define('notasreuniaooportunidades',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reunioesoportunidadeId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Reunioesoportunidades,
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
Notasreuniaooportunidades.belongsTo(Reunioesoportunidades)
Notasreuniaooportunidades.belongsTo(Users)
module.exports = Notasreuniaooportunidades