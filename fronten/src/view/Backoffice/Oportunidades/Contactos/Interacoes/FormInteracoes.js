import axios from 'axios';
import authHeader from '../../../../auth.header'
import authService from '../../../../auth.service'
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import 'sweetalert2/src/sweetalert2.scss'


export default function InteracaoCreate() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const { oportunidadeId, contactoId } = useParams();

    const [dataTiposInteracao, setdataTiposInteracao] = useState([])

    const [campMotivo, setcampMotivo] = useState("");

    const [selectTipo, setSelectTipo] = useState("");

    const LoadTiposInteracao = () => {
        const url = "https://pint-backend.onrender.com/tipos/interacao/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataTiposInteracao(data);
                    setIsLoading(false)
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    function SendSave() {
        if (campMotivo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Motivo!',
            });
        } else if (selectTipo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tipo de Interação!',
            });
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/interacoes/create/contacto/" + contactoId + "/oportunidade/" + oportunidadeId;
            const datapost = {
                user: authService.getCurrentUser().id,
                tipo: selectTipo,
                motivo: campMotivo,
            };
            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then((response) => {
                    console.log(response);
                    if (response.data.success === false) {
                        alert(response.data.message);
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Interacao Submetido',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/interacoes/")
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }

    useEffect(() => {
        LoadTiposInteracao();
    }, [])
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
                            <label>Motivo</label>
                            <input type="text" className="form-control" placeholder="Motivo" value={campMotivo} onChange={(value) => setcampMotivo(value.target.value)} />
                        </div>
                        <div className="col">
                            <label htmlFor="inputtipo">Tipo de Interação</label>
                            <select defaultValue={'default'} id="inputtipo" className="form-control" onChange={value => setSelectTipo(value.target.value)}>
                                <option disabled value="default">Choose...</option>
                                {dataTiposInteracao
                                    .map((data) => {
                                        return (
                                            <option key={data.id} value={data.id}>{data.tipo}</option>
                                        )
                                    })}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => SendSave()}>Submeter</button>
                </div>
            }
        </div>
    );
}