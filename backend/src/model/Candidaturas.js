var Sequelize = require('sequelize');
var sequelize = require('./database');
var Ofertavagas = require('./Ofertasvagas');
const Users = require('./Users');
var Estadoscandidatura = require('./EstadosCandidaturas')

var Candidaturas = sequelize.define('candidaturas',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ofertasvagaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Ofertavagas,
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
    estadoscandidaturaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Estadoscandidatura,
        key: 'id'
    }
    },
    curriculo: Sequelize.STRING,
    observacoes: Sequelize.STRING,
    data_candidatura: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
},
{
    timestamps:false,
});
Candidaturas.belongsTo(Users)
Candidaturas.belongsTo(Estadoscandidatura)
Candidaturas.belongsTo(Ofertavagas)
module.exports = Candidaturas