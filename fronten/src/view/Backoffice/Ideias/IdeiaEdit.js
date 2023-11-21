import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import authHeader from '../../auth.header'
import { SyncLoader } from 'react-spinners';

import axios from 'axios';
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = "https://pint-backend.onrender.com/";
export default function EditIdeiaBO(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const {ideiaId} = useParams();

    const [dataIdeia, setDataIdeia] = useState("");


    const LoadOportunidade = () =>{
        const url = baseUrl+"ideias/"+ideiaId+"/get";
        axios.get(url, {headers: authHeader()})
        .then(res=>{
        if (res.data.success) {
            if(res.data.data === null)
            {
                navigate("/404")
            }
            else
            {
                const data = res.data.data; 
                setDataIdeia(data)
                
                setIsLoading(false)
            }
        }
        else {
            alert("Error web service")
        }
        })
        .catch(error=>{
        alert("Error server: "+error)
        })

        
    }

    useEffect(() => {
        LoadOportunidade()
    }, []);

    return (
        <div className='tabela-centro'>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/backoffice/ideias/"}>Ideias</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Ideia</li>
              </ol>
            </nav>
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to={"/backoffice/ideias/"+ ideiaId +"/update"}>Detalhes</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" aria-current="page" to={"/backoffice/ideias/"+ ideiaId + "/reunioes"}>Reuniões</Link>
                </li>
            </ul>
            {isLoading? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>           
            ):
            <div className="container" >
                <div className="row">
                    <div className="col">
                        <label>Título</label>
                        <p className='fw-normal'>{dataIdeia.titulo}</p>
                    </div>
                    <div className="col">
                        <label>Descrição</label>
                        <p className='fw-normal'>{dataIdeia.descricao}</p>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Tipo de Ideia</label>
                        <p className='fw-normal'>{dataIdeia.tipodeideia.tipo}</p>
                    </div>
                </div>
            </div>                                          
            }
        </div>
    );
}

