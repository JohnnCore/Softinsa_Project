var Contactos = require('../model/Contactos');
var Oportunidades = require('../model/Oportunidades');
var Users = require('../model/Users');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/*LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Contactos.findAll({
        include: [ 
            {model:Oportunidades},
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
/*LISTAR OPORTUNIDADE---------------------- */
controllers.op_list = async (req,res) => {
    const { id } = req.params;
    const data = await Contactos.findAll({
        include: [
            {model: Oportunidades, where: { id: id }},
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
    const { id } = req.params;
    // data
    const {primeiro_nome, ultimo_nome, 
            telemovel, email, cargo,
    } = req.body;  
    // create
    const data = await Contactos.create({
        oportunidadeId : id,
        primeiro_nome : primeiro_nome,
        ultimo_nome: ultimo_nome,
        telemovel: telemovel,
        email: email,
        cargo_na_empresa : cargo,
    }) 
    .then(function(data){
        console.log(data)
        return data;
    })
    .catch(error =>{
        console.log("Erro: "+error)
        return error;
    })
    res.json({success:true, data:data, message:"Created successful"});

}
/* BUSCAR ----------------------------------------------- */
controllers.get = async (req,res) => {
    const { idOp, idCont } = req.params;
    const data = await Contactos.findOne({
        where: { id: idCont },
        include: [
            {model: Oportunidades, where: { id: idOp }},
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

/* EDITAR --------------------------------------------------- */
controllers.update = async (req,res) => {
    // parameter get id
    const { idCont, idOp } = req.params;
    // parameter POST
    const {primeiro_nome, ultimo_nome, 
        telemovel, email, cargo,
    } = req.body;     

    // Update data
    const now = new Date();
    const data = await Contactos.update({
        primeiro_nome : primeiro_nome,
        ultimo_nome: ultimo_nome,
        telemovel: telemovel,
        email: email,
        cargo_na_empresa : cargo,
        data_atualizacao: now.setHours(new Date().getHours()+2),
    },
    {
        where: { id: idCont}
    })
    .then( function(data){
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({success:true, data:data, message:"Updated successful"});
}

module.exports = controllers;