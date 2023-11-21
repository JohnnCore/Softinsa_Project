var Users = require('../model/Users');
var Estadosofertavagas = require('../model/Estadosofertavagas');
var Tiposofertavagas = require('../model/Tiposofertavagas');
var Ofertasvagas = require('../model/Ofertasvagas')

var sequelize = require('../model/database');

const path = require('path');

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
    const data = await Ofertasvagas.findAll({
        include: [
            { model: Users },
            { model: Tiposofertavagas },
            { model: Estadosofertavagas }
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
    const { tipoofertavaga,
        titulo, departamento, localizacao,
        experiencia_anterior, tempo_minimo_de_experiencia,
        habilitacoes_minimas, renumeracao_base_iliquida,
        descricao, user
    } = req.body;
    // create 
    const now = new Date();
    const data = await Ofertasvagas.create({
        userId: user,
        estadosofertavagaId: 1,
        tiposofertavagaId: tipoofertavaga,
        titulo: titulo,
        departamento: departamento,
        localizacao: localizacao,
        experiencia_anterior: experiencia_anterior,
        tempo_minimo_de_experiencia: tempo_minimo_de_experiencia,
        habilitacoes_minimas: habilitacoes_minimas,
        renumeracao_base_iliquida: renumeracao_base_iliquida,
        descricao: descricao,
        imagem: req.file.filename,
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
    const data = await Ofertasvagas.findOne({
        where: { id: id },
        include: [
            { model: Users },
            { model: Tiposofertavagas },
            { model: Estadosofertavagas }
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
    const { estadoofertavaga, tipoofertavaga,
        titulo, departamento, localizacao,
        experiencia_anterior, tempo_minimo_de_experiencia,
        habilitacoes_minimas, renumeracao_base_iliquida,
        descricao
    } = req.body;


    let imagem = null; 

    if (req.file) {
        imagem = req.file.filename; 
    } else {
        const ofertaVaga = await Ofertasvagas.findByPk(id);
        if (ofertaVaga) {
            imagem = ofertaVaga.imagem; 
        }
    }

    // Update data
    const data = await Ofertasvagas.update({
        estadosofertavagaId: estadoofertavaga,
        tiposofertavagaId: tipoofertavaga,
        titulo: titulo,
        departamento: departamento,
        localizacao: localizacao,
        experiencia_anterior: experiencia_anterior,
        tempo_minimo_de_experiencia: tempo_minimo_de_experiencia,
        habilitacoes_minimas: habilitacoes_minimas,
        renumeracao_base_iliquida: renumeracao_base_iliquida,
        descricao: descricao,
        imagem: imagem,
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
    const del = await Ofertasvagas.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}

/*BUSCAR IMAGE  ---------------------------------------------------*/
controllers.image = async (req, res) => {
    // parâmetros por post
    const { image } = req.params;
    const imagePath = path.join(__dirname, `../../Ofertas_Upload/`, image);
    res.sendFile(imagePath);
}
module.exports = controllers;