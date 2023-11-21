import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import authHeader from '../../auth.header'
import { SyncLoader } from 'react-spinners';

import axios from 'axios';
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = "https://pint-backend.onrender.com/";
export default function OportunidadeEditBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataTiposProjeto, setdataTiposProjeto] = useState([]);
    const [dataAreasNegocio, setdataAreasNegocio] = useState([]);
    const [dataEstadosOportunidade, setdataEstadosOportunidade] = useState([]);

    const {oportunidadeId} = useParams();
    const [campTitulo, setcampTitulo] = useState("");
    const [campEmpresa, setcampEmpresa] = useState("");
    const [campNecessidades, setcampNecessidades] = useState("");

    const [defaultTipo, setDefaultTipo] = useState("");
    const [selectTipo, setSelectTipo] = useState("");
    const [stringTipo, setstringTipo] = useState("");

    const [defaultArea, setDefaultArea] = useState("");
    const [selectArea, setSelectArea] = useState("");
    const [stringArea, setstringArea] = useState("");

    const [defaultEstado, setDefaultEstado] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [stringEstado, setstringEstado] = useState("");



    const LoadTiposProjeto = () =>{
        const url = "https://pint-backend.onrender.com/tipos/projetos/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataTiposProjeto(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    const LoadAreasNegocio = () =>{
        const url = "https://pint-backend.onrender.com/areas/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataAreasNegocio(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    const LoadEstadosOportunidades = () =>{
        const url = "https://pint-backend.onrender.com/estado/oportunidades/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataEstadosOportunidade(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }


    const LoadOportunidade = () =>{
        const url = baseUrl+"oportunidades/get/" + oportunidadeId;
        axios.get(url, {headers: authHeader()})
        .then(res=>{
        if (res.data.success) {
            if(res.data.data === null)
            {
                navigate("/404")
            }
            else
            {
                const data = res.data.data; 
                setcampTitulo(data.titulo)
                setcampEmpresa(data.empresa)
                setcampNecessidades(data.necessidades)

                setSelectTipo(data.tiposdeprojetoId);
                setDefaultTipo(data.tiposdeprojeto.tipo)
                setstringTipo(data.tiposdeprojeto.tipo)

                setSelectArea(data.areasdenegocioId);
                setDefaultArea(data.areasdenegocio.area)
                setstringArea(data.areasdenegocio.area)

                setSelectEstado(data.estadosoportunidadeId);
                setDefaultEstado(data.estadosoportunidade.estado)
                setstringEstado(data.estadosoportunidade.estado) 

                LoadTiposProjeto();
                LoadAreasNegocio();
                LoadEstadosOportunidades();           
                
                setIsLoading(false)
            }
        }
        else {
            alert("Error web service")
        }
        })
        .catch(error=>{
        alert("Error server: "+error)
        })

        
    }

    useEffect(() => {
        LoadOportunidade()
    }, []);

    function SendUpdate(){
        if (selectTipo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tipo de Projeto!',
            });
        }else if (selectEstado ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Estado!',
            });  
        }else if (selectArea ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Area de Negocio!',
            });
        }else if (campTitulo ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Título!',
            });   
        }else if (campEmpresa ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Empresa!',
            });   
        }else if (campNecessidades ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Necessidade!',
            });   
        }
        else
        {
            //url de backend
            const url = baseUrl+"oportunidades/update/"+ oportunidadeId
            const datapost = {
                tipodeprojeto: selectTipo,
                areadenegocio: selectArea,
                estadooportunidade: selectEstado,
                titulo: campTitulo,
                empresa: campEmpresa,
                necessidade: campNecessidades,
            }
            axios.post(url,datapost, {headers: authHeader()})
            .then(response=>{
                if (response.data.success=== false ) {
                    alert(response.data.message)
                }
                else 
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Oportunidade Atualizada',
                        showConfirmButton: false,
                        timer: 1500
                    });                   
                    navigate('/backoffice/oportunidades')
                }
            })
            .catch(error=>{
                alert("Error 34 "+error)
            })
        }
    }


    return (
        <div style={{marginLeft:'15%'}}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"}>Oportunidades</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Oportunidade</li>
              </ol>
            </nav>
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId+"/update"}>Detalhes</Link>
                </li>
                <li class="nav-item">
                <Link class="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/contactos"}>Contactos</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/reunioes"}>Reuniões</Link>
                </li>
            </ul>
            {isLoading? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>           
            ):
            <div className="container" >
                <div className="row">
                    <div className="col">
                        <label>Titulo</label>
                        <input type="text" className="form-control" placeholder="Titulo" value={campTitulo} onChange={(value)=> setcampTitulo(value.target.value)}/>
                    </div>
                    <div className="col">
                        <label>Empresa</label>
                        <input type="text" className="form-control" placeholder="Empresa" value={campEmpresa} onChange={(value)=> setcampEmpresa(value.target.value)}/>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col">
                        <label>Necessidades</label>
                        <textarea type="text" className="form-control" placeholder="Necessidades" value={campNecessidades} onChange={(value)=> setcampNecessidades(value.target.value)}/>
                    </div>
                    <div className="col">
                        <label htmlFor="inputState">Tipo de Projeto</label>
                        <select id="inputState" className="form-control" onChange={(value)=> setSelectTipo(value.target.value)}>
                            <option value={selectTipo}>{defaultTipo}</option>
                            {dataTiposProjeto.filter((data) => data.tipo !== defaultTipo)
                            .map((data) => {
                                return (
                                    <option key={data.id} value={data.id}>{data.tipo}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="inputState">Áreas de Negócio</label>
                        <select id="inputState" className="form-control" onChange={(value)=> setSelectArea(value.target.value)}>
                            <option value={selectArea}>{defaultArea}</option>
                            {dataAreasNegocio.filter((data) => data.area !== defaultArea)
                            .map((data) => {
                                return (
                                    <option key={data.id} value={data.id}>{data.area}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="inputState">Estado</label>
                        <select id="inputState" className="form-control" onChange={(value)=> setSelectEstado(value.target.value)}>
                            <option value={selectEstado}>{defaultEstado}</option>
                            {dataEstadosOportunidade.filter((data) => data.estado !== defaultEstado)
                            .map((data) => {
                                return (
                                    <option key={data.id} value={data.id}>{data.estado}</option>
                                    )
                                })}
                        </select>
                    </div>   
                </div>
                <button type="submit" className="btn btn-primary" onClick={()=>SendUpdate()}>Update</button>
            </div>                                          
            }
        </div>
    );
}

