import axios from "axios";
import authHeader from "../../auth.header";
import React, { useEffect, useState } from "react";
import Swal, { swal } from "sweetalert2/dist/sweetalert2.js";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../auth.service";

export default function EditUser() {
    const navigate = useNavigate();

    const [selectTipo, setSelectTipo] = useState("");
    const [campprimNome, setcampprimNome] = useState("");
    const [campultNome, setcampultNome] = useState("");
    const [camptelemovel, setcamptelemovel] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campimagem, setcampimagem] = useState("");
    const [campCargo, setcampCargo] = useState("");
    const [selectestado, setSelectestado] = useState("");
    const [dataTipos, setdataTipo] = useState([]);

    const { id } = useParams();

    function SendSave() {
        if (selectTipo === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tipo de Perfil!',
            });
        }
        else if (campprimNome === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
            });
        }
        else if (campultNome === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Último Nome!',
            });
        }
        else if (camptelemovel === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Telemóvel!',
            });
        }
        else if (campEmail === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Email!',
            });
        }
        else if (campimagem === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Imagem!',
            });
        }
        else if (campCargo === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Cargo!',
            });
        }
        else if (selectestado === "") {
            swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Estado!',
            });
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/users/" + id + "/update";
            const datapost = {
                tiposdeperfilId: selectTipo,
                primeiro_nome: campprimNome,
                ultimo_nome: campultNome,
                telemovel: camptelemovel,
                email: campEmail,
                imagem: campimagem,
                cargo: campCargo,
                estado: selectestado,
            };
            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then((response) => {
                    if (response.data.success === true) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Utilizador editado com sucesso!",
                            showConfirmButton: true,
                            timer: 1500,
                        });
                        navigate("/backoffice/users");
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Erro ao editar o utilizador!",
                            showConfirmButton: true,
                            timer: 1500,
                        });
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }


    const LoadDados = () => {
        const url = "https://pint-backend.onrender.com/users/" + id + "/get";
        axios.get(url, { headers: authHeader() })
            .then((res) => {
                if (res.data.success) {
                    setSelectTipo(res.data.data.tiposdeperfilId);
                    setcampprimNome(res.data.data.primeiro_nome);
                    setcampultNome(res.data.data.ultimo_nome);
                    setcamptelemovel(res.data.data.telemovel);
                    setcampEmail(res.data.data.email);
                    setcampimagem(res.data.data.imagem);
                    setcampCargo(res.data.data.cargo);
                    setSelectestado(res.data.data.estado);
                } else {
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

                    Toast.fire({
                        icon: 'error',
                        title: res.data.message,
                        showCloseButton: true
                    })
                }
            })
            .catch((err) => {
                alert("Error 34 " + err);
            });
    }

    const LoadTipos = () => {
        const url = "https://pint-backend.onrender.com/tipos/perfil/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataTipo(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    useEffect(() => {
        LoadDados();
        LoadTipos();
    }
        , [])
    return (
        <div className="tabela-centro">
            <div className="row">
                <div className="col-md-12">
                    <h1>Editar Utilizador</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Primeiro Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={campprimNome}
                        onChange={(value) => setcampprimNome(value.target.value)}
                    />
                </div>
                <div className="col">
                    <label>Último Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={campultNome}
                        onChange={(value) => setcampultNome(value.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Telemóvel</label>
                    <input
                        type="text"
                        className="form-control"
                        value={camptelemovel}
                        onChange={(value) => setcamptelemovel(value.target.value)}
                    />
                </div>
                <div className="col">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={campEmail}
                        onChange={(value) => setcampEmail(value.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Imagem</label>
                    <input
                        type="text"
                        className="form-control"
                        value={campimagem}
                        onChange={(value) => setcampimagem(value.target.value)}
                    />
                </div>
                <div className="col">
                    <label>Cargo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={campCargo}
                        onChange={(value) => setcampCargo(value.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Estado</label>
                    <select
                        className="form-control"
                        value={selectestado}
                        onChange={(value) => setSelectestado(value.target.value)}
                    >
                        <option disabled value="">Selecione o Estado</option>
                        <option value="1">Ativo</option>
                        <option value="0">Inativo</option>
                    </select>
                </div>
                <div className="col">
                    <label>Tipo de Perfil</label>
                    <select
                        className="form-control"
                        value={selectTipo}
                        onChange={(value) => setSelectTipo(value.target.value)}
                    >
                        <option disabled value="">Selecione o Tipo de Perfil</option>
                        {dataTipos.map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.tipo}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => SendSave()}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );

}
