var Sequelize = require('sequelize');
var sequelize = require('./database');

var Oportunidades = require('./Oportunidades')
const Users = require('./Users');

var Contactos = sequelize.define('contactos',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    oportunidadeId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Oportunidades,
        key: 'id'
    }
    },
    primeiro_nome: Sequelize.STRING,
    ultimo_nome: Sequelize.STRING,
    telemovel: Sequelize.STRING,
    email: Sequelize.STRING,
    cargo_na_empresa: Sequelize.STRING
},
{
    timestamps:false,
});
Contactos.belongsTo(Oportunidades)
module.exports = Contactos