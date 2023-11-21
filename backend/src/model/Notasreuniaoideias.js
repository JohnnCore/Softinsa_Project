var Sequelize = require('sequelize');
var sequelize = require('./database');
var Reunioesideias = require('./Reunioesideias');
const Users = require('./Users');

var Notasreuniaoideias = sequelize.define('notasreuniaoideias',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reunioesideiaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Reunioesideias,
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
Notasreuniaoideias.belongsTo(Reunioesideias)
Notasreuniaoideias.belongsTo(Users)
module.exports = Notasreuniaoideias