var Users = require('../model/Users');
var Tiposinteracao = require('../model/Tiposinteracao');
var Contactos = require('../model/Contactos');
var Interacoes = require('../model/Interacoes');
var Oportunidades = require('../model/Oportunidades')

var sequelize = require('../model/database');

var moment = require('moment-timezone');


const adjustDateTime = (date) => {
    const timezone = 'Europe/London';
    const momentDate = moment.tz(date, timezone);

    // Verifica se a data está dentro do horário de verão
    const isDST = momentDate.isDST();
    console.log(isDST);
    if (isDST) {
        return momentDate.add(1, 'hour').toDate();
    } else {
        return date;
    }
};

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Interacoes.findAll({
        include: [
            {model: Users},
            {model: Tiposinteracao},
            {model: Contactos}
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
/* LISTAR CONTACTO ---------------------- */
controllers.list_contacto = async (req,res) => {
    const { idOp, idCont } = req.params;
    const data = await Interacoes.findAll({
        include: [
            {model: Users},
            {model: Tiposinteracao},
            {   model: Contactos, 
                where: {id:idCont}, 
                include:[
                    {model: Oportunidades, where:{id:idOp}
                }]
            },
            
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
    const { idOp, idCont } = req.params;
    // data
    const { tipo, motivo, user } = req.body;
    // create
    const data = await Interacoes.create({
        tiposinteracaoId: tipo,
        contactoId: idCont,
        userId: user,
        motivo: motivo,
        data_interacao: (adjustDateTime(new Date()))

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
    const { idOp, idCont, idInt } = req.params;
    const data = await Interacoes.findOne({
        where: { id: idInt },
        include: [
            {model: Users},
            {model: Tiposinteracao},
            {   model: Contactos, 
                where: {id:idCont}, 
                include:[
                    {model: Oportunidades, where:{id:idOp}
                }]
            },        
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
    const { idOp, idCont, idInt } = req.params;
    // parameter POST
    const { tipo, motivo, } = req.body;
  
    // Update data
    const data = await Interacoes.update({
        tiposinteracaoId: tipo,
        motivo: motivo,
    },
    {
        where: { id: idInt}
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