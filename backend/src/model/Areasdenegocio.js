var Sequelize = require('sequelize');
var sequelize = require('./database');

var Areasdenegocio = sequelize.define('areasdenegocios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    area: Sequelize.STRING
},
{
    timestamps:false,
});
module.exports = Areasdenegocio