import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import authHeader from '../../../auth.header'
import React ,{useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import { SyncLoader } from 'react-spinners';

const baseUrl = "https://pint-backend.onrender.com/";

export default function CandidaturaOfertaUpdateBO(){

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataCandidatura, setDataCandidatura] = useState([]);
    
    const [dataEstadosCandidatura, setdataEstadosCandidatura] = useState([]);
    const [defaultEstado, setDefaultEstado] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [stringEstado, setstringEstado] = useState("");

    const {ofertaId, candidaturaId} = useParams();


    const LoadEstadosCandidatura = () =>{
        const url = "https://pint-backend.onrender.com/estado/candidaturas/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataEstadosCandidatura(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    const LoadCandidatura = () =>{
        const url = baseUrl+"candidaturas/"+candidaturaId+"/ofertas/"+ofertaId+"/get"
        axios.get(url, {headers: authHeader()})
        .then(res=>{
        if (res.data.success) {
            const data = res.data.data;
            setDataCandidatura(data)

            setSelectEstado(data.estadoscandidaturaId);
            setDefaultEstado(data.estadoscandidatura.estado)
            setstringEstado(data.estadoscandidatura.estado)

            LoadEstadosCandidatura();

            setIsLoading(false)
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
        LoadCandidatura();
    }, []);



    function SendUpdate(){
        if (selectEstado ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Estado!',
            });  
        }
        else
        {
            //url de backend
            const url = baseUrl+"candidaturas/"+candidaturaId+"/ofertas/"+ofertaId+"/update"
            console.log(url);
            const datapost = {
                estadocandidatura: selectEstado,

            }
            console.log(datapost);
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
                        title: 'Candidatura Atualizada',
                        showConfirmButton: false,
                        timer: 1500
                    });                   
                    navigate('/backoffice/ofertas/'+ofertaId+'/candidaturas')
                }
            })
            .catch(error=>{
                alert("Error 34 "+error)
            })
        }
    }

    const handlePDFClick = (url) => {
        axios.get(url, { headers: authHeader(), responseType: 'blob' })
        .then(response => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"}>Ofertas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/update"}>Oferta</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas"}>Candidaturas</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Candidatura</li>
                </ol>
             </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"}>Entrevistas</Link>
                </li>
            </ul>
            {isLoading? (
                    <div className='loading'>
                        <SyncLoader color="#0D6EFD" />
                    </div>           
            ):
                <div>
                    <div className="container">
                        <div className="row ">
                            <div className='col'>
                                <label>Candidato</label>
                                <p className='fw-normal'>{dataCandidatura.user.primeiro_nome + ' ' + dataCandidatura.user.ultimo_nome}</p>
                            </div>
                            <div className="col ">
                                <label>Data Candidatura</label>
                                <p className='fw-normal'>{dataCandidatura.data_candidatura.slice(0,10)}</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className='col'>
                                <label>Currículo</label>
                                <p className='fw-normal'><Link onClick={() => {handlePDFClick(`https://pint-backend.onrender.com/candidaturas/ofertas/${ofertaId}/file/${dataCandidatura.curriculo}`) }}>{dataCandidatura.curriculo}</Link></p>
                            </div>
                            <div className="col ">
                                <label htmlFor="inputState">Estado</label>
                                <select id="inputState" className="form-control" onChange={(value)=> setSelectEstado(value.target.value)}>
                                    <option value={selectEstado}>{defaultEstado}</option>
                                    {dataEstadosCandidatura.filter((data) => data.estado !== defaultEstado)
                                    .map((data) => {
                                        return (
                                            <option key={data.id} value={data.id}>{data.estado}</option>
                                            )
                                        })}
                                </select>
                            </div>
                        </div>
                    </div> 
                    <button type="submit" className="btn btn-primary" onClick={()=>SendUpdate()}>Update</button>
                </div>
            }
        </div>
    );
}

