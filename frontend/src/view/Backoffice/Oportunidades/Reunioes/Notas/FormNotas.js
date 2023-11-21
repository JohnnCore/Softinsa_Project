import axios from 'axios';
import authHeader from '../../../../auth.header'
import authService from '../../../../auth.service';
import React, { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, useParams } from 'react-router-dom';

export default function NotasReuniaoOpCreate() {
    const navigate = useNavigate()

    const { oportunidadeId, reuniaoId } = useParams();

    const [campTitulo, setcampTitulo] = useState("");

    const [campDetalhes, setcampDetalhes] = useState("");


    function SendSave() {
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
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/notas/reunioes/" + reuniaoId + "/oportunidades/" + oportunidadeId + "/create";
            const datapost = {
                titulo: campTitulo,
                detalhes: campDetalhes,
                user: authService.getCurrentUser().id
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
                            title: 'Nota Submetida',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/backoffice/oportunidades/" + oportunidadeId + "/reunioes/" + reuniaoId + "/notas")
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
                        <label>Título</label>
                        <input type="text" className="form-control" placeholder="Título" value={campTitulo} onChange={(value) => setcampTitulo(value.target.value)} />
                    </div>
                    <div className="col">
                        <label>Detalhes</label>
                        <textarea type="text" className="form-control" placeholder="Detalhes" value={campDetalhes} onChange={(value) => setcampDetalhes(value.target.value)} />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => SendSave()}>Submeter</button>
        </div>
    );
}