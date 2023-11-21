var Sequelize = require('sequelize');
var sequelize = require('./database');

const Users = require('./Users');


var Notificacoes = sequelize.define('notificacoes',{
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
        data_reuniao: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        mensagem: Sequelize.STRING,
        lido: Sequelize.SMALLINT,
        tipo: Sequelize.SMALLINT,
        reuniaoId: Sequelize.INTEGER,

    },
    {
        timestamps:false,
    });

    Notificacoes.belongsTo(Users)

module.exports = Notificacoes