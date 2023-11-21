import './index.css'
import { Parallax, ParallaxLayer } from '@react-spring/parallax' 
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index() {

  const [beneficios, setBeneficios] = useState([]);

  function LoadBeneficios() {
    const url = "https://pint-backend.onrender.com/beneficios/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setBeneficios(data);
            }else{}
        })
        .catch(error => {
          alert(error)
      });
  }
  
  useEffect(() => {
    LoadBeneficios();
  },[]);

  function LoadFillData(){
    return beneficios.map((data) => {
      return (
        <div class="card mb-3 border-dark" style={{width: "16%", minHeight: "8rem", color: 'white', backgroundColor: '#18293E', marginLeft: '1.5%', marginRight: '1.5%'}}>
        <div class="card-body">
          <p class="card-text">{data.beneficio}</p>
        </div>
        <div class="card-footer bg-transparent border-secondary border-secondary">{data.tiposbeneficio.tipo}</div>
        </div>
      )
    }
    )
  }

  const[btn_margin,setbtn_margin] = useState('35px')

    return (
      <div>
        <div className='btn_entrar' style={{marginLeft: btn_margin}}>
        <Link to="/login" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        Entrar
        </div>
        <div className='idioma'>
          <span className='link_atual'>pt</span> | <Link className='link'>eng</Link> | <Link className='link'>es</Link>
        </div>
        <Parallax className='index' pages={1.75} style={{ top: '0', left: '0' }}>
        <ParallaxLayer style={{backgroundImage: "url('https://www.softinsa.pt/wp-content/themes/softinsa/images/banner.jpg')",backgroundSize: 'cover'}} offset={0} factor={1} speed={1}>
        </ParallaxLayer>
        <ParallaxLayer offset={0.3} factor={0.5} speed={0.275}>
          <hr style={{width:'60%', marginLeft: '25%', marginBottom: '5%', border: '2px solid #15BBE5', opacity:'100%'}} />
          <img style={{width: '40%'}} src="https://www.neptune-software.com/wp-content/uploads/2017/11/logotipo_softinsa_2016.png" alt="" />
          <hr style={{width:'60%', marginLeft: '15%', marginTop: '5%', border: '2px solid #37649E', opacity:'100%'}} />
        </ParallaxLayer>
        <ParallaxLayer offset={0.99} factor={0.25} speed={1}>
          <h1 style={{color: 'white', fontSize: '50px', marginTop: '2.5%'}} className='mb-5'>Descubra uma nova forma de conexão colaborativa!</h1>
          <p  style={{color: 'white', fontSize: '20px', marginTop: '2.5%', marginLeft: '33.33%', width: '33.33%'}} className='mb-5'>Nossa plataforma integra informações, oportunidades de negócios, vagas, benefícios e ideias de melhorias. Mantenha-se conectado, faça parte da evolução contínua da empresa e impulsione o seu crescimento. Seja parte dessa transformação!</p>
          <ParallaxLayer offset={0.90} factor={0.5} speed={1} style={{backgroundColor: '#00B0DA'}}>
          <h2 style={{color: 'white', fontSize: '40px', marginTop: '2.5%', marginLeft: '-80%'}} className='mb-5'>Benefícios</h2>
          <div className='row' style={{marginLeft: '6%'}}>
            <LoadFillData/>
          </div>
          <ParallaxLayer offset={0.99} factor={1} speed={0.5} style={{backgroundImage: "url('https://i.ibb.co/SXbh53z/yahqqq.png')",backgroundSize: 'cover'}}>
          <h2 style={{color: 'white', fontSize: '40px', marginTop: '7.5%', width:'35%', marginLeft: '5%'}} className='mb-5'>Faz já o download da nossa aplicação para que possas estar ligado à nossa plataforma em qualquer lugar</h2>
          <div type="button" class="btn btn-primary" style={{ marginTop: '0', height: '50px',marginRight: '45%'}}><a href={'https://transfer.sh/get/rPf5fPWGmI/app-release.apk'} style={{all: 'unset'}} >Clica Aqui Para Fazeres Download</a></div>
        </ParallaxLayer>
        </ParallaxLayer>
        </ParallaxLayer>

        
      </Parallax>
      </div>
    )   
}