import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, useParams } from 'react-router-dom';
import authHeader from '../../../../auth.header'
import authService from '../../../../auth.service'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { SyncLoader } from 'react-spinners';

import moment from 'moment-timezone';
import 'moment-timezone';

export default function EntrevistaCreate() {
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()

    const { ofertaId, candidaturaId } = useParams();

    const [dataColaboradores, setDataColaboradores] = useState([]);

    const [campEntrevistador, setcampEntrevistador] = useState("");
    const [campDetalhes, setcampDetalhes] = useState("");
    const [campDataEntrevista, setcampDataEntrevista] = useState(new Date());

    function LoadColaboradoresBO() {
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

    function SendSave() {
        if (campEntrevistador === "") {
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

            const baseUrl = "https://pint-backend.onrender.com/entrevistas/candidaturas/" + candidaturaId + "/ofertas/" + ofertaId + "/create";
            const adjustedDate = (adjustDateTime(new Date(campDataEntrevista)));

            const datapost = {
                entrevistador: campEntrevistador,
                detalhes: campDetalhes,
                data_entrevista: adjustedDate,
                user: authService.getCurrentUser().id
            };
            console.log(datapost);
            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then((response) => {
                    if (response.data.success === false) {
                        alert(response.data.message);
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Entrevista Submetida',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/backoffice/ofertas/" + ofertaId + "/candidaturas/" + candidaturaId + "/entrevistas/")
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }

    useEffect(() => {
        LoadColaboradoresBO();
    }, []);

    const handleDateChange = (date) => {
        const currentDate = new Date();

        // Verifica se a data selecionada é menor que a data atual
        if (date < currentDate) {
            // Ignora a seleção da data inferior à atual
            return;
        }

        const data = new Date(date);
        setcampDataEntrevista(data)
    }


    return (

        <div className='tabela-centro'>
            {isLoading ? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>
            ) :

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="inputState">Entrevistador</label>
                            <select defaultValue={'default'} id="inputState" className="form-control" onChange={(value) => setcampEntrevistador(value.target.value)}>
                                <option disabled value="default">Choose...</option>
                                {dataColaboradores.map((data) => {
                                    return (
                                        <option key={data.id} value={data.id}>{data.primeiro_nome} {data.ultimo_nome} - {data.cargo}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col">
                            <label>Detalhes</label>
                            <input type="text" className="form-control" placeholder="Detalhes" value={campDetalhes} onChange={(value) => setcampDetalhes(value.target.value)} />
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Data</label>
                        <DatePicker shouldCloseOnSelect={false} onKeyDown={(e) => e.preventDefault()} className='teste' selected={campDataEntrevista} onChange={(date) => handleDateChange(date)} showTimeSelect dateFormat="dd/MM/yyyy HH:mm" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => SendSave()}>Submeter</button>
                </div>
            }
        </div>
    );
}