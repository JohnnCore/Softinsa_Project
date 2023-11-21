import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, } from "react";
import './App.css';
import AuthService from "./view/auth.service";


import Home from './view/home';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Goup from './components/Goup'

import Perfil from './view/Perfil/Perfil';
import PerfilOportunidades from './view/Perfil/Oportunidades';
import PerfilCandidaturas from './view/Perfil/Candidaturas';

import OportunidadesList from './view/Oportunidades/oportunidades';
import OportunidadeCreate from './view/Oportunidades/FormOportunidade';

import Index from './view/index';

import OfertasList from './view/Ofertas/ofertas';

import IdeiasList from './view/Ideias/Ideias';
import IdeiaCreate from './view/Ideias/FormIdeia';

import Register from './view/Auth/Register';
import Login from './view/Auth/Login';
import Confirmar from './view/Auth/Confirmar';
import Alterarsenha from './view/Auth/Alterarpass'

import Calendario from './view/Calendario/Calendario';

//Imports para a backoffice
//----------------------------------------------------------------------------------------------------------------
import DashboardOportunidades from './view/Backoffice/Dashboard/DashboardOportunidades';
import DashboardOfertas from './view/Backoffice/Dashboard/DashboardOfertas';

import OportunidadesListBO from './view/Backoffice/Oportunidades/OportunidadesList';
import OportunidadeEditBO from './view/Backoffice/Oportunidades/OportunidadeEdit';

import ContactosOportunidadeListBO from './view/Backoffice/Oportunidades/Contactos/ContactosOportunidadeList';
import ContactoCreate from './view/Backoffice/Oportunidades/Contactos/FormContactos';
import ContactosOportunidadeUpdate from './view/Backoffice/Oportunidades/Contactos/ContactosOportunidadeEdit';

import InteracoesContactoListBO from './view/Backoffice/Oportunidades/Contactos/Interacoes/InteracoesContactoList';
import InteracaoCreate from './view/Backoffice/Oportunidades/Contactos/Interacoes/FormInteracoes';
import InteracoesContactoUpdate from './view/Backoffice/Oportunidades/Contactos/Interacoes/InteracoesContactoEdit';

import NotasInteracaoListBO from './view/Backoffice/Oportunidades/Contactos/Interacoes/Notas/NotasInteracoesList';
import NotasCreate from './view/Backoffice/Oportunidades/Contactos/Interacoes/Notas/FormNotas';
import NotasInteracoesUpdate from './view/Backoffice/Oportunidades/Contactos/Interacoes/Notas/NotasInteracoesEdit';

import FicheirosInteracaoListBO from './view/Backoffice/Oportunidades/Contactos/Interacoes/Ficheiros/FicheirosInteracaoList';
import FicheirosInteracaoCreate from './view/Backoffice/Oportunidades/Contactos/Interacoes/Ficheiros/FormFicheirosInteracao';

import ReunioesOportunidadeListBO from './view/Backoffice/Oportunidades/Reunioes/ReunioesOportunidadeList';
import ReuniaoOportunidadeCreate from './view/Backoffice/Oportunidades/Reunioes/FormReunioesOportunidade';
import ReuniaoOportunidadeEdit from './view/Backoffice/Oportunidades/Reunioes/ReunioesOportunidadeEdit';

import ContactosReuniaoOpListBO from './view/Backoffice/Oportunidades/Reunioes/Contactos/ContactosReuniaoOpList';

import ColaboradoresReuniaoOpListBO from './view/Backoffice/Oportunidades/Reunioes/Colaboradores/ColaboradoresReuniaoOpList';

import NotasReuniaoOpListBO from './view/Backoffice/Oportunidades/Reunioes/Notas/NotasReuniaoOpList';
import NotasReuniaoOpCreate from './view/Backoffice/Oportunidades/Reunioes/Notas/FormNotas';
import NotasReuniaoOpUpdate from './view/Backoffice/Oportunidades/Reunioes/Notas/NotasReuniaoOpEdit';

import FicheirosReuniaoOpListBO from './view/Backoffice/Oportunidades/Reunioes/Ficheiros/FicheirosReuniaoOpList';
import FicheirosReuniaoOpCreate from './view/Backoffice/Oportunidades/Reunioes/Ficheiros/FormFicheirosReuniaoOp';
//----------------------------------------------------------------------------------------------------------------

import OfertasListBO from './view/Backoffice/Ofertas/OfertasList';
import OfertaEditBO from './view/Backoffice/Ofertas/OfertaEdit';
import OfertaCreate from './view/Backoffice/Ofertas/FormOfertas'

import CandidaturasListBO from './view/Backoffice/Ofertas/Candidaturas/CandidaturasOfertasList';
import CandidaturaOfertaUpdateBO from './view/Backoffice/Ofertas/Candidaturas/CandidaturaOfertaUpdate';
import CandidaturaOfertaCreate from './view/Ofertas/Candidaturas/FormCandidaturas';

import EntrevistasCandidaturaListBO from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/EntrevistasCandidaturaList';
import EntrevistaCreate from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/FormEntrevista';
import EntrevistasCandidaturaEditBO from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/EntrevistasCandidaturaEdit';

import NotasEntrevistaListBO from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/Notas/NotasEntrevistaList';
import NotasEntrevistasCreate from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/Notas/FormNotasEntrevistas';
import NotasEntrevistaUpdate from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/Notas/NotasEntrevistaEdit';

import FicheirosEntrevistaListBO from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/Ficheiros/FicheirosEntrevistasList';
import FicheirosEntrevistaCreate from './view/Backoffice/Ofertas/Candidaturas/Entrevistas/Ficheiros/FormFicheirosEntrevista';
//----------------------------------------------------------------------------------------------------------------

import ListUserBO from './view/Backoffice/Users/ListUsers';
import CreateUserBO from './view/Backoffice/Users/FormUser';
import EditUserBO from './view/Backoffice/Users/EditUsers';

//----------------------------------------------------------------------------------------------------------------

import IdeiasListBO from './view/Backoffice/Ideias/IdeiasList';
import EditIdeiaBO from './view/Backoffice/Ideias/IdeiaEdit';

import ReunioesIdeiaListBO from './view/Backoffice/Ideias/Reunioes/ReunioesIdeiasList';
import ReunioesIdeiaCreate from './view/Backoffice/Ideias/Reunioes/FormReunioesIdeia';
import ReunioesIdeiaEdit from './view/Backoffice/Ideias/Reunioes/ReunioesIdeiaEdit';

import ColaboradoresReuniaoIdeiaListBO from './view/Backoffice/Ideias/Reunioes/Colaboradores/ColaboradoresReuniaoIdeia';

import NotasReuniaoIdeiaListBO from './view/Backoffice/Ideias/Reunioes/Notas/NotasReuniaoIdeiaList';
import NotasReuniaoIdeiaCreate from './view/Backoffice/Ideias/Reunioes/Notas/FormNotas';
import NotasReuniaoIdeiaUpdate from './view/Backoffice/Ideias/Reunioes/Notas/NotasReuniaoIdeiaEdit';

import FicheirosReuniaoIdeiaListBO from './view/Backoffice/Ideias/Reunioes/Ficheiros/FicheirosReuniaoIdeiaList';
import FicheirosReuniaoIdeiaCreate from './view/Backoffice/Ideias/Reunioes/Ficheiros/FormFicheirosReuniaoIdeias';
//----------------------------------------------------------------------------------------------------------------

import Tipos from './view/Backoffice/Tipos/Tipos'


import NoPermission from './403';
import Notfound from './404';

function App() {
  AuthService.getoldlogin();

  const [currentUser, setcurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false); // Novo estado


  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* ROTAS */}
        <div className='rotas'>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/confirmar/:token" element={<Confirmar />} />
            <Route path="/redefinir-senha/:token" element={<Alterarsenha />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calendario" element={<Calendario />} />

            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil/oportunidades" element={<PerfilOportunidades />} />
            <Route path="/perfil/candidaturas" element={<PerfilCandidaturas />} />

            <Route path="/oportunidades" element={<OportunidadesList />} />
            <Route path='/oportunidades/create' element={<OportunidadeCreate />} />

            <Route path="/ofertas" element={<OfertasList />} />
            <Route path="/ofertas/:ofertaId/candidaturas/create" element={<CandidaturaOfertaCreate />} />



            <Route path='/ideias' element={<IdeiasList />} />
            <Route path='/ideias/create' element={<IdeiaCreate />} />

            {/* BACKOFFICE */}

            <Route path='/backoffice/dashboard/oportunidades' element={<DashboardOportunidades />} />
            <Route path='/backoffice/dashboard/ofertas' element={<DashboardOfertas />} />

            {/* OPORTUNIDADES */}
            <Route path='/backoffice/oportunidades' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <OportunidadesListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/update' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <OportunidadeEditBO /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <ContactosOportunidadeListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/create' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}>  <ContactoCreate /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/update' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <ContactosOportunidadeUpdate /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <InteracoesContactoListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/create' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <InteracaoCreate /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/update' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <InteracoesContactoUpdate /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/notas' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <NotasInteracaoListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/notas/create' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <NotasCreate /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/notas/:notaId/update' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <NotasInteracoesUpdate /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/ficheiros' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <FicheirosInteracaoListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/ficheiros/create' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <FicheirosInteracaoCreate /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <ReunioesOportunidadeListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/update' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <ReuniaoOportunidadeEdit /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/create' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <ReuniaoOportunidadeCreate /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/contactos' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <ContactosReuniaoOpListBO /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/colaboradores' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <ColaboradoresReuniaoOpListBO /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/notas' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <NotasReuniaoOpListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/notas/create' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <NotasReuniaoOpCreate /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/notas/:notaId/update' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <NotasReuniaoOpUpdate /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/ficheiros/' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> <FicheirosReuniaoOpListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/:reuniaoId/ficheiros/create' element={<AuthService.ProtectedRoute permissions={[1, 2, ]}> < FicheirosReuniaoOpCreate /> </AuthService.ProtectedRoute>} />

            {/* OFERTAS */}

            <Route path='/backoffice/ofertas' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <OfertasListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/ofertas/:ofertaId/update' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <OfertaEditBO /> </AuthService.ProtectedRoute > } />
            <Route path='/backoffice/ofertas/create' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <OfertaCreate /> </AuthService.ProtectedRoute >} />

            <Route path='/backoffice/ofertas/:ofertaId/candidaturas' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <CandidaturasListBO /> </AuthService.ProtectedRoute >} />
            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/update' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <CandidaturaOfertaUpdateBO /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <EntrevistasCandidaturaListBO /> </AuthService.ProtectedRoute> } />
            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/create' element={<EntrevistaCreate />} />
            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/:entrevistaId/update' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <EntrevistasCandidaturaEditBO /> </AuthService.ProtectedRoute >} />

            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/:entrevistaId/notas' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <NotasEntrevistaListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/:entrevistaId/notas/create' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <NotasEntrevistasCreate /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/:entrevistaId/notas/:notaId/update' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <NotasEntrevistaUpdate /> </AuthService.ProtectedRoute >} />

            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/:entrevistaId/ficheiros/' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <FicheirosEntrevistaListBO /> </AuthService.ProtectedRoute >} />
            <Route path='/backoffice/ofertas/:ofertaId/candidaturas/:candidaturaId/entrevistas/:entrevistaId/ficheiros/create' element={<AuthService.ProtectedRoute permissions={[1, 7, ]}> <FicheirosEntrevistaCreate /> </AuthService.ProtectedRoute >} />



            {/* IDEIAS */}

            <Route path='/backoffice/ideias' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}>  <IdeiasListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/ideias/:ideiaId/update' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <EditIdeiaBO /> </AuthService.ProtectedRoute>} />

            <Route path='/backoffice/ideias/:ideiaId/reunioes' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <ReunioesIdeiaListBO /> </AuthService.ProtectedRoute>} />
            <Route path='/backoffice/ideias/:ideiaId/reunioes/create' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <ReunioesIdeiaCreate /> </AuthService.ProtectedRoute >} />
            <Route path='/backoffice/ideias/:ideiaId/reunioes/:reuniaoId/update' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <ReunioesIdeiaEdit /> </AuthService.ProtectedRoute >} />

            <Route path='/backoffice/ideias/:ideiaId/reunioes/:reuniaoId/colaboradores' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <ColaboradoresReuniaoIdeiaListBO /> </AuthService.ProtectedRoute >} />

            <Route path='/backoffice/ideias/:ideiaId/reunioes/:reuniaoId/notas' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <NotasReuniaoIdeiaListBO /> </AuthService.ProtectedRoute >} />
            <Route path='/backoffice/ideias/:ideiaId/reunioes/:reuniaoId/notas/create' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <NotasReuniaoIdeiaCreate /> </AuthService.ProtectedRoute >} />
            
            <Route path='/backoffice/ideias/:ideiaId/reunioes/:reuniaoId/notas/:notaId/update' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <NotasReuniaoIdeiaUpdate /> </AuthService.ProtectedRoute >} />

            <Route path='/backoffice/ideias/:ideiaId/reunioes/:reuniaoId/ficheiros' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <FicheirosReuniaoIdeiaListBO /> </AuthService.ProtectedRoute >} />
            <Route path='/backoffice/ideias/:ideiaId/reunioes/:reuniaoId/ficheiros/create' element={<AuthService.ProtectedRoute permissions={[1, 6, ]}> <FicheirosReuniaoIdeiaCreate /> </AuthService.ProtectedRoute >} />

            
            {/* USERS */}

            <Route path='/backoffice/users' element={<AuthService.ProtectedRoute permissions={[1,  ]}> <ListUserBO /> </AuthService.ProtectedRoute >} />
            <Route path='/backoffice/users/create' element={<AuthService.ProtectedRoute permissions={[1,  ]}> <CreateUserBO /> </AuthService.ProtectedRoute >} />
            <Route path='/backoffice/users/:id/edit' element={<AuthService.ProtectedRoute permissions={[1,  ]}> <EditUserBO /> </AuthService.ProtectedRoute >} />


            {/* TIPOS */}

            <Route path='/backoffice/tipos' element={<AuthService.ProtectedRoute permissions={[1, 2 ]}> <Tipos /> </AuthService.ProtectedRoute >} />


            <Route path='/403' element={<NoPermission />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
        {/* ROTAS */}
        <Goup />
        <Footer />
      </div>
    </Router>
  );
}
export default App;
