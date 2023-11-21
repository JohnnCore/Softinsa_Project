import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    let dectoken = jwtDecode(response.credential);
    console.log(dectoken);
    return axios
      .post("https://pint-backend.onrender.com/users/logingoogle", { token: response.credential })
      .then((res) => {
        if (res.data.token) {
          sessionStorage.setItem("user", JSON.stringify(res.data.token));
          navigate('/home');

        } else {
          throw new Error("Invalid user");
        }
      })
      .catch((error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Informamos que sua conta foi desativada por um administrador. Pedimos desculpas pelo inconveniente.',
          showCloseButton: true
        })
        throw new Error("Authentication failed");
      });
  };


  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => console.log("login failed")}
    />
  );
};

export default GoogleLoginButton;
