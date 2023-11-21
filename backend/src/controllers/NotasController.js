var Users = require('../model/Users');
var Notasentrevistas = require('../model/Notasentrevistas');
var Entrevistas = require('../model/Entrevistas');
var Notasinteracao = require('../model/Notasinteracao');
var Interacoes = require('../model/Interacoes');
var Notasreuniaoideias = require('../model/Notasreuniaoideias');
var Reunioesideias = require('../model/Reunioesideias');
var Notasreuniaooportunidades = require('../model/Notasreuniaooportunidades');
var Reunioesoportunidades = require('../model/Reunioesoportunidades');
var Contactos = require('../model/Contactos')
var Oportunidades = require('../model/Oportunidades')
var Candidaturas = require('../model/Candidaturas')
var Ofertasvagas = require('../model/Ofertasvagas')
var Ideias = require('../model/Ideias')

var sequelize = require('../model/database');

var moment = require('moment-timezone');


const adjustDateTime = (date) => {
    const timezone = 'Europe/London';
    const momentDate = moment.tz(date, timezone);

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
/* Notasentrevistas ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listNotasentrevistas = async (req,res) => {
        const data = await Notasentrevistas.findAll({
            include: [ Users ],
            include: [ Entrevistas ]
        })
        .then(function(data){
            return data;
        })
        .catch(error => {
            return error;
        });
        res.json({success : true, data : data});
    }

    /* LISTAR ENTREVISTA ---------------------- */
    controllers.list_ent = async (req,res) => {
        const { idEnt, idCand, idOferta } = req.params;
        const data = await Notasentrevistas.findAll({
            include: [
                {model: Users},
                {model: Entrevistas, where: {id: idEnt}, 
                    include: [
                        {model: Candidaturas, where:{id: idCand}, 
                            include: [
                                {model: Ofertasvagas, where: {id: idOferta} }
                            ]
                        }
                    ]
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
    controllers.createNotasEntrevistas = async (req,res) => {
        const { idEnt, idCand, idOferta } = req.params;
        // data
        const { titulo, detalhes, user} = req.body;
        // create
        const now = new Date();
        const data = await Notasentrevistas.create({
            entrevistaId: idEnt,
            userId: user, 
            titulo: titulo,
            detalhes: detalhes,
            data_criacao: (adjustDateTime(now)),
            data_atualizacao: (adjustDateTime(now)),
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
    controllers.getNotaEntrevista = async (req,res) => {
        const { idOferta, idCand, idEnt, idNota } = req.params;
        const data = await Notasentrevistas.findOne({
            where: { id: idNota },
            include: [
                {model: Users},
                {model: Entrevistas, where: {id: idEnt}, 
                    include: [
                        {model: Candidaturas, where:{id: idCand}, 
                            include: [
                                {model: Ofertasvagas, where: {id: idOferta} }
                            ]
                        }
                    ]
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
    
    controllers.updateNotaEntrevista = async (req,res) => {
        // parameter get id
        const { idOferta, idCand, idEnt, idNota } = req.params;
        // parameter POST
        const { titulo, detalhes, } = req.body;
    
        // Update data
        const data = await Notasentrevistas.update({
            titulo: titulo,
            detalhes: detalhes,
            data_atualizacao: (adjustDateTime(new Date())),
        },
        {
            where: { id: idNota}
        })
        .then( function(data){
            return data;
        })
        .catch(error => {
            return error;
        })
        res.json({success:true, data:data, message:"Updated successful"});
    }


/* Notasinteracao ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listNotasinteracao = async (req,res) => {
        const data = await Notasinteracao.findAll({
            include: [
                {model: Users},
                {model: Interacoes}
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


    /* LISTAR INTERACAO ---------------------- */
    controllers.list_int = async (req,res) => {
        const { idInt, idCont, idOp } = req.params;
        const data = await Notasinteracao.findAll({
            include: [
                {model: Users},
                {model: Interacoes, where: {id: idInt}, 
                    include: [
                        {model: Contactos, where:{id: idCont}, 
                            include: [
                                {model: Oportunidades, where: {id: idOp} }
                            ]
                        }
                    ]
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
    controllers.createNotasInteracoes = async (req,res) => {
        const { idInt, idCont } = req.params;
        // data
        const { titulo, detalhes, user} = req.body;
        // create
        const now = new Date();
        const data = await Notasinteracao.create({
            interacoId: idInt,
            contactoId: idCont,
            userId: user,
            titulo: titulo,
            detalhes: detalhes,
            data_criacao: (adjustDateTime(now)),
            data_atualizacao: (adjustDateTime(now)),
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
    controllers.getNotaInteracao = async (req,res) => {
    const { idOp, idCont, idInt, idNota } = req.params;
    const data = await Notasinteracao.findOne({
        where: { id: idNota },
        include: [
            {model: Users},
            {model: Interacoes, where: {id: idInt}, 
                include: [
                    {model: Contactos, where:{id: idCont}, 
                        include: [
                            {model: Oportunidades, where: {id: idOp} }
                        ]
                    }
                ]
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
    controllers.updateNotaInteracao = async (req,res) => {
        // parameter get id
        const { idOp, idCont, idInt, idNota } = req.params;
        // parameter POST
        const { titulo, detalhes, } = req.body;

        // Update data
        const data = await Notasinteracao.update({
            titulo: titulo,
            detalhes: detalhes,
            data_atualizacao: (adjustDateTime(new Date())),
        },
        {
            where: { id: idNota}
        })
        .then( function(data){
            return data;
        })
        .catch(error => {
            return error;
        })
        res.json({success:true, data:data, message:"Updated successful"});
    }
/* Notasreuniaoideias ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listNotasreuniaoideias = async (req,res) => {
        const data = await Notasreuniaoideias.findAll({
            include: [
                {model: Users},
                {model: Reunioesideias}
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

    /* LISTAR REUNIAO---------------------- */
    controllers.listNotasreuniaoideias = async (req,res) => {
        const { idIdeia, idReuniao } = req.params;
        const data = await Notasreuniaoideias.findAll({
            include: [
                {model: Users},
                {model: Reunioesideias, where: {id: idReuniao},
                    include: [
                        {model: Ideias, where:{id: idIdeia}}
                    ]
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
    controllers.createNotasReuniaoIdeia = async (req,res) => {
        const { idIdeia, idReuniao } = req.params;
        console.log(req.body);
        // data
        const { titulo, detalhes, user} = req.body;
        // create
        const now = new Date();
        const data = await Notasreuniaoideias.create({
            reunioesideiaId: idReuniao,
            userId: user, 
            titulo: titulo,
            detalhes: detalhes,
            data_criacao: (adjustDateTime(now)),
            data_atualizacao: (adjustDateTime(now)),
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
    controllers.getNotaReuniaoIdeia = async (req,res) => {
        const { idNota, idReuniao, idIdeia } = req.params;
        const data = await Notasreuniaoideias.findOne({
            where: { id: idNota },
            include: [
                {model: Users},
                {model: Reunioesideias, where: {id: idReuniao},
                    include: [
                        {model: Ideias, where:{id: idIdeia}}
                    ]
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
    controllers.updateNotaReuniaoIdeia = async (req,res) => {
        // parameter get id
        const { idNota, idReuniao, idIdeia } = req.params;
        // parameter POST
        const { titulo, detalhes, } = req.body;
    
        // Update data
        const data = await Notasreuniaoideias.update({
            titulo: titulo,
            detalhes: detalhes,
            data_atualizacao: (adjustDateTime(new Date())),
        },
        {
            where: { id: idNota}
        })
        .then( function(data){
            return data;
        })
        .catch(error => {
            return error;
        })
        res.json({success:true, data:data, message:"Updated successful"});
    }


/* Notasreuniaooportunidades ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listNotasreunioesportunidades = async (req,res) => {
        const data = await Notasreuniaooportunidades.findAll({
            include: [
                {model: Users},
                {model: Reunioesoportunidades}
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

    /* LISTAR REUNIAO---------------------- */
    controllers.listNotasreuniaooportunidades = async (req,res) => {
        const { idOp, idReuniao } = req.params;
        const data = await Notasreuniaooportunidades.findAll({
            include: [
                {model: Users},
                {model: Reunioesoportunidades, where: {id: idReuniao},
                    include: [
                        {model: Oportunidades, where:{id: idOp}}
                    ]
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
    controllers.createNotasReuniaoOportunidade = async (req,res) => {
        const { idReuniao, idOp } = req.params;
        // data
        const { titulo, detalhes, user} = req.body;
        // create
        const now = new Date();
        const data = await Notasreuniaooportunidades.create({
            reunioesoportunidadeId: idReuniao,
            userId: user, 
            titulo: titulo,
            detalhes: detalhes,
            data_criacao: (adjustDateTime(now)),
            data_atualizacao: (adjustDateTime(now)),
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
    controllers.getNotaReuniaoOportunidade = async (req,res) => {
        const { idNota, idReuniao, idOp } = req.params;
        const data = await Notasreuniaooportunidades.findAll({
            where: { id: idNota },
            include: [
                {model: Users},
                {model: Reunioesoportunidades, where: {id: idReuniao},
                    include: [
                        {model: Oportunidades, where:{id: idOp}}
                    ]
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
    controllers.updateNotaReuniaoOportunidade = async (req,res) => {
        // parameter get id
        const { idNota, idReuniao, idOp } = req.params;
        // parameter POST
        const { titulo, detalhes, } = req.body;
    
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        // Update data
        const data = await Notasreuniaooportunidades.update({
            titulo: titulo,
            detalhes: detalhes,
            data_atualizacao: (adjustDateTime(new Date())),
        },
        {
            where: { id: idNota}
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