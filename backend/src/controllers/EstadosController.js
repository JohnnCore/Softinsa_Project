var Estadoreuniao = require('../model/Estadosreuniao');
var EstadoCandidaturas = require('../model/EstadosCandidaturas');
var Estadosentrevistas = require('../model/Estadosentrevistas');
var Estadosofertasvagas = require('../model/Estadosofertavagas');
var Estadosoportunidades = require('../model/Estadosoportunidades');


var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* Estadoreuniao ---------------------- */
/* LISTAR ---------------------- */
controllers.listEstadoreuniao = async (req,res) => {
    const data = await Estadoreuniao.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}
/* REGISTAR ---------------------- */

/* EstadoCandidaturas ---------------------- */
/* LISTAR ---------------------- */
controllers.listEstadoCandidaturas = async (req,res) => {
    const data = await EstadoCandidaturas.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Estadosentrevistas ---------------------- */
/* LISTAR ---------------------- */
controllers.listEstadosentrevistas = async (req,res) => {
    const data = await Estadosentrevistas.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Estadosofertasvagas ---------------------- */
/* LISTAR ---------------------- */
controllers.listEstadosofertasvagas = async (req,res) => {
    const data = await Estadosofertasvagas.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Estadosoportunidades ---------------------- */
/* LISTAR ---------------------- */
controllers.listEstadosoportunidades = async (req,res) => {
    const data = await Estadosoportunidades.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

module.exports = controllers;