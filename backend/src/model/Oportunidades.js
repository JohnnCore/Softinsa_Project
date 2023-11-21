var Sequelize = require('sequelize');
var sequelize = require('./database');

var Tiposdeprojetos = require('./Tiposdeprojetos')
var Areasdenegocios = require('./Areasdenegocio')
var Estadosoportunidades = require('./Estadosoportunidades')
var Users = require('./Users')

var Oportunidades = sequelize.define('oportunidades',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tiposdeprojetoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Tiposdeprojetos,
        key: 'id'
    }
    },
    areasdenegocioId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Areasdenegocios,
        key: 'id'
    }
    },
    estadosoportunidadeId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Estadosoportunidades,
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
    empresa: Sequelize.STRING,
    necessidades: Sequelize.STRING,
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
Oportunidades.belongsTo(Estadosoportunidades)
Oportunidades.belongsTo(Tiposdeprojetos)
Oportunidades.belongsTo(Areasdenegocios)
Oportunidades.belongsTo(Users)
module.exports = Oportunidades