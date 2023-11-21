import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import authHeader from '../../../../../auth.header'
import { Link, useParams } from "react-router-dom";
import { SyncLoader } from 'react-spinners';
import React ,{useEffect, useState} from "react";

import moment from 'moment';
import 'moment-timezone';

export default function NotasEntrevistaListBO(){

    
    const [isLoading, setIsLoading] = useState(true);
    
    const [dataNotas, setDataNotas] = useState([]);
    
    const {ofertaId, candidaturaId, entrevistaId} = useParams();

    useEffect(() => {
        LoadNotasEntrevistaBO();
    },[]);

    function LoadNotasEntrevistaBO() {
        const url = "https://pint-backend.onrender.com/notas/entrevistas/"+entrevistaId+"/candidaturas/"+candidaturaId+"/ofertas/"+ofertaId+"/list"
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                console.log(data);
                setDataNotas(data);

                setIsLoading(false)  
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }
    
    const handleDeleteClick = (e, id) =>{
        e.stopPropagation()
    }

    function LoadFillData(){
        const sortedData = dataNotas.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{ 
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.titulo}</td>
                    <td className='align-middle'>{moment(data.data_criacao).tz('Europe/London').format('DD/MM/YYYY')}</td>
                    <td className='align-middle'>{moment(data.data_atualizacao).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/notas/"+data.id+"/update"} >Edit</Link>
                    </td>
                </tr>
            )
        });
    }
    return (
        <div className="tabela-centro">

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"}>Ofertas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/update"}>Oferta</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas"}>Candidaturas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/update"}>Candidatura</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas"}>Entrevistas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/update"}>Entrevista</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Notas</li>

                </ol>
             </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
            <Link className="btn_adicionar " to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/notas/create"}>Criar Nova</Link>
            {isLoading? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>           
            ):
                <table className="table table-hover table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">CRIADOR</th>
                            <th scope="col">TITULO</th>
                            <th scope="col">DATA DE CRIAÇÃO</th>
                            <th scope="col">DATA DE ATUALIZAÇÃO</th>
                            <th scope="col">EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <LoadFillData/>
                    </tbody>
                </table>
            }
        </div>
    );
}
