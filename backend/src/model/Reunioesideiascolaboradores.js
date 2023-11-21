var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Reunioesideias = require('./Reunioesideias');

var Reunioesideiascolaboradores = sequelize.define('reunioesideiascolaboradores',{
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // referência a outro modelo
        references: {
        model: Users,
        key: 'id'
    }
    },
    reunioesideiaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // referência a outro modelo
        references: {
        model: Reunioesideias,
        key: 'id'
    }
    }
},
{
    timestamps:false,
});
Reunioesideiascolaboradores.belongsTo(Users)
Reunioesideiascolaboradores.belongsTo(Reunioesideias)
module.exports = Reunioesideiascolaboradores