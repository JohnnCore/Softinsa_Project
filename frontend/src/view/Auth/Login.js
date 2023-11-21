import './Login.css'
import React, { useEffect, useState } from "react";
import CheckButton from "react-validation/build/button";
import AuthService from "../auth.service";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2'
import {VscEye} from "react-icons/vsc"
import {VscEyeClosed} from "react-icons/vsc"
import GoogleLogin from '../../components/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from '../../components/facebook';
import axios from 'axios';
export default function Login() {


    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("");
    const [showPass, setshowPass] = useState(false);
    const [Remember, setRemember] = useState(false);
    const [Loginerrado, setLoginerrado] = useState(false);


    function verificacao(){
      const cuser = AuthService.getCurrentUser();
      if(cuser){
        console.log(cuser);
        navigate('/home');
      }
    }

    useEffect(() => {
      verificacao();
    }, []);
        

    if (message) {
      setmessage(null);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
      })
      
      Toast.fire({
        icon: 'error',
        title: message,
        showCloseButton: true
      })
    }
    
    function ForgotPassword(){
      const baseUrl = "https://pint-backend.onrender.com/users/forgot/";
      Swal.fire({
        title: 'Coloque o e-mail da sua conta',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#0D6EFD',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios.post(baseUrl, { email: login })
            .then(response => {
              Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
              });
            })
            .catch(error => {
              Swal.showValidationMessage(error.response.data.message)
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
        }
      })
    }

    function ChangePassword(token){
      const baseUrl = "https://pint-backend.onrender.com/users/alterar-senha/";
      Swal.fire({
        title: 'É obrigatório que você altere a sua senha antes de usar a sua conta.',
        text: 'Coloque a sua nova senha',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#0D6EFD',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          const datapost = {
            token: token,
            password: login 
        };
          return axios.post(baseUrl, datapost)
            .then(response => {
              Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
              });
            })
            .catch(error => {
              Swal.showValidationMessage(error.response.data.message)
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
        }
      })
    }


    function handleRemember(){
      setRemember(!Remember);
    }

    function handleshowPass(){
      setshowPass(!showPass);
    }

    async function HandleLogin(event) {
        event.preventDefault();
        setmessage("");
        setloading(true);
        AuthService.login(email, password, Remember)
    .then((res) => {
    if (res === "" || res === false) {
    setmessage(message);
    setloading(false);
    }
    else {        
        navigate('/home');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        const currentHour = new Date().getHours();
        let greeting = '';

        if (currentHour >= 5 && currentHour < 12) {
          greeting = 'Bom Dia!';
        } else if (currentHour >= 12 && currentHour < 19) {
          greeting = 'Boa Tarde!';
        } else {
          greeting = 'Boa Noite!';
        }
        
        Toast.fire({
          title: 'Login bem-sucedido!',
          text: greeting,
          icon: 'success',
          showCloseButton: true
        })
    }
    })
    .catch((error) => {
      if (error.response.status === 402) {
        ChangePassword(error.response.data.token);
        
      }else{
        setmessage(error.response.data.message);
      }
    setLoginerrado(true);
    setloading(false);
    });
    }
    return (
    <div className='Login'>
    <form className='form' onSubmit={HandleLogin}>
      <div>
        <img src="https://www.neptune-software.com/wp-content/uploads/2017/11/logotipo_softinsa_2016.png" alt="Softinsa" className='login_logo' />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Email Address</label>
        <input required placeholder='example@mail.com' type="text" className={`input-no-background form-control ${Loginerrado ? 'inerrado' : ''}`} name="username" value={email} onChange={(value) => setemail(value.target.value)} />
      </div>
  
      <div className="form-outline mb-4" style={{ position: 'relative' }}>
        <label className="form-label" htmlFor="form2Example1">Password</label>
        <input required placeholder='************' type={showPass ? 'text' : 'password'} className={`input-no-background form-control ${Loginerrado ? 'inerrado' : ''}`} name="username" value={password} onChange={(value) => setpassword(value.target.value)} />
        <button onMouseDown={handleshowPass} onMouseUp={handleshowPass} className='btn btn_show' style={{ position: 'absolute', top: '30%', right: 0 }}>{showPass ? <VscEyeClosed /> : <VscEye />}</button>
      </div>
  
      <div className="row mb-4">
        <div className="col">
          <div className="form-check">
            <input className="form-check-input " type="checkbox" id="form2Example31" onChange={handleRemember} />
            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
          </div>
        </div>
  
        <div className="col text-end forgot">
          <div onClick={ForgotPassword}>Forgot password?</div>
        </div>
      </div>
  
      <button type="submit" className="btn btn_login btn-primary btn-block mb-4">Sign in</button>
      <div className='text-center'>Ainda não tens conta? <Link to='/register'>Regista-te</Link></div>
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