var Tiposdeprojetos = require('../model/Tiposdeprojetos');
var areasdenegocio = require('../model/Areasdenegocio');
var estadosopurtunidade = require('../model/Estadosoportunidades')
var Users = require('../model/Users')

var sequelize = require('../model/database');
const Oportunidades = require('../model/Oportunidades');

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
/* LISTAR ---------------------- */
controllers.list = async (req, res) => {
    const data = await Oportunidades.findAll({
        include: [
            { model: Users },
            { model: areasdenegocio },
            { model: Tiposdeprojetos },
            { model: estadosopurtunidade }
        ]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}
/* REGISTAR ---------------------- */
controllers.create = async (req, res) => {
    // data
    const { tipodeprojeto, areadenegocio,
        titulo, empresa, necessidade, user
    } = req.body;
    // create
    const now = new Date()
    const data = await Oportunidades.create({
        tiposdeprojetoId: tipodeprojeto,
        areasdenegocioId: areadenegocio,
        estadosoportunidadeId: 1,
        userId: user,
        titulo: titulo,
        empresa: empresa,
        necessidades: necessidade,
        data_criacao: (adjustDateTime(now)),
        data_atualizacao: (adjustDateTime(now))
    })
        .then(function (data) {
            console.log(data)
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error)
            return error;
        })
    res.json({ success: true, data: data, message: "Created successful" });
}
/* BUSCAR ----------------------------------------------- */
controllers.get = async (req, res) => {
    const { id } = req.params;
    const data = await Oportunidades.findOne({
        where: { id: id },
        include: [
            { model: Users },
            { model: areasdenegocio },
            { model: Tiposdeprojetos },
            { model: estadosopurtunidade }
        ]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}
/* EDITAR --------------------------------------------------- */
controllers.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { tipodeprojeto, areadenegocio, estadooportunidade,
        titulo, empresa, necessidade,
    } = req.body;
    // Update data
    const now = new Date();

    const data = await Oportunidades.update({
        tiposdeprojetoId: tipodeprojeto,
        areasdenegocioId: areadenegocio,
        estadosoportunidadeId: estadooportunidade,
        titulo: titulo,
        empresa: empresa,
        necessidades: necessidade,
        data_atualizacao: (adjustDateTime(new Date()))
    },
        {
            where: { id: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Updated successful" });
}
/*APAGAR --------------------------------------------------- */
controllers.delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Oportunidades.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

module.exports = controllers;