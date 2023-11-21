import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import authHeader from '../../../../auth.header'
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SyncLoader } from 'react-spinners';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import moment from 'moment';
import 'moment-timezone';

const baseUrl = "https://pint-backend.onrender.com/";

export default function EntrevistaCandidaturaEditBO() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const { ofertaId, candidaturaId, entrevistaId } = useParams();

    const [dataEstadosEntrevistas, setDatadataEstadosEntrevistas] = useState([]);
    const [dataColaboradores, setDataColaboradores] = useState([]);

    const [defaultEstado, setDefaultEstado] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [stringEstado, setstringEstado] = useState("");

    const [defaultEntrevistador, setDefaultEntrevistador] = useState("");
    const [selectEntrevistador, setSelectEntrevistador] = useState("");
    const [stringEntrevistador, setstringEntrevistador] = useState("");

    const [campDetalhes, setcampDetalhes] = useState("");
    const [campClassificacao, setcampClassificacao] = useState("");
    const [campDataEntrevista, setcampDataEntrevista] = useState(new Date());

    const LoadEstadosEntrevistas = () => {
        const url = "https://pint-backend.onrender.com/estado/entrevistas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setDatadataEstadosEntrevistas(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    const LoadColaboradoresBO = () => {
        const url = "https://pint-backend.onrender.com/users/colaboradores/list/";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    const filteredData = data.filter(colaborador => colaborador.cargo === 'Recursos Humanos');
                    setDataColaboradores(filteredData);
                    setIsLoading(false)
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }


    const LoadEntrevista = () => {
        const url = baseUrl + "entrevistas/" + entrevistaId + "/candidaturas/" + candidaturaId + "/ofertas/" + ofertaId + "/get"
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    if (res.data.data === null) {
                        navigate("/404")
                    }
                    const data = res.data.data;

                    setcampDetalhes(data.detalhes)
                    setcampClassificacao(data?.classificacao ?? 0)


                    setSelectEstado(data.estadosentrevistaId);
                    setDefaultEstado(data.estadosentrevista.estado)
                    setstringEstado(data.estadosentrevista.estado)

                    setstringEntrevistador(data.entrevistadorId + ' - ' + data.entrevistador.primeiro_nome + ' ' + data.entrevistador.ultimo_nome)
                    setSelectEntrevistador(data.entrevistadorId)
                    setDefaultEntrevistador(data.entrevistadorId + ' - ' + data.entrevistador.primeiro_nome + ' ' + data.entrevistador.ultimo_nome)

                    setcampDataEntrevista(new Date(data.data_entrevista));

                    LoadColaboradoresBO();
                    LoadEstadosEntrevistas();

                    setIsLoading(false)
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }

    useEffect(() => {
        LoadEntrevista();
    }, []);


    function SendUpdate() {
        if (selectEntrevistador === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Entrevistador!',
            });
        } else if (campDataEntrevista === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Data da Entrevista!',
            });
        }

        else {
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
                    return date;
                }
            };

            //url de backend
            const url = baseUrl + "entrevistas/" + entrevistaId + "/candidaturas/" + candidaturaId + "/ofertas/" + ofertaId + "/update"
            const adjustedDate = (adjustDateTime(new Date(campDataEntrevista)));

            const datapost = {
                classificacao: campClassificacao,
                entrevistador: selectEntrevistador,
                detalhes: campDetalhes,
                estado: selectEstado,
                data_entrevista: adjustedDate,
            }
            axios.post(url, datapost, { headers: authHeader() })
                .then(response => {
                    if (response.data.success === false) {
                        alert(response.data.message)
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Entrevista Atualizada',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/backoffice/ofertas/" + ofertaId + "/candidaturas/" + candidaturaId + "/entrevistas")
                    }
                })
                .catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }


    const handleDateChange = (date) => {
        const currentDate = new Date();

        // Verifica se a data selecionada é menor que a data atual
        if (date < currentDate) {
            // Ignora a seleção da data inferior à atual
            return;
        }

        setcampDataEntrevista(date);
    }

    const handleRatingChange = (event) => {
        setcampClassificacao(event.target.value);
    };

    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"}>Ofertas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/" + ofertaId + "/update"}>Oferta</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/" + ofertaId + "/candidaturas"}>Candidaturas</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/" + ofertaId + "/candidaturas/" + candidaturaId + "/update"}>Candidatura</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/" + ofertaId + "/candidaturas/" + candidaturaId + "/entrevistas"}>Entrevistas</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Entrevista</li>

                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ofertas/" + ofertaId + "/candidaturas/" + candidaturaId + "/entrevistas/" + entrevistaId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/" + ofertaId + "/candidaturas/" + candidaturaId + "/entrevistas/" + entrevistaId + "/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/" + ofertaId + "/candidaturas/" + candidaturaId + "/entrevistas/" + entrevistaId + "/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>
            <div>
                {isLoading ? (
                    <div className='loading'>
                        <SyncLoader color="#0D6EFD" />
                    </div>
                ) :
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="inputState">Entrevistador</label>
                                <select defaultValue={'default'} id="inputState" className="form-control" onChange={(value) => setSelectEntrevistador(value.target.value)}>
                                    <option value={selectEntrevistador}>{stringEntrevistador}</option>
                                    {dataColaboradores.filter((data) => (data.id + ' - ' + data.primeiro_nome + ' ' + data.ultimo_nome) !== defaultEntrevistador)
                                        .map((data) => {
                                            return (
                                                <option key={data.id} value={data.id}>{data.id + ' - ' + data.primeiro_nome + ' ' + data.ultimo_nome}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="inputState">Estado</label>
                                <select id="inputState" className="form-control" onChange={(value) => setSelectEstado(value.target.value)}>
                                    <option value={selectEstado}>{stringEstado}</option>
                                    {dataEstadosEntrevistas.filter((data) => data.estado !== defaultEstado)
                                        .map((data) => {
                                            return (
                                                <option key={data.id} value={data.id}>{data.estado}</option>
                                            )
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">

                                <label for="customRange3" className="form-label">Classificação</label>
                                <div className="rating-labels">
                                    <span>0</span>
                                    <span style={{ marginLeft: '18.7%' }}>1</span>
                                    <span style={{ marginLeft: '18.7%' }}>2</span>
                                    <span style={{ marginLeft: '18.3%' }}>3</span>
                                    <span style={{ marginLeft: '18.3%' }}>4</span>
                                    <span style={{ marginLeft: '18.7%' }}>5</span>
                                </div>
                                <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" value={campClassificacao} onChange={handleRatingChange} />
                            </div>
                            <div className="col">
                                <label>Detalhes</label>
                                <textarea type="text" className="form-control" placeholder="Detalhes" value={campDetalhes} onChange={(value) => setcampDetalhes(value.target.value)} />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Data</label>
                            <DatePicker shouldCloseOnSelect={false} onKeyDown={(e) => e.preventDefault()} className='teste' selected={campDataEntrevista} onChange={(date) => handleDateChange(date)} showTimeSelect dateFormat="dd/MM/yyyy HH:mm" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => SendUpdate()}>Submeter</button>
                    </div>
                }
            </div>
        </div>
    );
}

