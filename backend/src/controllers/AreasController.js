var Areasdenegocio = require('../model/Areasdenegocio');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Areasdenegocio.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}
/* CRIAR ---------------------- */
controllers.create = async (req,res) => {
    const { area } = req.body;
    const data = await Areasdenegocio.create({
        area: area
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        console.log("Erro: " + error)
        return error;
    });
    res.status(200).json({
        success:true,
        message:"Areas de Negocio criada com sucesso!",
        data: data
    });
}

module.exports = controllers;