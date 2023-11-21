import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import authHeader from '../../../auth.header'
import { SyncLoader } from 'react-spinners';

import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
export default function ContactosOportunidadeListBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataContactos, setDataContactos] = useState([]);
    const {oportunidadeId} = useParams();

    useEffect(() => {
        LoadContactosOportunidadeBO();
    },[]);

    function LoadContactosOportunidadeBO() {
        const url = "https://pint-backend.onrender.com/contactos/list/oportunidade/"+oportunidadeId;
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                console.log(data);
                setDataContactos(data);
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
        const sortedData = dataContactos.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.primeiro_nome + ' ' + data.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.email}</p>
                    </td>
                    <td className='align-middle'>{data.telemovel}</td>
                    <td className='align-middle'>{data.cargo_na_empresa}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + data.id + "/update"} >Edit</Link>
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
                    <li className="breadcrumb-item active" aria-current="page">Contactos</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/contactos"}>Contactos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/reunioes"}>Reuniões</Link>
                </li>
            </ul>
            <div style={{marginLeft:'10%'}}>
                <Link className="btn_adicionar " to={"/backoffice/oportunidades/"+ oportunidadeId +"/contactos/create"}>Criar Novo</Link>
                {isLoading? (
                    <div className='loading'>
                        <SyncLoader color="#0D6EFD" />
                    </div>           
                ):
                    <table className="table table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">NOME</th>
                                <th scope="col">TELEMÓVEL</th>
                                <th scope="col">CARGO</th>
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
