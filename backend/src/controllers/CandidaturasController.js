var Users = require('../model/Users');
var Estadoscandidatura = require('../model/EstadosCandidaturas');
var Ofertavagas = require('../model/Ofertasvagas')
var Candidaturas = require('../model/Candidaturas')

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
controllers.list = async (req,res) => {
    const data = await Candidaturas.findAll({
        include: [
            {model: Users},
            {model: Estadoscandidatura},
            {model: Ofertavagas}
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

/* LISTAR OFERTA---------------------- */
controllers.listOferta = async (req,res) => {
    const {idOferta} = req.params
    const data = await Candidaturas.findAll({
        include: [
            {model: Users},
            {model: Estadoscandidatura},
            {model: Ofertavagas, where:{id:idOferta}}
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
    const { idOferta } = req.params;

    // data
    const {user, observacoes, 
        curriculo,
    } = req.body;  
    // create
    const data = await Candidaturas.create({
        ofertasvagaId : idOferta,
        userId: user, 
        observacoes : observacoes,
        estadoscandidaturaId: 1,
        data_candidatura: (adjustDateTime(new Date())),
        curriculo: req.file.filename,
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

/* BUSCAR ---------------------- */
controllers.get = async (req,res) => {
    const { idCandidatura, idOferta } = req.params;
    const data = await Candidaturas.findOne({
        where: { id: idCandidatura },
        include: [
            {model: Users},
            {model: Estadoscandidatura},
            {model: Ofertavagas, where:{id:idOferta}}
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
    const { idCandidatura, idOferta } = req.params;
    // parameter POST
    const { estadocandidatura,
    } = req.body;   
    // Update data
    const data = await Candidaturas.update({
        estadoscandidaturaId: estadocandidatura,
    },
    {
        where: { id: idCandidatura}
    })
    .then( function(data){
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({success:true, data:data, message:"Updated successful"});
}

/*BUSCAR PDF  ---------------------------------------------------*/
controllers.pdf = async (req, res) => {
    // parâmetros por post 
    const { idOferta,pdfname } = req.params;
    const pdfPath = path.join(__dirname, `../../Curriculos_Upload/ofertas${idOferta}`, pdfname);
    res.sendFile(pdfPath);
}
module.exports = controllers; 