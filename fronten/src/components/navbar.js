import { BiUserCircle } from "react-icons/bi"
import React, { useEffect, useState } from 'react';
import authHeader from "../view/auth.header";
import './navbar.css'
import { BrowserRouter as Router, Route, Link, Routes, useNavigate, useLocation } from "react-router-dom";
import authService from "../view/auth.service";
import Swal from "sweetalert2";
import Sidebar from "./sidebar";
import BackofSidebar from "./BackofSidebar";
import { FaUser } from 'react-icons/fa';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { SiOnlyoffice } from 'react-icons/si';
import axios from "axios";
import { IoIosNotifications } from 'react-icons/io'
import moment from 'moment';
import 'moment-timezone';

function Navbar() {
  const location = useLocation();
  const showSidebar = ["/home", '/oportunidades', '/oportunidades/create', '/ofertas', '/ideias', '/ideias/create', '/perfil', '/perfil/oportunidades', '/perfil/Candidaturas',].includes(location.pathname);
  const showbackofficebar = location.pathname.includes("/backoffice");
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [dataNotificacoes, setDataNotificacoes] = useState([])

  const [isLoading, setisLoading] = useState(true)


  function logoutbtn() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Você tem certeza de que deseja fazer logout?',
      text: "Essa ação encerrará sua sessão atual.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        authService.logout();
        navigate("/login");
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'info',
          title: 'Até logo! Você foi desconectado com sucesso.',
          showCloseButton: true
        })
      } else { }
    })

  }


  const ImageComponent = ({ imageUrl }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
      const loadImage = async () => {
        try {
          const response = await axios.get(imageUrl, {
            headers: authHeader(),
            responseType: 'blob'
          });
          const imageUrlLoaded = URL.createObjectURL(response.data);
          setImageSrc(imageUrlLoaded);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      if (imageUrl) {
        loadImage();
      }
    }, [imageUrl]);

    if (!imageSrc) {
      return <span>Loading image...</span>;
    }

    return <img className="me-2 img_prof" src={imageSrc} alt="Image..." />;
  };

  const LoadNotificacoes = async () => {
    const url = "https://pint-backend.onrender.com/notificacoes/list/" + user?.id;
    axios.get(url, { headers: authHeader() })
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          setDataNotificacoes(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  const LoadAll = async () => {
    try {
      const noti = await LoadNotificacoes();
      setisLoading(false);

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if(authService.getCurrentUser())
      LoadAll();
  }, [location.pathname]); // Monitora alterações na localização (rota)


  const handleNotificacaoClick = (id) => {
    const baseUrl = "https://pint-backend.onrender.com/notificacoes/" + id + "/update"
    const datapost = {
    };
    axios.post(baseUrl, datapost, { headers: authHeader() })
      .then(response => {
        if (response.data.success === false) {
          alert(response.data.message)
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
    const notfiltro = dataNotificacoes.filter(item => item.id !== id);
    setDataNotificacoes(notfiltro)
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg fixed-top`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"> <img className='logo' src="https://www.empregoregiadouro.com/uploads/0000/65/2022/06/29/logotipo-softinsa.png" alt="SOFTINSA" /> </Link>
          {showbackofficebar &&
            <>
              <IoChatbubbleOutline size={40} color="#4A4949" style={{ marginTop: '-40px', marginLeft: '-20px' }} />
              <SiOnlyoffice size={25} color="#4A4949" style={{ marginTop: '-40px', marginLeft: '-32px' }} />
            </>
          }
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          {user && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link " id="usernameDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginRight: '90px' }} >
                  {user.photo ? (
                    <img className="me-2 img_prof" src={user.photo} alt="Image..." />
                  ) : (
                    <FaUser className="me-2 img_prof" />
                  )}
                  <span>{user.pnome + " " + user.unome}</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="usernameDropdown">
                  <div>
                    <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                    {/* <li><a className="dropdown-item" href="#">Definições</a></li> */}
                    {(user.tipo === 1 || user.tipo === 2 || user.tipo === 6 || user.tipo === 7) && showSidebar && (
                      <li><Link className="dropdown-item" to="/backoffice/dashboard/oportunidades">BackOffice</Link></li>
                    )}
                    {showbackofficebar && (
                      <li><Link className="dropdown-item" to="/home">FrontOffice</Link></li>
                    )
                    }
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" onClick={logoutbtn} >Logout</Link></li>
                  </div>
                  {!user && (
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  )}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" id="notificacoesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="true" style={{ marginTop: '' }}>
                  <IoIosNotifications size={30} color="#4A4949" style={{ marginLeft: '-90px', marginTop: '5px' }} />
                  {dataNotificacoes.length > 0 ? <span className="notification-count" style={{ position: 'absolute', marginTop: '-8px', marginLeft: '-10px', color: 'red' }}>{dataNotificacoes.length}</span> : <h1 />}
                </a>
                <div className="dropdown-menu" id="notificacoes-dropdown" aria-labelledby="notificacoesDropdown" style={{ position: 'absolute', top: '100%', left: '-200px', maxWidth: '200px', maxHeight: '300px', overflowY: 'auto'}}>
                  {isLoading ? (
                    <h6>Carregando...</h6>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                      {isLoading || dataNotificacoes.length === 0 || !authService?.getCurrentUser() ? (
                        <li>Não tem notificações</li>
                      ) : (
                        dataNotificacoes?.map((data) => (
                          <li key={data.id}>
                            <Link className="dropdown-item" onClick={() => handleNotificacaoClick(data.id)}>
                              <p style={{ whiteSpace: 'pre-wrap' }}>Aviso de Reunião {moment(data.data_reuniao).tz('Europe/London').format('DD/MM/YYYY HH:mm')}<br/>{data.mensagem} </p>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          )
          }
        </div>
      </nav>
      {showSidebar && <Sidebar />}
      {showbackofficebar && <BackofSidebar />}
    </div>
  );
}
export default Navbar;