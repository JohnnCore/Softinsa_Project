var Users = require('../model/Users');
var Tiposdeideias = require('../model/Tiposdeideias');
var Ideias = require('../model/Ideias');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Ideias.findAll({
        include: [
            {model: Tiposdeideias},
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
controllers.create = async (req,res) => {
    // data
    const { tipoideia, titulo, descricao, user} = req.body;
    // create
    const data = await Ideias.create({
        tipodeideiaId: tipoideia,
        userId: user,
        titulo: titulo,
        descricao: descricao,
    }) 
    .then(function(data){
        console.log(data)
        return data; 
    })
    .catch(error =>{
        console.log("Erro: "+error)
        return error;
    })
    res.json({ success: true, data: data, message: "Created successful" });
}

/* BUSCAR ----------------------------------------------- */
controllers.get = async (req,res) => {
    const { id } = req.params;
    const data = await Ideias.findOne({
        where: { id: id },
        include: [
            {model: Tiposdeideias},
            {model: Users},
        ]
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        return error;
    })
    res.json({ success: true, data: data });
}

module.exports = controllers;