import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import authHeader from '../../../../../auth.header'
import { Link, useParams, useNavigate } from "react-router-dom";
import { SyncLoader } from 'react-spinners';
import React ,{useEffect, useState} from "react";

import moment from 'moment';
import 'moment-timezone';

export default function NotasInteracaoListBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataNotas, setDataNotas] = useState([]);
    const {oportunidadeId, contactoId, interacaoId} = useParams();

    useEffect(() => {
        LoadNotasInteracoesBO();
    },[]);

    function LoadNotasInteracoesBO() {
        const url = "https://pint-backend.onrender.com/notas/interacoes/"+interacaoId+"/contactos/"+contactoId+"/oportunidades/"+oportunidadeId+"/list"
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
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
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/notas/"+data.id+"/update"} >Edit</Link>
                    </td>
                </tr>
            )
        });
    }
    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"}>Oportunidades</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/update"}>Oportunidade</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos"}>Contactos</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/update"}>Contacto</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes"}>Interações</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/update"}>Interação</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Notas</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/" + interacaoId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
            <div style={{marginLeft:'10%'}}>
                <Link className="btn_adicionar " to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/notas/create"}>Criar Nova</Link>
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
        </div>
    );
}
