import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams} from 'react-router-dom';

export default function Confirmar() {
    const [campPassword, setcampPassword] = useState("");
    const [campPassword2, setcampPassword2] = useState("");

    const token = useParams();
    const navigate = useNavigate();
    function handleconfirmar() {
        if (campPassword ==="") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Password!',
            });     
        }else if (campPassword2 === false) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Confirme a Password!',
            });     
        }
        else if (campPassword !== campPassword2) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'As passwords não coincidem!',
            });
        } else{
            console.log('asd')
            const url = "https://pint-backend.onrender.com/users/alterar-senha/";
            const datapost = {
                token: token.token,
                password: campPassword 
            };
            axios.post(url, datapost)
            .then((response) => {
                if (response.data.success === false) {
                    alert(response.data.message);
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Senha Alterada',
                        text: 'Sua Senha foi Alterada com Sucesso!',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    navigate('/login')
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            });
        }
    }  

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card-group">
                        <div className="card p-4">
                            <div className="card-body">
                                <h1>Alterar Senha</h1>
                                <p className="text-muted">Altere a sua senha em baixo</p>
                                <div className="row">
                                    <div className="col-6">
                                    <div className="form-outline mb-4" style={{ position: 'relative' }}>
                                       <label className="form-label" htmlFor="form2Example1">Password</label>
                                       <input required placeholder='************' type={'password'} className={`input-no-background form-control`} name="username" value={campPassword} onChange={(value) => setcampPassword(value.target.value)} />
                                     </div>
                                    
                                     <div className="form-outline mb-4" style={{ position: 'relative' }}>
                                       <label className="form-label" htmlFor="form2Example1">Confirmar Password</label>
                                       <input required placeholder='************' type={'password'} className={`input-no-background form-control`} name="username" value={campPassword2} onChange={(value) => setcampPassword2(value.target.value)} />
                                     </div>
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