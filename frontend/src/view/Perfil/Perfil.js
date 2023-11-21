import React, { useEffect } from "react";
import authService from "../auth.service";
import { Link } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert2";
import authHeader from "../auth.header";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Perfil() {
    const user = authService.getCurrentUser();
    if (!user) {
        window.location.href = "/login";
    }
    const navigate = useNavigate();
    const id = user.id;
    const [camppnome, setcamppnome] = useState(user.pnome);
    const [campunome, setcampunome] = useState(user.unome);
    const [campemail, setcampemail] = useState(user.email);
    const [campcontacto, setcampcontacto] = useState(user.telemovel);
    const [campimagem, setcampimagem] = useState(user.photo);

    const [password, setpassword] = useState("");
    const [novapassword, setnovapassword] = useState("");
    const [confirmarpassword, setconfirmarpassword] = useState("");

    const [showpassword, setshowPassword] = useState(0);

    function handlepassclick1() {
        setshowPassword(1);
    }
    function handlepassclick0() {
        setshowPassword(0);
    }


    function sendEdit() {
        if (camppnome === "" || campunome === "" || campemail === "" || campcontacto === "" || campimagem === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos!',
            });
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/users/" + id + "/profile";
            const formData = new FormData();
            formData.append("primeiro_nome", camppnome);
            formData.append("ultimo_nome", campunome);
            formData.append("telemovel", campcontacto);
            formData.append("email", campemail);
            formData.append("imagem", campimagem);

            const datapost = {
                primeiro_nome: camppnome,
                ultimo_nome: campunome,
                telemovel: campcontacto,
                email: campemail,
                imagem: campimagem
            }
            axios.post(baseUrl, formData, { headers: authHeader() })
                .then((response) => {
                    if (response.data.success === true) {
                        swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Perfil editado com sucesso!",
                            text: "Por favor, faça login novamente.",
                            showConfirmButton: true,
                            confirmButtonColor: "#0D6EFD"
                        });
                        authService.logout();
                        navigate("/login");
                    } else {
                        swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Erro ao editar o Perfil!",
                            showConfirmButton: true,
                            confirmButtonColor: "#0D6EFD"
                        });
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }

    function sendEditPassword() {
        if (password === 0 || novapassword === 0 || confirmarpassword === 0) {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos!',
            });
        } else if (novapassword !== confirmarpassword) {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'As passwords não coincidem!',
            });
        } else {
            const baseUrl = "https://pint-backend.onrender.com/users/" + id + "/profile/password";
            const datapost = {
                password: password,
                nova_password: novapassword,
            }
            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then((response) => {
                    if (response.data.success === true) {
                        swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Password editada com sucesso!",
                            text: "Por favor, faça login novamente.",
                            showConfirmButton: true,
                            confirmButtonColor: "#0D6EFD"
                        });
                        authService.logout();
                        navigate("/login");
                    } else {
                        swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.data.message,
                            showConfirmButton: true,
                            confirmButtonColor: "#0D6EFD"
                        });
                    }
                })
                .catch((error) => {
                    swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.response.data.message,
                        showConfirmButton: true,
                        confirmButtonColor: "#0D6EFD"
                    });
                });
        }
    }




    return (
        <div style={{ marginLeft: '100px' }}>
            <ul class="nav nav-pills nav-fill mb-4" style={{ width: '33.3%', marginLeft: '33.3%' }}>
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to={"/perfil"}>Detalhes</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" aria-current="page" to={"/perfil/oportunidades"}>Oportunidades</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" aria-current="page" to={"/perfil/candidaturas"}>Candidaturas</Link>
                </li>
            </ul>
            <div style={{ marginLeft: '20%', marginRight: '20%', border: '1px solid #B1BAC5', minHeight: '300px', borderRadius: '5px' }}>
                <hr className='linha_card' />
                <div style={{ margin: '30px', display: 'flex', position: "relative" }}>
                    <img className="me-2 img_prof" src={user.photo} alt="Image..." style={{ borderRadius: '50%', maxWidth: '150px', height: '150px' }} />
                    <h3 style={{ marginTop: '50px', fontSize: '35px', marginLeft: '20px' }}>{user.pnome + " " + user.unome}</h3>
                    <ul class="nav nav-pills nav-fill mb-4" style={{ width: '33.3%', marginLeft: '33.3%', marginTop: '50px' }}>
                        <li class="nav-item">
                            <div class={`nav-link ${showpassword ? "" : "active"}`} onClick={handlepassclick0} style={{ cursor: 'pointer' }} aria-current="page" to={"/perfil"}>Dados</div>
                        </li>
                        <li class="nav-item">
                            <div class={`nav-link ${showpassword ? "active" : ""}`} onClick={handlepassclick1} style={{ cursor: 'pointer' }} aria-current="page">Password</div>
                        </li>
                    </ul>
                </div>
                <div style={showpassword ? { display: 'none' } : {}}>
                    {/* ----------------------------------------- */}
                    <div style={{ margin: '30px', display: 'flex', position: 'relative' }}>
                        <div>
                            <label>Primeiro Nome</label>
                            <input type="text" className="form-control" style={{ width: '400px' }} value={camppnome} onChange={(value) => setcamppnome(value.target.value)} />
                        </div>
                        <div style={{ position: "absolute", right: 0 }}>
                            <label>Último Nome</label>
                            <input type="text" className="form-control" style={{ width: '400px' }} value={campunome} onChange={(value) => setcampunome(value.target.value)} />
                        </div>
                    </div>
                    {/* ----------------------------------------- */}
                    <div style={{ margin: '30px', display: 'flex', position: 'relative' }}>
                        <div>
                            <label>Email</label>
                            <input type="text" className="form-control" style={{ width: '400px' }} value={campemail} onChange={(value) => setcampemail(value.target.value)} />
                        </div>
                        <div style={{ position: "absolute", right: 0 }}>
                            <label>Telemóvel</label>
                            <input type="text" className="form-control" style={{ width: '400px' }} value={campcontacto} onChange={(value) => setcampcontacto(value.target.value)} />
                        </div>
                    </div>
                    {/* ----------------------------------------- */}
                    <div style={{ margin: '30px', display: 'flex', position: 'relative' }}>
                        <div>
                            <label>Imagem</label>
                            <input type="file" className="form-control" accept='image/*' placeholder="Foto" onChange={event => setcampimagem(event.target.files[0])} />
                        </div>
                        <div style={{ marginTop: '15px', position: "absolute", right: 0 }}>
                            <div className="btn btn-primary" style={{ width: '150px' }} onClick={() => sendEdit()} >Editar</div>
                        </div>
                    </div>
                </div>
                <div style={showpassword ? {} : { display: 'none' }}>
                    {/* ----------------------------------------- */}
                    <div style={{ margin: '30px', display: 'flex', position: 'relative' }}>
                        <div>
                            <label>Password Atual</label>
                            <input type="password" className="form-control" style={{ width: '400px' }} value={password} onChange={(value) => setpassword(value.target.value)} />
                        </div>
                    </div>
                    {/* ----------------------------------------- */}
                    <div style={{ margin: '30px', display: 'flex', position: 'relative' }}>
                        <div>
                            <label>Nova Password</label>
                            <input type="password" className="form-control" style={{ width: '400px' }} value={novapassword} onChange={(value) => setnovapassword(value.target.value)} />
                        </div>
                        <div style={{ position: "absolute", right: 0 }}>
                            <label>Confirmar Password</label>
                            <input type="password" className="form-control" style={{ width: '400px' }} value={confirmarpassword} onChange={(value) => setconfirmarpassword(value.target.value)} />
                        </div>
                    </div>
                    {/* ----------------------------------------- */}
                    <div style={{ margin: '30px', display: 'flex', position: 'relative', height: '62px' }}>
                        <div style={{ marginTop: '15px', right: 0, position: 'absolute' }}>
                            <div className="btn btn-primary" style={{ width: '150px' }} onClick={() => sendEditPassword()} >Editar</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}
