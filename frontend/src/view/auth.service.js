import axios from "axios";
import jwtDecode from 'jwt-decode';
import { Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
class AuthService {
  login(email, password, Remember) {
    return axios
      .post("https://pint-backend.onrender.com/users/login", { email, password })
      .then((res) => {
        if (res.data.token) {
          if (Remember) { localStorage.setItem("user", JSON.stringify(res.data.token)); }
          sessionStorage.setItem("user", JSON.stringify(res.data.token));
          return res.data;
        } else {
          throw new Error("Invalid user");
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  getoldlogin() {
    if (!sessionStorage.getItem('user')) {
      sessionStorage.setItem("user", localStorage.getItem('user'))
    }
  }

  logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

  }

  getCurrentUser() {
    const token = JSON.parse(sessionStorage.getItem("user"));
    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  }

  getPermission() {
    const user = this.getCurrentUser()

    return (user?.tipo);
  }


  verifyToken = (token) => {
    // Verificar se o token existe
    if (!token) {
      return false;
    }

    try {

      const expirationDate = new Date(token.exp * 1000); // Converter a data de expiração para um objeto Date
      const currentDate = new Date(); // Obter a data atual

      if (currentDate > expirationDate) {
        this.logout()
        return false; // Token expirado
      }

      // Verificar outras condições do token, se necessário

      return true; // Token válido

    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      this.logout()
      return false; // Ocorreu um erro ao verificar o token
    }
  };


  ProtectedRoute = ({ permissions, path, children, ...rest }) => {
    const token = this.getCurrentUser()
    const isTokenValid = this.verifyToken(token);

    if (!token)
      return <Navigate to="/login" />;

    if (!isTokenValid)
      return <Navigate to="/login" />;

    const userPermission = this.getPermission();

    if (permissions.includes(userPermission)) {
      return (
        children
      )
    }
    else {
      return <Navigate to="/403" />;
    }
  };
}

export default new AuthService();
