var Users = require('../model/Users');
var Ficheirosentrevistas = require('../model/Ficheirosentrevistas');
var Entrevistas = require('../model/Entrevistas');
var Ficheirosinteracao = require('../model/Ficheirosinteracao');
var Interacoes = require('../model/Interacoes');
var Ficheirosreuniaoideias = require('../model/Ficheirosreuniaoideias');
var Reunioesideias = require('../model/Reunioesideias');
var Ficheirosreuniaooportunidades = require('../model/Ficheirosreuniaooportunidades');
var Reunioesoportunidades = require('../model/Reunioesoportunidades');
var Contactos = require('../model/Contactos')
var Oportunidades = require('../model/Oportunidades')
var Candidaturas = require('../model/Candidaturas')
var ofertasvagas = require('../model/Ofertasvagas')
const Ideias = require('../model/Ideias');

var sequelize = require('../model/database');

const path = require('path');

const controllers = {}
sequelize.sync() 
/* Ficheirosentrevistas ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listFicheirosentrevistas = async (req,res) => {
        const data = await Ficheirosentrevistas.findAll({
            include: [
                {model: Users},
                {model: Entrevistas}
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

    /* LISTAR ENTREVISTA ---------------------- */
    controllers.list_ent = async (req,res) => {
        const { idEnt, idCand, idOferta } = req.params;
        const data = await Ficheirosentrevistas.findAll({
            include: [
                {model: Users},
                {model: Entrevistas, where: {id: idEnt}, 
                    include: [
                        {model: Candidaturas, where:{id: idCand}, 
                            include: [
                                {model: ofertasvagas, where: {id: idOferta}}
                            ]
                        }
                    ],
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
    controllers.create_ent = async (req,res) => {
        const { idEnt, idCand, idOferta } = req.params;

        // data
        const {user, 
        } = req.body;  
        // create
        const data = await Ficheirosentrevistas.create({
            entrevistaId : idEnt,
            userId: user, 
            ficheiro: req.file.filename,
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

    /*BUSCAR FICHEIRO  ---------------------------------------------------*/
    controllers.pdf_ent = async (req, res) => {
        // parâmetros por post
        const { idEnt, idCand, idOferta } = req.params;
        const { pdfname } = req.params;
        const pdfPath = path.join(__dirname, `../../Ficheiros_Entrevista_Upload/ofertas${idOferta}/candidaturas${idCand}/entrevistas${idEnt}`, pdfname); 
        res.sendFile(pdfPath);
    }
/* Ficheirosinteracao ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listFicheirosinteracao = async (req,res) => {
        const data = await Ficheirosinteracao.findAll({
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
        const data = await Ficheirosinteracao.findAll({
            include: [
                {model: Users},
                {model: Interacoes, where: {id: idInt}, 
                    include: [
                        {model: Contactos, where:{id: idCont}, 
                            include: [
                                {model: Oportunidades, where: {id: idOp}}
                            ]
                        }
                    ],
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
    controllers.create_int = async (req,res) => {
        const { idInt, idCont, idOp } = req.params;

        // data
        const {user, 
        } = req.body;  
        // create
        const data = await Ficheirosinteracao.create({
            interacoId : idInt,
            userId: user, 
            ficheiro: req.file.filename,
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

    /*BUSCAR FICHEIRO  ---------------------------------------------------*/
    controllers.pdf_int = async (req, res) => {
        const { idInt, idCont, idOp } = req.params;
        // parâmetros por post
        const { pdfname } = req.params;
        const pdfPath = path.join(__dirname, `../../Ficheiros_Interacao_Upload/oportunidades${idOp}/contactos${idCont}/interacoes${idInt}`, pdfname); 
        res.sendFile(pdfPath);
    }
    
/* Ficheirosreuniaoideias ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listFicheirosreuniaoideias = async (req,res) => {
        const data = await Ficheirosreuniaoideias.findAll({
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

    /* LISTAR REUNIAO IDEIA ---------------------- */
    controllers.list_reuniao_ideia = async (req,res) => {
        const { idReuniao, idIdeia } = req.params;
        const data = await Ficheirosreuniaoideias.findAll({
            include: [
                {model: Users},
                {model: Reunioesideias, where: {id: idReuniao}, 
                    include: [
                        {model: Ideias, where: {id: idIdeia}}
                    ],
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
    controllers.create_reuniao_ideia = async (req,res) => {
        const { idReuniao, idIdeia } = req.params;

        // data
        const {user} = req.body;  
        // create
        const data = await Ficheirosreuniaoideias.create({
            reunioesideiaId: idReuniao,
            userId: user, 
            ficheiro: req.file.filename,
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

    /*BUSCAR FICHEIRO  ---------------------------------------------------*/
    controllers.pdf_reuniao_ideia = async (req, res) => {
        const { idReuniao, idIdeia } = req.params;
        const { pdfname } = req.params;
        const pdfPath = path.join(__dirname, `../../Ficheiros_ReuniaoIdeia_Upload/ideias${idIdeia}/reunioes${idReuniao}`, pdfname); 
        res.sendFile(pdfPath);
    }


/* Ficheirosreuniaooportunidades ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listFicheirosreuniaooportunidades = async (req,res) => {
        const data = await Ficheirosreuniaooportunidades.findAll({
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

    /* LISTAR REUNIAO OPORTUNIDADE ---------------------- */
    controllers.list_reuniao_op = async (req,res) => {
        const { idReuniao, idOp } = req.params;
        const data = await Ficheirosreuniaooportunidades.findAll({
            include: [
                {model: Users},
                {model: Reunioesoportunidades, where: {id: idReuniao}, 
                    include: [
                        {model: Oportunidades, where: {id: idOp}}
                    ],
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
    controllers.create_reuniao_op = async (req,res) => {
        const { idReuniao, idOp } = req.params;

        // data
        const {user, 
        } = req.body;  
        // create
        const data = await Ficheirosreuniaooportunidades.create({
            reunioesoportunidadeId : idReuniao,
            userId: user, 
            ficheiro: req.file.filename,
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

    /*BUSCAR FICHEIRO  ---------------------------------------------------*/
    controllers.pdf_reuniao_op = async (req, res) => {
        const { idReuniao, idOp } = req.params;
        const { pdfname } = req.params;
        const pdfPath = path.join(__dirname, `../../Ficheiros_ReuniaoOP_Upload/oportunidades${idOp}/reunioes${idReuniao}`, pdfname); 
        res.sendFile(pdfPath);
    }
module.exports = controllers;