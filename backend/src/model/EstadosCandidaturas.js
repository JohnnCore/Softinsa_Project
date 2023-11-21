var Sequelize = require('sequelize');
var sequelize = require('./database');

var Estadoscandidatura = sequelize.define('estadoscandidaturas',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: Sequelize.STRING
},
{
    timestamps:false,
});
module.exports = Estadoscandidatura