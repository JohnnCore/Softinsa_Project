import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import authHeader from '../../../../../auth.header'
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
import { SyncLoader } from 'react-spinners';
export default function FicheirosEntrevistaListBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataFicheiros, setDataFicheiros] = useState([]);
    
    const {ofertaId, candidaturaId, entrevistaId} = useParams();

    function LoadFicheirosEntrevistasBO() {
        const url = "https://pint-backend.onrender.com/ficheiros/entrevistas/"+entrevistaId+"/candidaturas/"+candidaturaId+"/ofertas/"+ofertaId+"/list"
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                console.log(data); 
                setDataFicheiros(data);
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
        const sortedData = dataFicheiros.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{ 
            const downloadUrl = `https://pint-backend.onrender.com/ficheiros/entrevistas/${entrevistaId}/candidaturas/${candidaturaId}/ofertas/${ofertaId}/file/${data.ficheiro}`
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'><Link onClick={() => {handlePDFClick(downloadUrl); }}>{data.ficheiro}</Link></td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={""} >Edit</Link>
                    </td>
                </tr>
            )
        });
    }

    useEffect(() => {
        LoadFicheirosEntrevistasBO();
    },[]);

    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"}>Ofertas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/update"}>Oferta</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas"}>Candidaturas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/update"}>Candidatura</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas"}>Entrevistas</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Entrevista</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
            <div>
                <Link className="btn_adicionar " to={"/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/ficheiros/create"}>Criar Novo</Link>
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
                                <th scope="col">FICHEIRO</th>
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
