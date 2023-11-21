import axios from 'axios';
import authHeader from '../../../auth.header'

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js' 
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss' 
import { SyncLoader } from 'react-spinners'; 

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import moment from 'moment';
import 'moment-timezone';

export default function ReunioesIdeiaEdit() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataEstadosReuniao, setdataEstadosReuniao] = useState([]);

    const { ideiaId, reuniaoId } = useParams();

    const [campTitulo, setcampTitulo] = useState("");
    const [campDetalhes, setcampDetalhes] = useState("");
    const [campDataReuniao, setcampDataReuniao] = useState(new Date());

    const [defaultEstado, setDefaultEstado] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [stringEstado, setstringEstado] = useState("");

    const LoadEstadosReuniao = () => {
        const url = "https://pint-backend.onrender.com/estado/reuniao/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataEstadosReuniao(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    const LoadReuniao = () => {
        const url = "https://pint-backend.onrender.com/reunioes/ideias/" + ideiaId + "/reuniao/" + reuniaoId
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setcampTitulo(data.titulo)
                    setcampDetalhes(data.detalhes)

                    setcampDataReuniao(new Date(data.data_reuniao));

                    setSelectEstado(data.estadosreuniaoId);
                    setDefaultEstado(data.estadosreuniao.estado)
                    setstringEstado(data.estadosreuniao.estado)

                    setIsLoading(false)

                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })

        LoadEstadosReuniao();
    }

    useEffect(() => {
        LoadReuniao()
    }, []);


    const adjustDateTime = (date) => {
        const timezone = 'Europe/London';
        const momentDate = moment.tz(date, timezone);

        // Verifica se a data está dentro do horário de verão
        const isDST = momentDate.isDST();
        console.log(isDST);
        if (isDST) {
            // Se estiver dentro do horário de verão, subtrai 2 horas
            return momentDate.add(1, 'hour').toDate();
        } else {
            // Se estiver fora do horário de verão, subtrai 1 hora
            return momentDate.add(2, 'hour').toDate();
        }
    };

    function SendUpdate() {
        if (campTitulo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Título!',
            });
        } else if (campDetalhes === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira os Detalhes!',
            });
        } else if (campDataReuniao === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Data!',
            });
        } else if (selectEstado === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Estado!',
            });
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/reunioes/ideias/" + ideiaId + "/reuniao/" + reuniaoId + "/update";
            const adjustedDate = (adjustDateTime(new Date(campDataReuniao)));

            const datapost = {
                titulo: campTitulo,
                detalhes: campDetalhes,
                data_reuniao: adjustedDate,
                estado: selectEstado,
            };
            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then(response => {
                    if (response.data.success === false) {
                        alert(response.data.message)
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Reuniao Atualizada',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/backoffice/ideias/' + ideiaId + '/reunioes/')
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }

    const handleDateChange = (date) => {
        const currentDate = new Date();

        // Verifica se a data selecionada é menor que a data atual
        if (date < currentDate) {
            // Ignora a seleção da data inferior à atual
            return;
        }

        setcampDataReuniao(date);
    }

    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ideias/"}>Ideias</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ideias/" + ideiaId + "/update"}>Ideia</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ideias/" + ideiaId + "/reunioes/"}>Reuniões</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Reunião</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ideias/" + ideiaId + "/reunioes/" + reuniaoId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ideias/" + ideiaId + "/reunioes/" + reuniaoId + "/colaboradores"}>Colaboradores</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ideias/" + ideiaId + "/reunioes/" + reuniaoId + "/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ideias/" + ideiaId + "/reunioes/" + reuniaoId + "/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
            {isLoading ? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>
            ) :
                <div className='container'>
                    <div className="row">
                        <div className="col">
                            <label>Título</label>
                            <input type="text" className="form-control" placeholder="Título" value={campTitulo} onChange={(value) => setcampTitulo(value.target.value)} />
                        </div>
                        <div className="col">
                            <label>Detalhes</label>
                            <input type="text" className="form-control" placeholder="Detalhes" value={campDetalhes} onChange={(value) => setcampDetalhes(value.target.value)} />
                        </div>
                        <div className="row">
                            <div className="col" style={{marginRight:'1.5%'}}>
                                <label htmlFor="inputState">Estado da Reunião</label>
                                <select id="inputState" className="form-control" onChange={(value) => setSelectEstado(value.target.value)} style={{width:'103%'}}>
                                    <option value={selectEstado}>{defaultEstado}</option>
                                    {dataEstadosReuniao.filter((data) => data.estado !== defaultEstado)
                                        .map((data) => {
                                            return (
                                                <option key={data.id} value={data.id}>{data.estado}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col">
                                <label>Data</label>
                                <DatePicker shouldCloseOnSelect={false} onKeyDown={(e) => e.preventDefault()} className='teste' selected={campDataReuniao} onChange={(date) => handleDateChange(date)} showTimeSelect dateFormat="dd/MM/yyyy HH:mm" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => SendUpdate()}>Submeter</button>
                </div>
            }
        </div>
    );
}
