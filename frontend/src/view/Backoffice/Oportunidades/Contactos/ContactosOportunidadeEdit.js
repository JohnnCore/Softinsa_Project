import axios from 'axios';
import authHeader from '../../../auth.header'
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss'

export default function ContactosOportunidadeUpdate() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const { oportunidadeId, contactoId } = useParams();
    const [campPNome, setcampPNome] = useState("");
    const [campUNome, setcampUNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campCargo, setcampCargo] = useState("");
    const [campTelemovel, setcampTelemovel] = useState("");

    const LoadContacto = () => {
        const url = "https://pint-backend.onrender.com/contactos/get/" + contactoId + "/oportunidade/" + oportunidadeId
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    if (res.data.data === null) {
                        navigate("/404")
                    }
                    else {
                        const data = res.data.data;
                        setcampPNome(data.primeiro_nome)
                        setcampUNome(data.ultimo_nome)
                        setcampEmail(data.email);
                        setcampCargo(data.cargo_na_empresa)
                        setcampTelemovel(data.telemovel)

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

    }

    useEffect(() => {
        LoadContacto()
    }, []);

    function SendUpdate() {
        if (campPNome === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
            });
        } else if (campUNome === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Último Nome!',
            });
        } else if (campEmail === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Email!',
            });
        } else if (campCargo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Cargo!',
            });
        } else if (campTelemovel === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Telemóvel!',
            });
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/contactos/update/" + contactoId + "/oportunidade/" + oportunidadeId;
            const datapost = {
                primeiro_nome: campPNome,
                ultimo_nome: campUNome,
                telemovel: campTelemovel,
                email: campEmail,
                cargo: campCargo,
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
                            title: 'Contacto Atualizado',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/backoffice/oportunidades/' + oportunidadeId + '/contactos')
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
                    <li className="breadcrumb-item active" aria-current="page">Contacto</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + contactoId + "/interacoes"}>Interações</Link>
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
                                <label>Primeiro Nome</label>
                                <input type="text" className="form-control" placeholder="Primeiro Nome" value={campPNome} onChange={(value) => setcampPNome(value.target.value)} />
                            </div>
                            <div className="col">
                                <label>Último Nome</label>
                                <input type="text" className="form-control" placeholder="Último Nome" value={campUNome} onChange={(value) => setcampUNome(value.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Email</label>
                                <input type="text" className="form-control" placeholder="Email" value={campEmail} onChange={(value) => setcampEmail(value.target.value)} />
                            </div>
                            <div className="col">
                                <label>Telemóvel</label>
                                <input type="text" className="form-control" placeholder="Telemóvel" value={campTelemovel} onChange={(value) => setcampTelemovel(value.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Cargo</label>
                                <input style={{ width: '49.5%' }} type="text" className="form-control" placeholder="Cargo" value={campCargo} onChange={(value) => setcampCargo(value.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => SendUpdate()}>Submeter</button>
                </div>
            }
        </div>
    );
}