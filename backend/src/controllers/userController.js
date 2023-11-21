var Users = require('../model/Users');
var Tiposdeperfil = require('../model/Tiposdeperfil');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'softinsa007@gmail.com',
    pass: 'rzqqkorxcbemephx'
  }
});

function generatePassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}


var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req, res) => {
  const data = await Users.findAll({
    include: [Tiposdeperfil]
  })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    });
  res.json({ success: true, data: data });
}
/* LISTAR COLABORADORES ---------------------- */
controllers.list_colaboradores = async (req, res) => {
  const data = await Users.findAll({
    include: [{ model: Tiposdeperfil, where: { id: { [Op.in]: [1, 2, 3, 6, 7] } } }]
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
controllers.register = async (req, res) => {
  const { pname, uname, telemovel, email, password } = req.body;
  let user = await Users.findOne({ where: { email: email } });
  if (user) {
    return res.status(400).json({
      success: false,
      message: 'Email já registado por favor tente outro ou faça login!'
    });
  }
  let imagem = 'https://pint-backend.onrender.com/users/image/default2.png'
  const hashedPassword = bcrypt.hashSync(password, 10);
  const data = await Users.create({
    tiposdeperfilId: 4,
    primeiro_nome: pname,
    ultimo_nome: uname,
    telemovel: telemovel,
    email: email,
    password: hashedPassword,
    imagem: imagem,
    cargo: 'visitante',
    estado: 1,
    primeiro_login: 0
  })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      console.log("Erro: " + error);
      return error;
    })

  const token = jwt.sign(
    {
      id: data.id,
      tipo: data.tiposdeperfilId,
      pnome: data.primeiro_nome,
      unome: data.ultimo_nome,
      telemovel: data.telemovel,
      email: data.email,
      photo: data.imagem,
      cargo: data.cargo
    },
    config.jwtSecret,
    { expiresIn: '72hours' }
  );

  const mailOptions = {
    from: 'softinsa007@gmail.com',
    to: email,
    subject: 'Softinsa Confirmação de Registo',
    html: '<h1>Olá ' + pname + '!</h1><p>Seja bem-vindo à plataforma da Softinsa. Para aceder à sua conta, conffirme o seu email no link abaixo.</p><a href="https://lon3rgoahny.sytes.net/confirmar/' + token + '">Confirmar Email</a><p>Até já!</p>'

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200).json({
    success: true,
    message: "Registado, por favor confirme o seu email!",
    data: data
  });
}
/* LOGIN ---------------------- */
controllers.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(403).json({
      success: false,
      message: 'Campos em Branco'
    });
    return;
  }

  try {

    let user = await Users.findOne({ where: { email: email } });

    if (!user) {
      res.status(403).json({
        success: false,
        message: 'Dados de autenticação inválidos.'
      });
      return;
    }
    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch) {
      let token = jwt.sign(
        {
          id: user.id,
          tipo: user.tiposdeperfilId,
          pnome: user.primeiro_nome,
          unome: user.ultimo_nome,
          telemovel: user.telemovel,
          email: user.email,
          photo: user.imagem,
          cargo: user.cargo
        },
        config.jwtSecret,
        { expiresIn: '72hours' }
      );
      if (user.estado == 0) {
        res.status(403).json({
          success: false,
          message: 'Informamos que sua conta foi desativada por um administrador. Pedimos desculpas pelo inconveniente.'
        });
        return;
      }

      if (user.primeiro_login == 0) {
        if (user.tiposdeperfilId == 4 || user.tiposdeperfilId == 5) {
          console.log('Não verificou mail')
          const mailOptions = {
            from: 'softinsa007@gmail.com',
            to: email,
            subject: 'Softinsa Confirmação de Registo',
            // type a text message here with the link to the login page and a paragraph welcoming the user to the platform
            html: '<h1>Olá ' + user.primeiro_nome + '!</h1><p>Seja bem-vindo à plataforma da Softinsa. Para aceder à sua conta, conffirme o seu email no link abaixo.</p><a href="https://lon3rgoahny.sytes.net/confirmar/' + token + '">Confirmar Email</a><p>Até já!</p>'

          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          res.status(401).json({
            success: false,
            message: 'Um novo e-mail de confirmação foi enviado. Por favor, verifique o e-mail antes de usar a sua conta.'
          });
        }
        else {
          console.log('Tem de mudar a password')
          res.status(402).json({
            success: false,
            message: 'É obrigatório que você altere a sua senha antes de usar a sua conta.',
            token: token
          });
        }
      } else {
        console.log('Autenticação realizada com sucesso!');

        res.json({
          success: true,
          message: 'Autenticação realizada com sucesso!',
          token: token
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Dados de autenticação inválidos.'
      });
    }
  } catch (error) {
    console.log("Erro: " + error);
    res.status(500).json({
      success: false,
      message: 'Erro no processo de autenticação. Tente novamente mais tarde.'
    });
  }
};

/* GOOGLE LOGIN ---------------------- */
const client = new OAuth2Client('327068343135-vq8qa76rgsu57spmmj2snqtm4eaahh22.apps.googleusercontent.com');
controllers.loginGoogle = async (req, res) => {
  const googleToken = req.body.token;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: '327068343135-vq8qa76rgsu57spmmj2snqtm4eaahh22.apps.googleusercontent.com'
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, picture } = payload;

    let user = await Users.findOne({ where: { email: email } });

    if (!user) {
      const passwordLength = 10;
      const password = generatePassword(passwordLength);
      const hashedPassword = bcrypt.hashSync(password, 10); // Generate a random password
      user = await Users.create({
        tiposdeperfilId: 4,
        primeiro_nome: given_name,
        ultimo_nome: family_name ?? ' ',
        email: email,
        telemovel: "---", 
        password: hashedPassword,
        cargo: 'visitante',
        estado: 1,
        primeiro_login: 0,
        imagem: picture
      });
      const mailOptions = {
        from: 'softinsa007@gmail.com',
        to: email,
        subject: 'Registration Confirmation',
        text: 'Thank you for registering!'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        tipo: user.tiposdeperfilId,
        pnome: user.primeiro_nome,
        unome: user.ultimo_nome,
        telemovel: user.telemovel,
        email: user.email,
        photo: user.imagem,
        cargo: user.cargo
      },
      config.jwtSecret,
      { expiresIn: '72hours' }
    );

    res.json({
      success: true,
      message: 'Autenticação do Google realizada com sucesso!',
      token: token
    });
  } catch (error) {
    console.log('Erro na autenticação do Google:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no processo de autenticação do Google. Tente novamente mais tarde.'
    });
  }
};

/* CONFIRM EMAIL ---------------------- */
controllers.confirmEmail = async (req, res) => {
  let token = req.body.token.token;
  let decoded = jwt.verify(token, config.jwtSecret);
  let id = decoded.id;
  let user = await Users.findOne({ where: { id: id } });
  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Dados de autenticação inválidos.'
    });
    return;
  }
  try {
    await Users.update(
      { primeiro_login: 1 },
      { where: { id: id } }
    );
    res.status(200).json({
      success: true,
      message: 'Email confirmado com sucesso!'
    });
  } catch (error) {
    console.log("Erro: " + error);
    res.status(500).json({
      success: false,
      message: 'Erro no processo de confirmação de email. Tente novamente mais tarde.'
    });
  }
};

/* FORGOT PASS---------------------- */
controllers.forgotpassword = async (req, res) => {
  let email = req.body.email;

  if (!email) {
    res.status(403).json({
      success: false,
      message: 'Campos em Branco'
    });
    return;
  }

  try {
    let user = await Users.findOne({ where: { email: email } });

    if (!user) {
      res.status(403).json({
        success: false,
        message: 'Não existe conta com esse e-mail'
      });
    } else {
      let token = jwt.sign(
        {
          id: user.id,
          tipo: user.tiposdeperfilId,
          pnome: user.primeiro_nome,
          unome: user.ultimo_nome,
          telemovel: user.telemovel,
          email: user.email,
          photo: user.imagem,
          cargo: user.cargo
        },
        config.jwtSecret,
        { expiresIn: '10min' }
      );

      const mailOptions = {
        from: 'softinsa007@gmail.com',
        to: email,
        subject: 'Softinsa Redefinir a Senha',
        html: '<h1>Olá, ' + user.primeiro_nome + '!</h1><p>Recebemos uma solicitação para redefinir a senha da sua conta na plataforma da Softinsa. Para prosseguir com a alteração da senha, clique no link abaixo:</p><a href="https://lon3rgoahny.sytes.net/redefinir-senha/' + token + '">Redefinir Senha</a><p>Caso você não tenha solicitado essa alteração, por favor, ignore este e-mail.</p><p>Até logo!</p>'

      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent');
        }
      });

      res.json({
        success: true,
        message: 'Foi enviado um e-mail com instruções para redefinir a sua senha. Por favor, verifique a sua caixa de entrada.'
      })
    }
  } catch (error) {
    console.log("Erro: " + error);
    res.status(500).json({
      success: false,
      message: 'Erro no processo. Tente novamente mais tarde.'
    });
  }



};

/* ALTERAR PASS---------------------- */
controllers.alterarpass = async (req, res) => {
  let token = req.body.token;
  let password = req.body.password;
  let decoded = jwt.verify(token, config.jwtSecret)
  let id = decoded.id;
  const hashedPassword = bcrypt.hashSync(password, 10);
  let user = await Users.findOne({ where: { id: id } });
  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Dados de autenticação inválidos.'
    });
    return;
  }
  try {
    await Users.update(
      { password: hashedPassword, primeiro_login: 1 },
      { where: { id: id } }
    );
    res.status(200).json({
      success: true,
      message: 'Senha Alterada com Sucesso'
    });
  }
  catch (error) {
    console.log("Erro: " + error);
    res.status(500).json({
      success: false,
      message: 'Erro no processo. Tente novamente mais tarde.'
    });
  }

};

/* CRIAR USER ---------------------- */
controllers.criaruser = async (req, res) => {
  const { tiposdeperfilId, primeiro_nome, ultimo_nome, email, cargo } = req.body;
  const passwordLength = 10;
  const password = generatePassword(passwordLength);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const picture = `https://pint-backend.onrender.com/users/image/default1.png`;
  const data = await Users.create({
    tiposdeperfilId: tiposdeperfilId,
    primeiro_nome: primeiro_nome,
    ultimo_nome: ultimo_nome,
    telemovel: "---",
    email: email,
    password: hashedPassword,
    imagem: picture,
    cargo: cargo,
    estado: 1,
    primeiro_login: 0
  })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      console.log("Erro: " + error);
      return error;
    })

  res.status(200).json({
    success: true,
    message: "Registado com sucesso! A senha desta conta é: " + password + "",
    data: data
  });

};

/* GET USER ---------------------- */
controllers.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findOne({ where: { id: id } });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User data',
    data: user,
  });
};

/* UPDATE USER ---------------------- */
controllers.updateUser = async (req, res) => {
  const id = req.params.id;
  const { tiposdeperfilId, primeiro_nome, ultimo_nome, telemovel, email, imagem, cargo, estado } = req.body;
  let user = await Users.findOne({ where: { id: id } });
  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Dados inválidos.'
    });
    return;
  }
  try {
    await Users.update(
      { tiposdeperfilId: tiposdeperfilId, primeiro_nome: primeiro_nome, ultimo_nome: ultimo_nome, telemovel: telemovel, email: email, imagem: imagem, cargo: cargo, estado: estado },
      { where: { id: id } }
    );
    res.status(200).json({
      success: true,
      message: 'Dados alterados com sucesso'
    });
  }
  catch (error) {
    console.log("Erro: " + error);
    res.status(500).json({
      success: false,
      message: 'Erro no processo. Tente novamente mais tarde.'
    });
  }
};

/* UPDATE PROFILE ---------------------- */
controllers.updateProffile = async (req, res) => {
  const id = req.params.id;
  const { primeiro_nome, ultimo_nome, telemovel, email } = req.body;
  let user = await Users.findOne({ where: { id: id } });
  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Dados inválidos.'
    });
    return;
  }
  try {
    if (req.file) {
      imagem = `https://pint-backend.onrender.com/users/image/${req.file.filename}`;
    } else {
      const get_user = await Users.findByPk(id);
      if (get_user) {
        imagem = get_user.imagem; 
      }
    }
    await Users.update(
      {
        primeiro_nome: primeiro_nome, ultimo_nome: ultimo_nome, telemovel: telemovel, email: email, imagem: imagem,
      },
      { where: { id: id } }
    );
    res.status(200).json({
      success: true,
      message: 'Dados alterados com sucesso'
    });
  }
  catch (error) {
    console.log("Erro: " + error);
    res.status(500).json({
      success: false,
      message: 'Erro no processo. Tente novamente mais tarde.'
    });
  }
};
/* UPDATE PASSWORD ---------------------- */
controllers.updatePassword = async (req, res) => {
  const id = req.params.id;
  const { password, nova_password } = req.body;
  const hashedPassword = bcrypt.hashSync(nova_password, 10);
  let user = await Users.findOne({ where: { id: id } });
  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Dados inválidos.'
    });
    return;
  }
  if (bcrypt.compareSync(password, user.password)) {
    try {
      await Users.update(
        { password: hashedPassword },
        { where: { id: id } }
      );
      res.status(200).json({
        success: true,
        message: 'Senha alterada com sucesso'
      });
    }
    catch (error) {
      console.log("Erro: " + error);
      res.status(500).json({
        success: false,
        message: 'Erro no processo. Tente novamente mais tarde.'
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'Senha atual incorreta.'
    });
    return;
  }
};

/*BUSCAR IMAGE  ---------------------------------------------------*/
controllers.image = async (req, res) => {
  // parâmetros por post
  const { image } = req.params;
  const imagePath = path.join(__dirname, `../../Users_Upload/`, image);
  res.sendFile(imagePath);
}


module.exports = controllers;
