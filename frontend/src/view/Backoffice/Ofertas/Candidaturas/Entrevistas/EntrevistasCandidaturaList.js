import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import authHeader from '../../../../auth.header'
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
import { SyncLoader } from 'react-spinners';

import moment from 'moment';
import 'moment-timezone';

export default function EntrevistasCandidaturaListBO(){

    const [isLoading, setIsLoading] = useState(true);

    const {ofertaId, candidaturaId} = useParams()

    const [dataEntrevistas, setDataEntrevistas] = useState([]);
    

    function LoadEntrevistasBO() {
        const url = "https://pint-backend.onrender.com/entrevistas/candidaturas/"+candidaturaId+"/ofertas/"+ofertaId+"/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                console.log(data);
                setDataEntrevistas(data);
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
        const sortedData = dataEntrevistas.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id}>
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td> 
                    <td className='align-middle'>{data.entrevistador.primeiro_nome + ' ' + data.entrevistador.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.entrevistador.email}</p>
                    </td> 
                    <td className='align-middle'>{data.estadosentrevista.estado}</td> 
                    <td className='align-middle'>{moment(data.data_entrevista).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>

                    <td className='align-middle'>
                        <Link className="btn btn-outline-info " to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+data.id+"/update"}>Editar</Link>
                    </td>
                </tr>
            )
        });
    }

    useEffect(() => {
        LoadEntrevistasBO();
    },[]);


    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"}>Ofertas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/update"}>Oferta</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas"}>Candidaturas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/update"}>Candidatura</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Entrevistas</li>
                    
                </ol>
             </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"}>Entrevistas</Link>
                </li>
            </ul>
            <div>
                <Link className="btn_adicionar" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/create"}>Criar Nova</Link>
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
                                <th scope="col">ENTRVISTADOR</th>
                                <th scope="col">ESTADO ENTREVISTA</th>
                                <th scope="col">DATA ENTREVISTA</th>
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
