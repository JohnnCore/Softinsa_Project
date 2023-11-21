import axios from 'axios';
import React, { useEffect, useState } from "react";
import authHeader from '../../../../auth.header'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import 'sweetalert2/src/sweetalert2.scss'

export default function InteracoesContactoUpdate() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const { oportunidadeId, contactoId, interacaoId } = useParams();

    const [dataTiposInteracao, setdataTiposInteracao] = useState([])

    const [campMotivo, setcampMotivo] = useState("");

    const [defaultTipo, setDefaultTipo] = useState("");
    const [selectTipo, setSelectTipo] = useState("");
    const [stringTipo, setstringTipo] = useState("");

    const LoadTiposInteracao = () => {
        const url = "https://pint-backend.onrender.com/tipos/interacao/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataTiposInteracao(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    const LoadInteracao = () => {
        const url = "https://pint-backend.onrender.com/interacoes/get/" + interacaoId + "/contacto/" + contactoId + "/oportunidade/" + oportunidadeId
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    if (res.data.data === null) {
                        navigate("/404")
                    }
                    else {
                        const data = res.data.data;
                        setcampMotivo(data.motivo)

                        setDefaultTipo(data.tiposinteracao.tipo)
                        setSelectTipo(data.tiposinteracaoId);
                        setstringTipo(data.tiposinteracao.tipo)

                        setIsLoading(false)
                    }
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
        LoadTiposInteracao()
    }

    useEffect(() => {
        LoadInteracao()
    }, []);

    function SendUpdate() {
        if (campMotivo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
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
            const baseUrl = "https://pint-backend.onrender.com/interacoes/update/" + interacaoId + "/contacto/" + contactoId + "/oportunidade/" + oportunidadeId
            const datapost = {
                motivo: campMotivo,
                tipo: selectTipo
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
                            title: 'Interacação Atualizada',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/backoffice/oportunidades/' + oportunidadeId + '/contactos/' + contactoId + '/interacoes')
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }

    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"}>Oportunidades</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/update"}>Oportunidade</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos"}>Contactos</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/update"}>Contacto</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/interacoes"}>Interações</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Interação</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/interacoes/" + interacaoId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/interacoes/" + interacaoId + "/notas"}>Notas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/interacoes/" + interacaoId + "/ficheiros"}>Ficheiros</Link>
                </li>
            </ul>

            {isLoading ? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>
            ) :
                <div className='tabela-centro'>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label>Motivo</label>
                                <input type="text" className="form-control" placeholder="Motivo" value={campMotivo} onChange={(value) => setcampMotivo(value.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="inputState">Tipos de Interação</label>
                                <select defaultValue={'default'} id="inputState" className="form-control" onChange={(value) => setSelectTipo(value.target.value)}>
                                    {/* <option disabled value="default">Choose...</option> */}
                                    {dataTiposInteracao
                                        .map((data) => {
                                            return (
                                                <option key={data.id} value={data.id}>{data.tipo}</option>
                                            )
                                        })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => SendUpdate()}>Submeter</button>
                </div>
            }
        </div>
    );
}