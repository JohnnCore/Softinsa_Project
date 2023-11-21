import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import authHeader from '../../../../auth.header'
import { Link, useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from "react";

export default function ContactosReuniaoOpListBO() {

    const [isLoading, setIsLoading] = useState(true);

    const [dataContactos, setDataContactos] = useState([]);
    const [dataContactosReuniao, setDataContactosReuniao] = useState([]);

    const [contatosSelecionados, setContatosSelecionados] = useState([]);
    const [contatosDeselecionados, setContatosDeselecionados] = useState([]);

    const { oportunidadeId, reuniaoId } = useParams();

    useEffect(() => {
        LoadContactosOportunidadeBO();
        LoadContactosReuniaoOpBO();
    }, []);

    function LoadContactosOportunidadeBO() {
        const url = "https://pint-backend.onrender.com/contactos/list/oportunidade/" + oportunidadeId;
        axios.get(url, {headers: authHeader()})
        .then(res => {
        if (res.data.success) {
            const data = res.data.data;
            setDataContactos(data);
        } else {
            alert("Error Web Service!");
        }
        })
        .catch(error => {
            alert(error);
        });
    }

    function LoadContactosReuniaoOpBO() {
        const url = "https://pint-backend.onrender.com/reunioes/" + reuniaoId + "/oportunidadescontactos/" + oportunidadeId + "/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if (res.data.success) {
                const data = res.data.data;
                setDataContactosReuniao(data);
                setContatosSelecionados(data.map(reuniaoData => reuniaoData.contactoId));
                setContatosDeselecionados(data.map(reuniaoData => reuniaoData.contactoId));

                setIsLoading(false)  
            } else {
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error);
        });
    }
    
    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
    };

    const handleCheckboxChange = (event, contatoId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
        // Adicionar contato ao array de contatos selecionados
        setContatosSelecionados((prevSelecionados) => [
          ...prevSelecionados,
          contatoId,
        ]);
      } else {
        // Remover contato do array de contatos selecionados
        setContatosSelecionados((prevSelecionados) =>
          prevSelecionados.filter((id) => id !== contatoId)
        );
      }
    };

    const handleSubmit = () =>{
        const url = "https://pint-backend.onrender.com/reunioes/"+reuniaoId+"/oportunidadescontactos/add";
        const contatosNaoSelecionados = contatosDeselecionados.filter(
            (contato) => !contatosSelecionados.includes(contato)
        );    

        const idsComuns = dataContactos.filter(
            (contato) => contatosSelecionados.includes(contato.id)
        );         

        const datapost = {
            adicionar: contatosSelecionados,
            contactos_add: idsComuns,
            remover : contatosNaoSelecionados,
            reuniao: reuniaoId,
        }
        console.log(idsComuns);
        console.log(idsComuns);
        axios.post(url, datapost, {headers: authHeader()})
        .then(response => {
            if (response.data.success) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Contactos Adicionados',
                    showConfirmButton: false,
                    timer: 1500
                });           
            }   
        })
        .catch(error => {
            alert("Error 325 ");
        });
    }
    useEffect(() => {
        const commonIds = dataContactosReuniao.map(reuniaoData => reuniaoData.contactoId);
        const selecionados = dataContactos.filter(data => commonIds.includes(data.id));
        setContatosSelecionados(selecionados.map(data => data.id));
    }, [dataContactos, dataContactosReuniao]);

    function LoadFillData() {
        const sortedData = dataContactos.sort((a, b) => b.id - a.id);
        return sortedData.map((data) => {
            const isChecked = contatosSelecionados.includes(data.id);  
            return (
                <tr key={data.id}>
                    <th className='align-middle'>
                        <input style={{ marginRight: '35%' }} className="form-check-input" type="checkbox" checked={isChecked} onChange={(event) => handleCheckboxChange(event, data.id)} />
                        {data.id}
                    </th>
                    <td className='align-middle'>{data.primeiro_nome + ' ' + data.ultimo_nome}
                        <p style={{ fontSize: "13px" }}>{data.email}</p>
                    </td>
                    <td className='align-middle'>{data.telemovel}</td>
                    <td className='align-middle'>{data.cargo_na_empresa}</td>
                </tr>
            );
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
                <li className="breadcrumb-item active" aria-current="page">Contactos</li>
              </ol>
            </nav>

            <Link className="btn_adicionar" onClick={()=>handleSubmit()}>Submit</Link>

            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/reunioes/" + reuniaoId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                <   Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/reunioes/" + reuniaoId + "/contactos"}>Contactos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/colaboradores"}>Colaboradores</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/reunioes/"+reuniaoId+"/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
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