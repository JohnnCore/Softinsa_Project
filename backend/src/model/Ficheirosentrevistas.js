var Sequelize = require('sequelize');
var sequelize = require('./database');
const Users = require('./Users');
const Entrevistas = require('./Entrevistas');

var Ficheirosentrevistas = sequelize.define('ficheirosentrevistas',{
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
    entrevistaId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Entrevistas,
        key: 'id'
    }
    },
    ficheiro: Sequelize.STRING

},
{
    timestamps:false,
});
Ficheirosentrevistas.belongsTo(Users)
Ficheirosentrevistas.belongsTo(Entrevistas)
module.exports = Ficheirosentrevistas