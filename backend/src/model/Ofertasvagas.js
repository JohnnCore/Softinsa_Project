var Sequelize = require('sequelize');
var sequelize = require('./database');

var Estadosofertavagas = require('./Estadosofertavagas');
const Users = require('./Users');
var Tiposofertavagas = require('./Tiposofertavagas');
const tiposofertavagas = require('./Tiposofertavagas');

var ofertasvagas = sequelize.define('ofertasvagas',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estadosofertavagaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Estadosofertavagas,
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
    tiposofertavagaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Tiposofertavagas,
        key: 'id'
    }
    },
    titulo: Sequelize.STRING,
    departamento: Sequelize.STRING,
    localizacao: Sequelize.STRING,
    experiencia_anterior: Sequelize.SMALLINT,
    tempo_minimo_de_experiencia: Sequelize.STRING,
    habilitacoes_minimas: Sequelize.STRING,
    renumeracao_base_iliquida: Sequelize.STRING,
    descricao: Sequelize.STRING,
    imagem: Sequelize.STRING,
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
ofertasvagas.belongsTo(Estadosofertavagas)
ofertasvagas.belongsTo(Users)
ofertasvagas.belongsTo(tiposofertavagas)
module.exports = ofertasvagas