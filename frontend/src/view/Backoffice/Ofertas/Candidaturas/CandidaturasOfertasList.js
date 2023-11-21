import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import authHeader from '../../../auth.header'
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
import { SyncLoader } from 'react-spinners';

import moment from 'moment';
import 'moment-timezone';

export default function CandidaturasListBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const {ofertaId} = useParams()

    const [dataCandidaturas, setDataCandidaturas] = useState([]);
    

    useEffect(() => {
        LoadCandidaturasBO();
    },[]);

    function LoadCandidaturasBO() {
        const url = "https://pint-backend.onrender.com/candidaturas/ofertas/"+ofertaId+"/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                console.log(data);
                setDataCandidaturas(data);
                setIsLoading(false)
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }
    
    const handlePDFClick = (url) => {
      axios.get(url, { headers: authHeader(), responseType: 'blob' })
        .then(response => {
            console.log(response);
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
      
    
    function LoadFillData(){
        const sortedData = dataCandidaturas.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            const downloadUrl = `https://pint-backend.onrender.com/candidaturas/ofertas/${ofertaId}/file/${data.curriculo}`;
            return(
                <tr key={data.id}>
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td> 
                    <td className='align-middle'>{data.user.telemovel}</td> 
                    <td className='align-middle'><Link onClick={() => {handlePDFClick(downloadUrl); }}>{data.curriculo}</Link></td>

                    <td className='align-middle'>{data.estadoscandidatura.estado}</td> 
                    <td className='align-middle'>{moment(data.data_candidatura).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>

                    <td className='align-middle'>
                        <Link className="btn btn-outline-info " to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+data.id+"/update"}>Editar</Link>
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
                    <li className="breadcrumb-item active" aria-current="page">Candidaturas</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"}>Candidaturas</Link>
                </li>
            </ul>
            <div>
                {/* <Link className="btn_adicionar " to={"/backoffice/ofertas/create"}>Criar Nova</Link> */}
                {isLoading? (
                    <div className='loading'>
                        <SyncLoader color="#0D6EFD" />
                    </div>           
                ):
                    <table className="table table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">CANDIDATO</th>
                                <th scope="col">TELEMÓVEL</th>
                                <th scope="col">CURRÍCULO</th>
                                <th scope="col">ESTADO CANDIDATURA</th>
                                <th scope="col">DATA CANDIDATURA</th>
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
