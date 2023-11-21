import axios from 'axios';
import React, { useEffect, useState } from "react";
import './FormOfertas.css'
import authHeader from '../../auth.header';
import authService from '../../auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from 'react-router-dom';

export default function OfertaCreate() {
    const navigate = useNavigate()

    const [dataTiposOfertas, setdataTiposOfertas] = useState([]);

    const [campTitulo, setcampTitulo] = useState("");
    const [campDepartamento, setcampDepartamento] = useState("");
    const [campLocalizacao, setcampLocalizacao] = useState("");

    const [campExpAnteriorBoolean, setcampExpAnteriorBoolean] = useState(false);

    const [campTempExpAnterior, setcampTempExpAnterior] = useState("");
    const [campHabMin, setcampHabMin] = useState("");
    const [campRenumeracao, setcampRenumeracao] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campImagem, setcampImagem] = useState("");

    const [selectTipo, setSelectTipo] = useState("");

    function SendSave() {
        if (selectTipo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tipo de Oferta!',
            });
        }
        else if (campTitulo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Título!',
            });
        } else if (campDepartamento === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Departamento!',
            });
        } else if (campLocalizacao === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Necessidade!',
            });
        } else if (campTempExpAnterior === false) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tempo de Experiência Anterior!',
            });
        } else if (campHabMin === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira as Habilitações Mínimas!',
            });
        } else if (campRenumeracao === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Renumeração Base Ilíquida!',
            });
        } else if (campDescricao === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a descrição!',
            });
        } else if (campImagem === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a imagem!',
            });
        }

        else {
            const baseUrl = "https://pint-backend.onrender.com/ofertas/create";
            const formData = new FormData();
            formData.append("tipoofertavaga", selectTipo);
            formData.append("titulo", campTitulo);
            formData.append("departamento", campDepartamento);
            formData.append("localizacao", campLocalizacao);
            formData.append("experiencia_anterior", campExpAnteriorBoolean ? "1" : "0");
            formData.append("tempo_minimo_de_experiencia", campExpAnteriorBoolean ? campTempExpAnterior : "sem experiencia");
            formData.append("habilitacoes_minimas", campHabMin);
            formData.append("renumeracao_base_iliquida", campRenumeracao);
            formData.append("descricao", campDescricao);
            formData.append("imagem", campImagem);
            formData.append("user", authService.getCurrentUser().id);

            axios.post(baseUrl, formData, { headers: authHeader() })
                .then((response) => {
                    if (response.data.success === false) {
                        alert(response.data.message);
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Oferta Submetida',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/backoffice/ofertas')
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }


    const LoadTiposOfertas = () => {
        const url = "https://pint-backend.onrender.com/tipos/ofertas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataTiposOfertas(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    useEffect(() => {
        LoadTiposOfertas();
    }, [])

    return (
        <div className='tabela-centro'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label>Titulo</label>
                        <input type="text" className="form-control" placeholder="Titulo" value={campTitulo} onChange={(value) => setcampTitulo(value.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="inputState">Tipo de Oferta</label>
                        <select defaultValue={'default'} id="inputState" className="form-control" onChange={(value) => setSelectTipo(value.target.value)}>
                            <option disabled value="default">Choose...</option>
                            {dataTiposOfertas.map((data) => {
                                return (
                                    <option key={data.id} value={data.id}>{data.tipo}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Departamento</label>
                        <input type="text" className="form-control" placeholder="Departamento" value={campDepartamento} onChange={(value) => setcampDepartamento(value.target.value)} />
                    </div>
                    <div className="col">
                        <label>Localização</label>
                        <input type="text" className="form-control" placeholder="Localização" value={campLocalizacao} onChange={(value) => setcampLocalizacao(value.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">

                        <label className="form-check-label">Experiência Anterior</label>
                        <input className="form-check-input" type="checkbox" checked={campExpAnteriorBoolean} onChange={(value) => setcampExpAnteriorBoolean(value.target.checked)} />
                    </div>
                    {campExpAnteriorBoolean &&
                        <div className="col">
                            <label>Tempo Mínimo de Experiencia</label>
                            <input type="text" className="form-control" placeholder="Tempo Mínimo de Experiencia" value={campTempExpAnterior} onChange={(value) => setcampTempExpAnterior(value.target.value)} />
                        </div>
                    }
                </div>

                <div className="row">
                    <div className="col">

                        <label>Habilitações Mínimas</label>
                        <textarea type="text" className="form-control" placeholder="Habilitações Mínimas" value={campHabMin} onChange={(value) => setcampHabMin(value.target.value)} />
                    </div>
                    <div className="col">
                        <label>Renumeração Base Ilíquida</label>
                        <input type="text" className="form-control" placeholder="Renumeração Base Ilíquida" value={campRenumeracao} onChange={(value) => setcampRenumeracao(value.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Descricão</label>
                        <textarea type="text" className="form-control" placeholder="Descricão" value={campDescricao} onChange={(value) => setcampDescricao(value.target.value)} />
                    </div>
                    <div className="col">
                        <label>Imagem</label>
                        <input type="file" className="form-control" accept='image/*' placeholder="Foto" onChange={event => setcampImagem(event.target.files[0])} />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => SendSave()}>Submeter</button>
        </div>
    );
}