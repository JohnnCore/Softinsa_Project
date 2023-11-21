import axios from 'axios';
import authHeader from '../../auth.header'
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, useParams } from 'react-router-dom';

export default function UserCreate() {
    const navigate = useNavigate()


    const [campPNome, setcampPNome] = useState("");
    const [campUNome, setcampUNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campCargo, setcampCargo] = useState("");
    const [selectTipo, setSelectTipo] = useState("");
    const [dataTipos, setdataTipo] = useState([]);
        
    function SendSave() {
        if (campPNome ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
            });  
        }else if (campUNome ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Último Nome!',
            });
        }else if (campCargo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Cargo!',
            });     
        }else if (campEmail === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Email!',
            });          
        }else if (selectTipo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tipo de Perfil!',
            });
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/users/create/";
            const datapost = {
                tiposdeperfilId: selectTipo,
                primeiro_nome: campPNome,
                ultimo_nome: campUNome,
                email: campEmail,
                cargo: campCargo,
            };
            console.log(datapost);
            axios.post(baseUrl, datapost, {headers: authHeader()})
            .then((response) => {
                if (response.data.success === false) {
                    alert(response.data.message);
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Utilizador Criado com Sucesso!',
                        text: response.data.message,
                        showConfirmButton: true
                      });
                    navigate('/backoffice/users')
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            }); 
        }
    }
    const LoadTipos = () =>{
        const url = "https://pint-backend.onrender.com/tipos/perfil/list";
        axios.get(url, {headers: authHeader()} )
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataTipo(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }
    useEffect(() =>{
        LoadTipos();
    }, [])

    return (
        <div style={{marginLeft:'15%'}}>
            <div className="form-row justify-content-center">
            <div className="form-group col-md-6">
                    <label htmlFor="inputtipo">Tipo de Perfil</label>
                    <select id="inputtipo" className="form-control" onChange={value=> setSelectTipo(value.target.value)}>
                        <option disabled selected>Choose...</option> 
                        {dataTipos.map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.tipo}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Primeiro Nome</label>
                    <input type="text" className="form-control" placeholder="Primeiro Nome" value={campPNome} onChange={(value)=> setcampPNome(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Último Nome</label>
                    <input type="text" className="form-control" placeholder="Último Nome" value={campUNome} onChange={(value)=> setcampUNome(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="Email" value={campEmail} onChange={(value)=> setcampEmail(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Cargo</label>
                    <input type="text" className="form-control" placeholder="Cargo" value={campCargo} onChange={(value)=> setcampCargo(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendSave()}>Submeter</button>
        </div>
    );
}