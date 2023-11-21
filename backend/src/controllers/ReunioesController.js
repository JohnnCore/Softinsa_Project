var Users = require('../model/Users');
var Reunioesideias = require('../model/Reunioesideias');
var Ideias = require('../model/Ideias');
var Estadoreuniao = require('../model/Estadosreuniao');
var Reunioesideiascolaboradores = require('../model/Reunioesideiascolaboradores');
var Reunioesoportunidades = require('../model/Reunioesoportunidades');
var Oportunidades = require('../model/Oportunidades');
var reunioesoportunidadescolaboradores = require('../model/Reunioesoportunidadescolaboradores');
var Contactos = require('../model/Contactos');
var Reunioesoportunidadescontactos = require('../model/Reunioesoportunidadescontactos')
var Notificacoes = require('../model/Notificacoes');

var sequelize = require('../model/database');
const { where } = require('sequelize');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'softinsa007@gmail.com',
      pass: 'rzqqkorxcbemephx'
    }
  });


var moment = require('moment-timezone');

const adjustDateTime = (date) => {
    const timezone = 'Europe/London';
    const momentDate = moment.tz(date, timezone);

    const isDST = momentDate.isDST();
    console.log(isDST);
    if (isDST) {
        return momentDate.subtract(1, 'hour').toDate();
    } else {
        return momentDate.subtract(2, 'hour').toDate();
    }
};


const controllers = {}
sequelize.sync()
/* Reunioesideias ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listReunioesideias = async (req,res) => {
        const data = await Reunioesideias.findAll({
            include: [
                {model: Ideias},
                {model: Users},
                {model: Estadoreuniao}
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

    /* LISTAR IDEIA---------------------- */
    controllers.ideia_list = async (req,res) => {
        const { id } = req.params;
        const data = await Reunioesideias.findAll({
            include: [
                {model: Ideias, where:{id:id}},
                {model: Users},
                {model: Estadoreuniao}
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
    controllers.createReuniaoIdeia = async (req,res) => {
        const { id } = req.params;
        // data
        const {titulo, detalhes, data_reuniao, user} = req.body;  
        // create
        const data = await Reunioesideias.create({
            ideiaId : id,
            titulo : titulo,
            detalhes: detalhes,
            data_reuniao: adjustDateTime(data_reuniao),
            userId: user,
            estadosreuniaoId : 1,
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
    controllers.getReuniaoIdeia = async (req,res) => {
        const { idIdeia, idReuniao } = req.params;
        const data = await Reunioesideias.findOne({
            where: { id: idReuniao },
            include: [{
                    model: Ideias,
                    where: { id: idIdeia }
                },
                {model: Users},
                {model: Estadoreuniao}
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
    controllers.updateReuniaoIdeia = async (req,res) => {
        // parameter get id
        const { idIdeia, idReuniao } = req.params;
        // parameter POST
        const {titulo, detalhes, data_reuniao, estado} = req.body;   
        // Update data
        const data = await Reunioesideias.update({
            titulo : titulo,
            detalhes: detalhes,
            data_reuniao: adjustDateTime(data_reuniao),
            estadosreuniaoId : estado,
        },
        {
            where: { id: idReuniao}
        })
        .then( function(data){
            return data;
        })
        .catch(error => {
            return error;
        })
        res.json({success:true, data:data, message:"Updated successful"});
    }

/* Reunioesideiascolaboradores ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listReunioesideiascolaboradores = async (req,res) => {
        const data = await Reunioesideiascolaboradores.findAll({
            include: [
                {model: Reunioesideias},
                {model: Users}
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

    /* LISTAR COLABORADORES REUNIAO---------------------- */
    controllers.listReuniaodeideiascolaboradores = async (req,res) => {
        const { idIdeia, idReuniao } = req.params;
        const data = await Reunioesideiascolaboradores.findAll({
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

    /* LISTAR USER---------------------- */
    controllers.listreunioesideiascolaborador = async (req,res) => {
        const { idUser } = req.params;
        const data = await Reunioesideiascolaboradores.findAll({
            include: [
                {model: Reunioesideias},
                {model: Users, where:{id: idUser}}
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
    controllers.addreuniaoideiascolaboradores = async (req, res) => {
        // data
        const { idReuniao } = req.params;
        console.log(req.body);
      
        const {adicionar , remover } = req.body

        const promises = []; 
        
        adicionar.forEach(async (item) => {
            const existingEntry = await Reunioesideiascolaboradores.findOne({
                where: {
                    reunioesideiaId: idReuniao,
                    userId: item,
                },
            });
            if(!existingEntry)
            {
                const data = await Reunioesideiascolaboradores.create({
                    reunioesideiaId: idReuniao,
                    userId: item,
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });


                const reuniao = await Reunioesoportunidades.findOne({
                    where: {id: idReuniao}
                })

                const notificacao = await Notificacoes.create({
                    userId: item,
                    data_reuniao:new Date(reuniao.dataValues.data_reuniao),
                    mensagem: reuniao.dataValues.titulo,
                    lido: 0,
                    tipo: 2,
                    reuniaoId: idReuniao,
                })

                

                promises.push(data);
            }
        });

        remover.forEach(async (item) => {
            {
                const data = await Reunioesideiascolaboradores.destroy({
                    where:{ 
                            reunioesideiaId: idReuniao,
                            userId: item,
                        }
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });

                const del = await Notificacoes.destroy({
                    where: { userId: item, tipo:2, reuniaoId: idReuniao}
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });

                promises.push(data);
            }
        });
        
      
        await Promise.all(promises);
      
        res.json({ success: true, message: "Created successfully" });
    };

/* Reunioesoportunidades ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listReunioesoportunidades = async (req,res) => {
        const data = await Reunioesoportunidades.findAll({
            include: [
                {model: Oportunidades},
                {model: Users},
                {model: Estadoreuniao}
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
        const data = await Reunioesoportunidades.findAll({
            include: [{
                model: Oportunidades,
                where: { id: id }
                },
                {model: Users},
                {model: Estadoreuniao}
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
    controllers.createReuniaoOportunidade = async (req,res) => {
        const { id } = req.params;
        // data
        const {titulo, detalhes, data_reuniao, user} = req.body;  
        // create
        const now = new Date();
        const data = await Reunioesoportunidades.create({
            oportunidadeId : id,
            titulo : titulo,
            detalhes: detalhes,
            data_reuniao: adjustDateTime(data_reuniao),
            userId: user,
            estadosreuniaoId : 1,
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
    controllers.getReuniaoOportunidade = async (req,res) => {
        const { idOp, idReuniao } = req.params;
        const data = await Reunioesoportunidades.findOne({
            where: { id: idReuniao },
            include: [{
                    model: Oportunidades,
                    where: { id: idOp }
                },
                {model: Users},
                {model: Estadoreuniao}
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
    controllers.updateReuniaoOportunidade = async (req,res) => {
        // parameter get id
        const { idOp, idReuniao } = req.params;
        // parameter POST
        const {titulo, detalhes, data_reuniao, estado
            } = req.body;   
        // Update data
        const data = await Reunioesoportunidades.update({
            titulo : titulo,
            detalhes: detalhes,
            data_reuniao: adjustDateTime(data_reuniao),
            estadosreuniaoId : estado,
        },
        {
            where: { id: idReuniao}
        })
        .then( function(data){
            return data;
        })
        .catch(error => {
            return error;
        })
        res.json({success:true, data:data, message:"Updated successful"});
    }

/* reunioesoportunidadescolaboradores ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listreunioesoportunidadescolaboradores = async (req,res) => {
        const data = await reunioesoportunidadescolaboradores.findAll({
            include: [
                {model: Reunioesoportunidades},
                {model: Users}
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

    /* LISTAR COLABORADORES REUNIAO---------------------- */
    controllers.listreuniaosoportunidadescolaboradores = async (req,res) => {
        const { idOp, idReuniao } = req.params;
        const data = await reunioesoportunidadescolaboradores.findAll({
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


    /* LISTAR USER---------------------- */
    controllers.listreunioesoportunidadescolaborador = async (req,res) => {
        const { idUser } = req.params;
        const data = await reunioesoportunidadescolaboradores.findAll({
            include: [
                {model: Reunioesoportunidades},
                {model: Users, where:{id: idUser}}
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
    controllers.addreuniaosoportunidadescolaboradores = async (req, res) => {
        // data
        const { idReuniao } = req.params;
        console.log(req.body);
      
        const {adicionar , remover } = req.body

        const promises = []; 
        
        adicionar.forEach(async (item) => {
            const existingEntry = await reunioesoportunidadescolaboradores.findOne({
                where: {
                    reunioesoportunidadeId: idReuniao,
                    userId: item,
                },
            });
            if(!existingEntry)
            {
                const data = await reunioesoportunidadescolaboradores.create({
                    reunioesoportunidadeId: idReuniao,
                    userId: item,
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });

                const reuniao = await Reunioesoportunidades.findOne({
                    where: {id: idReuniao}
                })

                const notificacao = await Notificacoes.create({
                    userId: item,
                    data_reuniao: new Date(reuniao.dataValues.data_reuniao),
                    mensagem: reuniao.dataValues.titulo,
                    lido: 0,
                    tipo: 1,
                    reuniaoId: idReuniao,
                })

                promises.push(data);
            }
        });

        remover.forEach(async (item) => {
    
            const data = await reunioesoportunidadescolaboradores.destroy({
                where:{ 
                        reunioesoportunidadeId: idReuniao,
                        userId: item,
                    }
            })
            .then(function (data) {
                return data;
            })
            .catch((error) => {
                return error;
            });

            const del = await Notificacoes.destroy({
                where: { userId: item, tipo:1, reuniaoId: idReuniao}
            })
            .then(function (data) {
                return data;
            })
            .catch((error) => {
                return error;
            });
            
            promises.push(data);
            
        });
        
      
        await Promise.all(promises);
      
        res.json({ success: true, message: "Created successfully" });
    };

/* reunioesoportunidadescontactos ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listReunioesoportunidadescontactos = async (req,res) => {
        const data = await Reunioesoportunidadescontactos.findAll({
            include: [
                {model: Contactos},
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
    controllers.listReuniaosoportunidadescontactos = async (req,res) => {
        const { idOp, idReuniao } = req.params;
        const data = await Reunioesoportunidadescontactos.findAll({
            include: [
                {model: Contactos},
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
    controllers.addReuniaosoportunidadescontactos = async (req, res) => {
        // data
        const { idReuniao } = req.params;
      
        const {adicionar , remover, contactos_add } = req.body

        const promises = []; 
        contactos_add.forEach(async (item) => {
            const existingEntry = await Reunioesoportunidadescontactos.findOne({
                where: {
                  reunioesoportunidadeId: idReuniao,
                  contactoId: item.id,
                },
            });
            if(!existingEntry)
            {
                const data = await Reunioesoportunidadescontactos.create({
                    reunioesoportunidadeId: idReuniao,
                    contactoId: item.id,
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });

                const reuniao = await Reunioesoportunidades.findOne({
                    where: { id: idReuniao },
                });

                const dataReuniao = new Date(reuniao.dataValues.data_reuniao);
                
                const  isValidEmail = (email) =>{
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                }

                if (!isValidEmail(item.email)) {
                    return;
                  }
                const mailOptions = {
                    from: 'softinsa007@gmail.com',
                    to: item.email,
                    subject: 'Convocatória para Reunião ', 
                    html: `<h1>Olá ${item.primeiro_nome} ${item.ultimo_nome} !</h1><p>Você foi convidado a participar na reunião dia ${moment(dataReuniao).tz('Europe/London').format('DD/MM/YYYY HH:mm')} para discutir sobre "${reuniao.titulo}" </p>`
            
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log(error);
                      res.status(500).json({
                        success: false,
                        message: 'Failed to send email',
                        error: error
                      });
                    } else {
                      console.log('Email sent: ' + info.response);
                      res.status(200).json({
                        success: true,
                        message: 'Convocatória Enviada!',
                        data: data
                      });
                    }
                });

                promises.push(data);
            }           
        });

        remover.forEach(async (item) => {
            
            const data = await Reunioesoportunidadescontactos.destroy({
                where:{ 
                        reunioesoportunidadeId: idReuniao,
                        contactoId: item,
                    }
            })
            .then(function (data) {
                return data;
            })
            .catch((error) => {
                return error;
            });
            promises.push(data);
            
        });
        
      
        await Promise.all(promises);
      
        res.json({ success: true, message: "Created successfully" });
    };
      
module.exports = controllers;
