import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import authHeader from '../../../../auth.header'
import { Link, useParams } from "react-router-dom";
import { SyncLoader } from 'react-spinners';
import React ,{useEffect, useState} from "react";
export default function FicheirosReuniaoOpListBO(){

    const [isLoading, setIsLoading] = useState(true);

    const [dataFicheiros, setDataFicheiros] = useState([]);
    const { oportunidadeId, reuniaoId } = useParams();

    

    function LoadFicheirosReuniaoOpBO() {
        const url = "https://pint-backend.onrender.com/ficheiros/reunioes/"+reuniaoId+"/oportunidades/"+oportunidadeId+"/list"
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

    useEffect(() => {
        LoadFicheirosReuniaoOpBO();
    },[]);


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
            const downloadUrl = `https://pint-backend.onrender.com/ficheiros/reunioes/${reuniaoId}/oportunidades/${oportunidadeId}/file/${data.ficheiro}`
            console.log(downloadUrl);
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


    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"}>Oportunidades</Link></li>
                <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/update"}>Oportunidade</Link></li>
                <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes"}>Reuniões</Link></li>
                <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/update"}>Reunião</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Ficheiros</li>
              </ol>
            </nav>

            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/reunioes/" + reuniaoId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                <   Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/reunioes/" + reuniaoId + "/contactos"}>Contactos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/colaboradores"}>Colaboradores</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
            <Link className="btn_adicionar " to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/ficheiros/create"}>Criar Nova</Link>
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
    );
}
