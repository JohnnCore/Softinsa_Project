var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Reunioesoportunidades = require('./Reunioesoportunidades');

var Ficheirosreuniaooportunidades = sequelize.define('ficheirosreuniaooportunidades',{
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
    reunioesoportunidadeId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Reunioesoportunidades,
        key: 'id'
    }
    },
    ficheiro: Sequelize.STRING
},
{
    timestamps:false,
});
Ficheirosreuniaooportunidades.belongsTo(Users)
Ficheirosreuniaooportunidades.belongsTo(Reunioesoportunidades)
module.exports = Ficheirosreuniaooportunidades