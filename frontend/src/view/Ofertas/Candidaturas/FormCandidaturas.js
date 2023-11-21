import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, useParams } from 'react-router-dom';
import authHeader from '../../auth.header'
import authService from '../../auth.service'

export default function CandidaturaOfertaCreate() {
    const navigate = useNavigate()

    const {ofertaId} = useParams();

    const [campObservacoes, setcampObservacoes] = useState("");
    const [campCurriculo, setcampCurriculo] = useState("");

    function SendSave() {
        if (campCurriculo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Currículo!',
            });
        }
        
        else {
            const baseUrl = "https://pint-backend.onrender.com/candidaturas/ofertas/"+ofertaId+"/create";
            const formData = new FormData();
            formData.append("curriculo", campCurriculo, campCurriculo.name); // Passando o nome do arquivo como terceiro argumento
            formData.append("observacoes", campObservacoes);
            formData.append("user", authService.getCurrentUser().id);
            const datapost = {
                observacoes : campObservacoes,
                curriculo : campCurriculo,
                user : authService.getCurrentUser().id,
            };
            console.log(formData.get("curriculo")); // Exibe o valor do campo "curriculo" no console
            axios.post(baseUrl, formData, {headers: authHeader()})
            .then((response) => {
                if (response.data.success === false) {
                    alert(response.data.message);
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Candidatura Submetida',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/ofertas/")
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            }); 
        }
    }

    return (
        <div style={{marginLeft:'15%'}}>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label>Currículo</label>
                    <input type="file" className="form-control" accept="application/pdf" placeholder="Arquivo" onChange={event => setcampCurriculo(event.target.files[0])} />

                </div>
                <div className="form-group col-md-6">
                    <label>Observações</label>
                    <input type="text" className="form-control" placeholder="Observações" value={campObservacoes} onChange={(value)=> setcampObservacoes(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendSave()}>Submeter</button>
        </div>
    );
}