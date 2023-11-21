var Tiposdeperfil = require('../model/Tiposdeperfil');
var Tiposbeneficios = require('../model/Tiposbeneficios');
var Tiposdeideias = require('../model/Tiposdeideias');
var Tiposdeprojetos = require('../model/Tiposdeprojetos');
var Tiposdeinteracao = require('../model/Tiposinteracao');
var Tiposofertas = require('../model/Tiposofertavagas');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* Tiposdeperfil ---------------------- */
/* LISTAR ---------------------- */
controllers.listperfil = async (req,res) => {
    const data = await Tiposdeperfil.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}
/* REGISTAR ---------------------- */

/* Tiposbeneficios ---------------------- */
/* LISTAR ---------------------- */
controllers.listTiposbeneficios = async (req,res) => {
    const data = await Tiposbeneficios.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Tiposdeideias ---------------------- */
/* LISTAR ---------------------- */
controllers.listTiposdeideias = async (req,res) => {
    const data = await Tiposdeideias.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Tiposdeprojetos ---------------------- */
/* LISTAR ---------------------- */
controllers.listTiposdeprojetos = async (req,res) => {
    const data = await Tiposdeprojetos.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* CRIAR ---------------------- */
controllers.createTiposdeprojetos = async (req,res) => {
    const { tipo } = req.body;
    const data = await Tiposdeprojetos.create({
        tipo: tipo
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        console.log("Erro: " + error);
        return error;
    });
    res.status(200).json({
        success: true,
        message:"Tipo de projeto criado com sucesso",
        data: data
    });
}

/* Tiposdeinteracao ---------------------- */
/* LISTAR ---------------------- */
controllers.listTiposdeinteracao = async (req,res) => {
    const data = await Tiposdeinteracao.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Tiposofertas ---------------------- */
/* LISTAR ---------------------- */
controllers.listTiposofertas = async (req,res) => {
    const data = await Tiposofertas.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

module.exports = controllers;