var Sequelize = require('sequelize');
var sequelize = require('./database');

var Tiposdeideias = sequelize.define('tipodeideias',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: Sequelize.STRING
},
{
    timestamps:false,
});
module.exports = Tiposdeideias