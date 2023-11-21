import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {FacebookProvider, LoginButton} from 'react-facebook';
import { AiFillFacebook } from 'react-icons/ai';
import './facebook.css'

const FBLoginButton = () => {
    const navigate = useNavigate();

    const responseFB = async (response) => {
      let dectoken = jwtDecode(response.credential);
      console.log(dectoken);
        return axios
        .post("https://pint-backend.onrender.com/users/loginfb", { token: response.credential })
        .then((res) => {
            if (res.data.token) {
                sessionStorage.setItem("user", JSON.stringify(res.data.token));
                navigate('/home');
            } else {
                throw new Error("Invalid user");
            }
            })
            .catch((error) => {
            throw new Error("Authentication failed");
            });
      };
      

  return (
    <FacebookProvider appId="1208426066530971">
      <LoginButton
        scope="email,public_profile"
        onCompleted={responseFB}
        onError={console.log("erro")}
        className="fb_btn"
      >
        <AiFillFacebook size={30} color='white' className='fb_btn'/> Login with Facebook
      </LoginButton>
    </FacebookProvider>
  );
};

export default FBLoginButton;