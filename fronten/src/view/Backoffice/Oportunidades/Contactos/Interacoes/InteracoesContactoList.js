import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import authHeader from '../../../../auth.header'
import { Link, useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from 'react-spinners';
import React ,{useEffect, useState} from "react";

import moment from 'moment';
import 'moment-timezone';

export default function InteracoesContactoListBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataInteracoes, setDataInteracoes] = useState([]);
    const {oportunidadeId, contactoId} = useParams();

    useEffect(() => {
        LoadInteracoesContactoBO();
    },[]);

    function LoadInteracoesContactoBO() {
        const url = "https://pint-backend.onrender.com/interacoes/list/contacto/"+contactoId+"/oportunidade/"+oportunidadeId
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataInteracoes(data);
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
                LoadInteracoesContactoBO()
            }
        })
        .catch ( error => {
            alert("Error 325 ")
        })
    }

    function OnDelete(id){
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it!'
        }).then((result) => {
        if (result.value) {
            SendDelete(id)
        } else if (result.dismiss ===
            Swal.DismissReason.cancel) {
                Swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
                )
            }
        })
    }

    const handleDeleteClick = (e, id) =>{
        e.stopPropagation()
        OnDelete(id)
    }

    function LoadFillData(){
        const sortedData = dataInteracoes.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.motivo}</td>
                    <td className='align-middle'>{data.tiposinteracao.tipo}</td>
                    <td className='align-middle'>{moment(data.data_interacao).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/"+data.id+"/update"} >Edit</Link>
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
                  <li className="breadcrumb-item active" aria-current="page">Interações</li>

                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes"}>Interações</Link>
                </li>
            </ul>
            <div>
                <Link className="btn_adicionar " to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/create"}>Criar Nova</Link>
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
                            <th scope="col">MOTIVO</th>
                            <th scope="col">TIPO DE INTERAÇÃO</th>
                            <th scope="col">DATA DE INTERAÇÃO</th>
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
