import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, useParams } from 'react-router-dom';
import authHeader from '../../../../../auth.header'
import authService from '../../../../../auth.service'

export default function FicheirosEntrevistaCreate() {
    const navigate = useNavigate()

    const {ofertaId, candidaturaId, entrevistaId} = useParams();

    const [campFicheiro, setcampFicheiro] = useState("");

    function SendSave() {
        if (campFicheiro === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Ficheiro!',
            });
        }
        
        else {
            const baseUrl = "https://pint-backend.onrender.com/ficheiros/entrevistas/"+entrevistaId+"/candidaturas/"+candidaturaId+"/ofertas/"+ofertaId+"/create";
            const formData = new FormData();
            formData.append("ficheiro", campFicheiro, campFicheiro.name); // Passando o nome do arquivo como terceiro argumento
            formData.append("user", authService.getCurrentUser().id); 

            const datapost = {
                ficheiro : campFicheiro,
                user : authService.getCurrentUser().id,
            };
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
                        title: 'Ficheiro Submetido',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/backoffice/ofertas/"+ofertaId+"/candidaturas/"+candidaturaId+"/entrevistas/"+entrevistaId+"/ficheiros")
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
                    <label>Ficheiros</label>
                    <input type="file" className="form-control" accept="application/pdf" placeholder="Arquivo" onChange={event => setcampFicheiro(event.target.files[0])} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendSave()}>Submeter</button>
        </div>
    );
}