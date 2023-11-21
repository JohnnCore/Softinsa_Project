var Users = require('../model/Users');
var Beneficios = require('../model/Beneficios');
var Tiposbeneficios = require('../model/Tiposbeneficios');
var Beneficioscolaboradores = require('../model/Beneficioscolaboradores');


var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR BENEFICIOS---------------------- */
controllers.listBeneficios = async (req,res) => {
    const data = await Beneficios.findAll({
        include: [ Tiposbeneficios ]
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}
/* LISTAR BENIFICIOS COM COLABORADORES---------------------- */
controllers.listBeneficioscolaboradores = async (req,res) => {
    const data = await Beneficioscolaboradores.findAll({
        include: [
            {model: Beneficios},
            {model: Users}
        ]
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