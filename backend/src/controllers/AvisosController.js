var Users = require('../model/Users');
var Avisos = require('../model/Avisos');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Avisos.findAll({
        include: [ Users ]
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}
/* REGISTAR ---------------------- */

module.exports = controllers;