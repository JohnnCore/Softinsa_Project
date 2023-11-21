
const userRouters = require('./routes/userRoute')
const tiposRouters = require('./routes/tiposRoute')
const oportunidadesRouters = require('./routes/oportunidadesRoutes')
const areasRouters = require('./routes/areasRoute')
const avisosRouters = require('./routes/avisosRoute')
const beneficiosRouters = require('./routes/beneficiosRoutes')
const candidaturasRouters = require('./routes/candidaturaRoute')
const contactosRouters = require('./routes/contactosRoute')
const entrevistasRouters = require('./routes/entrevistasRoute')
const estadosRouters = require('./routes/EstadosRoute')
const ficheirosRouters = require('./routes/ficheirosRoute')
const ideiasRouters = require('./routes/ideiasRoute')
const interacoesRouters = require('./routes/interacoesRoute')
const notasRouters = require('./routes/notasRoute')
const ofertaRouters = require('./routes/ofertasRoute')
const reunioesRouters = require('./routes/reunioesRoutes')
const notificacoesRouters = require('./routes/NotificacoesRoute')


const middleware = require('./middleware');




const express = require('express');
const app = express();
//Configurações
app.set('port', process.env.PORT || 3000);
//Middlewares
// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    });
app.use(express.json());
//Rotas
app.use('/users', userRouters)
app.use('/tipos', tiposRouters)
app.use('/oportunidades',middleware.checkToken, oportunidadesRouters)
app.use('/areas',middleware.checkToken, areasRouters)
app.use('/avisos',middleware.checkToken, avisosRouters)
app.use('/beneficios', beneficiosRouters)
app.use('/candidaturas',middleware.checkToken, candidaturasRouters)
app.use('/contactos',middleware.checkToken, contactosRouters)
app.use('/entrevistas',middleware.checkToken, entrevistasRouters)
app.use('/estado',middleware.checkToken, estadosRouters)
app.use('/ficheiros', middleware.checkToken, ficheirosRouters) 
app.use('/ideias',middleware.checkToken, ideiasRouters)
app.use('/interacoes',middleware.checkToken, interacoesRouters)
app.use('/notas',middleware.checkToken, notasRouters)
app.use('/ofertas', ofertaRouters)
app.use('/reunioes',middleware.checkToken, reunioesRouters)
app.use('/notificacoes',middleware.checkToken, notificacoesRouters)



//Rota default
app.use('/',(req,res)=>{
res.send("Backend do Projeto");
});
app.listen(app.get('port'),()=>{
console.log("Start server on port "+app.get('port'))
})