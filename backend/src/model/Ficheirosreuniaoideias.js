var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Reunioesideias = require('./Reunioesideias')

var Ficheirosreuniaoideias = sequelize.define('ficheirosreuniaoideias',{
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
    reunioesideiaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Reunioesideias,
        key: 'id'
    }
    },
    ficheiro: Sequelize.STRING
},
{
    timestamps:false,
});
Ficheirosreuniaoideias.belongsTo(Users)
Ficheirosreuniaoideias.belongsTo(Reunioesideias)
module.exports = Ficheirosreuniaoideias