import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import authHeader from '../../../auth.header'
import { Link, useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from "react";

import moment from 'moment';
import 'moment-timezone';

export default function ReunioesIdeiaListBO() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataReunioes, setDataReunioes] = useState([]);
    const { ideiaId } = useParams();

    useEffect(() => {
        LoadReunioesIdeiasBO();
    }, []);

    function LoadReunioesIdeiasBO() {
        const url = "https://pint-backend.onrender.com/reunioes/ideias/" + ideiaId + "/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setDataReunioes(data);

                    setIsLoading(false)
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }


    const handleDeleteClick = (e, id) => {
        e.stopPropagation()
    }

    function LoadFillData() {
        const sortedData = dataReunioes.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data) => {
            return (
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th>
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{ fontSize: "13px" }}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.titulo}</td>
                    <td className='align-middle'>{data.estadosreuniao.estado}</td>
                    <td className='align-middle'>{moment(data.data_reuniao).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()} to={"/backoffice/ideias/" + ideiaId + "/reunioes/" + data.id + "/update"} >Edit</Link>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ideias/"}>Ideias</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ideias/" + ideiaId + "/update"}>Ideia</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Reuniões</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ideias/" + ideiaId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ideias/" + ideiaId + "/reunioes"}>Reuniões</Link>
                </li>
            </ul>
            <Link className="btn_adicionar " to={"/backoffice/ideias/" + ideiaId + "/reunioes/create"}>Criar Nova</Link>
            {isLoading ? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>
            ) :
                <table className="table table-hover table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">CRIADOR</th>
                            <th scope="col">TÍTULO</th>
                            <th scope="col">ESTADO</th>
                            <th scope="col">DATA</th>
                            <th scope="col">EDITAR</th>

                        </tr>
                    </thead>
                    <tbody>
                        <LoadFillData />
                    </tbody>
                </table>
            }
        </div>
    );
}
