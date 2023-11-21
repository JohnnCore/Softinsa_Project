import axios from 'axios';
import authHeader from '../../../auth.header'
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, useParams } from 'react-router-dom';

export default function ContactoCreate() {
    const navigate = useNavigate()

    const { oportunidadeId } = useParams();
    const [campPNome, setcampPNome] = useState("");
    const [campUNome, setcampUNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campCargo, setcampCargo] = useState("");
    const [campTelemovel, setcampTelemovel] = useState("");

    function SendSave() {
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
        } else if (campCargo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Cargo!',
            });
        } else if (campEmail === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Email!',
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
            const baseUrl = "https://pint-backend.onrender.com/contactos/create/oportunidade/" + oportunidadeId;
            const datapost = {
                primeiro_nome: campPNome,
                ultimo_nome: campUNome,
                telemovel: campTelemovel,
                email: campEmail,
                cargo: campCargo,
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
                            title: 'Contacto Submetido',
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
                        <input style={{width:'49.5%'}} type="text" className="form-control" placeholder="Cargo" value={campCargo} onChange={(value) => setcampCargo(value.target.value)} />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => SendSave()}>Submeter</button>
        </div>
    );
}