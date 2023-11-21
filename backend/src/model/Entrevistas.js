var Sequelize = require('sequelize');
var sequelize = require('./database');
var Estadosentrevistas = require('./Estadosentrevistas');
var Candidaturas = require('./Candidaturas');
const Users = require('./Users');

var Entrevistas = sequelize.define('entrevistas',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estadosentrevistaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Estadosentrevistas,
        key: 'id'
    }
    },
    candidaturaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Candidaturas,
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
    entrevistadorId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Users,
        key: 'id'
    }
    },
    detalhes: Sequelize.STRING,
    data_entrevista: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    classificacao: Sequelize.INTEGER
},
{
    timestamps:false,
});
Entrevistas.belongsTo(Estadosentrevistas)
Entrevistas.belongsTo(Candidaturas)
Entrevistas.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Entrevistas.belongsTo(Users, { foreignKey: 'entrevistadorId', as: 'entrevistador' });

module.exports = Entrevistas