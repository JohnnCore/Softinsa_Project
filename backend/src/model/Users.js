var Sequelize = require('sequelize');
var sequelize = require('./database');

// importa o modelo – chave forasteira id_tipo_perfil
var Tiposdeperfil = require('./Tiposdeperfil');
var Users = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    primeiro_nome: Sequelize.STRING,
    ultimo_nome: Sequelize.STRING,
    telemovel: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    imagem: Sequelize.STRING,
    cargo: Sequelize.STRING,
    estado: Sequelize.SMALLINT,
    primeiro_login: Sequelize.SMALLINT,
    tiposdeperfilId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
        model: Tiposdeperfil,
        key: 'id'
    }
    }
},
{
    timestamps: false,
});
Users.belongsTo(Tiposdeperfil)
module.exports = Users