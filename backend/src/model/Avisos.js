var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');

var Avisos = sequelize.define('avisos',{
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
    data_criacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    aviso: Sequelize.STRING
},
{
    timestamps:false,
});
Avisos.belongsTo(Users)
module.exports = Avisos