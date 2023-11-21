var Sequelize = require('sequelize');
var sequelize = require('./database');

const Users = require('./Users');
const Tiposdeideias = require('./Tiposdeideias')

var Ideias = sequelize.define('ideias',{
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
    tipodeideiaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Tiposdeideias,
        key: 'id'
    } 
    },
    titulo: Sequelize.STRING,
    descricao: Sequelize.STRING
},
{
    timestamps:false,
});
Ideias.belongsTo(Users)
Ideias.belongsTo(Tiposdeideias)
module.exports = Ideias