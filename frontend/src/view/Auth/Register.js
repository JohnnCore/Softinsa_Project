import axios from 'axios';
import React, { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from '../../components/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from '../../components/facebook';
import {VscEye} from "react-icons/vsc"
import {VscEyeClosed} from "react-icons/vsc"
import './Register.css'

export default function Register() {
    const navigate = useNavigate()

    function isValidEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      
    

    const [campPNome, setcampPNome] = useState("");
    const [campUNome, setcampUNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campTelemovel, setcampTelemovel] = useState("");
    const [campPassword, setcampPassword] = useState("");
    const [campPassword2, setcampPassword2] = useState("");
    const [showPass, setshowPass] = useState(false);
    const [showPass2, setshowPass2] = useState(false);


    function handleshowPass(){
        setshowPass(!showPass);
      }
    
      function handleshowPass2(){
        setshowPass2(!showPass2);
      }

    function SendSave() {
        if (campPNome === "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
            });
        }
        else if (campUNome ==="") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Último Nome!',
            });   
        }else if (campEmail ==="") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Email!',
            });
        } else if (!isValidEmail(campEmail)) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Oops...',
              text: 'Insira um Email valido!',
            });
            return;   
        }else if (campPassword ==="") {
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
        }
        else {
            console.log("Campos:")
            const baseUrl = "https://pint-backend.onrender.com/users/register";
                const datapost = {
                pname: campPNome,
                uname: campUNome,
                telemovel: campTelemovel,
                email: campEmail,
                password: campPassword, 
            };
            axios.post(baseUrl, datapost)
            .then((response) => {
                if (response.data.success === false) {
                    alert(response.data.message);
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registado com sucesso',
                        text: 'Por favor confirme o seu email!',
                        showConfirmButton: true,
                        confirmButtonColor: '#0D6EFD',
                    });
                    navigate('/login')
                }
            })
            .catch((error) => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro ao registar',
                text: error.response.data.message,
                showConfirmButton: true,
                confirmButtonColor: '#0D6EFD',
            });
            }); 
        }
    }

    return (
        <div className='Regist'>
    <form className='form form_regist'>
      <div>
        <img src="https://www.neptune-software.com/wp-content/uploads/2017/11/logotipo_softinsa_2016.png" alt="Softinsa" className='Regist_logo' />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Primeiro Nome</label>
        <input required placeholder='Primeiro Nome' type="text" className={`input-no-background form-control `} name="username" value={campPNome} onChange={(value) => setcampPNome(value.target.value)} />
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Ultimo Nome</label>
        <input required placeholder='Ultimo Nome' type="text" className={`input-no-background form-control `} name="username" value={campUNome} onChange={(value) => setcampUNome(value.target.value)} />
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Email Address</label>
        <input required placeholder='exemplo@mail.com' type="email" className={`input-no-background form-control `} name="username" value={campEmail} onChange={(value) => setcampEmail(value.target.value)} />
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Telemovel</label>
        <input required placeholder='Número de Telemovel' type="tel" className={`input-no-background form-control `} name="username" value={campTelemovel} onChange={(value) => setcampTelemovel(value.target.value)} />
      </div>
  
      <div className="form-outline mb-4" style={{ position: 'relative' }}>
        <label className="form-label" htmlFor="form2Example1">Password</label>
        <input required placeholder='************' type={showPass ? 'text' : 'password'} className={`input-no-background form-control`} name="username" value={campPassword} onChange={(value) => setcampPassword(value.target.value)} />
        <div onMouseDown={handleshowPass} onMouseUp={handleshowPass} className='btn btn_show' style={{ position: 'absolute', top: '30%', right: 0 }}>{showPass ? <VscEyeClosed /> : <VscEye />}</div>
      </div>

      <div className="form-outline mb-4" style={{ position: 'relative' }}>
        <label className="form-label" htmlFor="form2Example1">Password</label>
        <input required placeholder='************' type={showPass2 ? 'text' : 'password'} className={`input-no-background form-control`} name="username" value={campPassword2} onChange={(value) => setcampPassword2(value.target.value)} />
        <div onMouseDown={handleshowPass2} onMouseUp={handleshowPass2} className='btn btn_show' style={{ position: 'absolute', top: '30%', right: 0 }}>{showPass2 ? <VscEyeClosed /> : <VscEye />}</div>
      </div>
  
      <div onClick={SendSave} className="btn btn_login btn-primary btn-block mb-4">Registar</div>
      <div className='text-center'>Já tens conta? <Link to='/login'>Sign-in</Link></div>
      < hr className="my-4" data-content='OU' />

      <div className='socialbtns'>
      <GoogleOAuthProvider clientId="327068343135-vq8qa76rgsu57spmmj2snqtm4eaahh22.apps.googleusercontent.com">
      <GoogleLogin />
      </GoogleOAuthProvider>
      </div>
    </form>
  </div>
    );
}