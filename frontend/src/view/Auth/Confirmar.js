import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams} from 'react-router-dom';

export default function Confirmar() {
    const token = useParams();
    const navigate = useNavigate();
    function handleconfirmar() {
        const url = "https://pint-backend.onrender.com/users/confirmar/";
        axios.post(url, {
            token: token
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Email Confirmado!',
                        'O seu email foi confirmado com sucesso!',
                        'success'
                    )
                    navigate("/login");
                }
            })
            .catch(error => {
                alert("Error 325 ")
            })
    }  

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card-group">
                        <div className="card p-4">
                            <div className="card-body">
                                <h1>Confirmar Email</h1>
                                <p className="text-muted">Confirme o seu email ao clicar no botão</p>
                                <div className="row">
                                    <div className="col-6">
                                        <button type="button" onClick={handleconfirmar} className="btn btn-primary px-4">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }