var Users = require('../model/Users');
var Notificacoes = require('../model/Notificacoes')

var sequelize = require('../model/database');

var moment = require('moment-timezone');

const cron = require('node-cron');

const { Op, where } = require('sequelize');

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
    const data = await Notificacoes.findAll({
        include: [Users],
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });


}

/* LISTAR USER---------------------- */
controllers.list_user = async (req, res) => {
    const { idUser,  } = req.params;

    const data = await Notificacoes.findAll({
        where:{lido:1},
        include: [
            {model: Users, where:{id:idUser}}
        ],
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

/* EDITAR --------------------------------------------------- */
controllers.update = async (req,res) => {
    // parameter get id
    const { id, } = req.params;
    // parameter POST
    // Update data
    const data = await Notificacoes.update({
        lido: 2,
    },
    {
        where: { id: id}
    })
    .then( function(data){
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({success:true, data:data, message:"Updated successful"});
}

const verificarLista = async () => {
    const dataAtual = moment(new Date()).tz('Europe/London')
    const lista = await Notificacoes.findAll({
        include: [Users],
        where: {
            lido: 0
        }
    })
    lista.forEach(async item => {

        const dataReuniao = moment(item.dataValues.data_reuniao).tz('Europe/London')

        const diffMinutes = dataReuniao.diff(dataAtual, 'minutes');

        console.log(diffMinutes);

        if (diffMinutes <= 65) 
        {
            console.log("menoir que 5");
            console.log(item.id);
            console.log(item.lido);

            const data = await Notificacoes.update({
                lido : 1,
            },
            {
                where: { id: item.id}
            })
            .then( function(data){
                return data;
            })
            .catch(error => {
                return error;
            })
        }
    });
}

cron.schedule('*/1 * * * *', verificarLista);

module.exports = controllers;
