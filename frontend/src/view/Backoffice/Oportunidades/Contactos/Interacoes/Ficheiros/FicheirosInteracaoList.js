import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import authHeader from '../../../../../auth.header'
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
import { SyncLoader } from 'react-spinners';
export default function NotasInteracaoListBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataFicheiros, setDataFicheiros] = useState([]);
    const {oportunidadeId, contactoId, interacaoId} = useParams();

    useEffect(() => {
        LoadFicheirosInteracoesBO();
    },[]);

    function LoadFicheirosInteracoesBO() {
        const url = "https://pint-backend.onrender.com/ficheiros/interacoes/"+interacaoId+"/contactos/"+contactoId+"/oportunidades/"+oportunidadeId+"/list"
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
    function SendDelete(id)
    {
        // url do backend 
        const url = "https://pint-backend.onrender.com/oportunidades/delete"
        // network
        axios.post(url,{
            id:id
        })
        .then(response =>{
            if (response.data.success) {
                Swal.fire(
                'Deleted!',
                'Your filme has been deleted.',
                'success'
                )
                LoadFicheirosInteracoesBO()
            }
        })
        .catch ( error => {
            alert("Error 325 ")
        })
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
            const downloadUrl = `https://pint-backend.onrender.com/ficheiros/interacoes/${interacaoId}/contactos/${contactoId}/oportunidades/${oportunidadeId}/file/${data.ficheiro}`
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
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos"}>Contactos</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/update"}>Contacto</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes"}>Interações</Link></li>
                  <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/update"}>Interação</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Ficheiros</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/" + interacaoId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
            <div style={{marginLeft:'10%'}}>
                <Link className="btn_adicionar " to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+interacaoId+"/ficheiros/create"}>Criar Novo</Link>
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
