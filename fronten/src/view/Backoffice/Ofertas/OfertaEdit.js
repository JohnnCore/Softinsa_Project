import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import authHeader from '../../auth.header'
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SyncLoader } from 'react-spinners';


const baseUrl = "https://pint-backend.onrender.com/";

export default function OfertaEditBO() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const [dataTiposOfertas, setdataTiposOfertas] = useState([]);
    const [dataEstadosOfertas, setdataEstadosOfertas] = useState([]);

    const { ofertaId } = useParams();
    const [campTitulo, setcampTitulo] = useState("");
    const [campDepartamento, setcampDepartamento] = useState("");
    const [campLocalizacao, setcampLocalizacao] = useState("");
    const [campExpAnterior, setcampExpAnterior] = useState("");
    const [campExpAnteriorBoolean, setcampExpAnteriorBoolean] = useState(false);

    const [campTempExpAnterior, setcampTempExpAnterior] = useState("");

    const [campHabMin, setcampHabMin] = useState("");
    const [campRenumeracao, setcampRenumeracao] = useState("");
    const [campDescricao, setcampDescricao] = useState("");
    const [campImagem, setcampImagem] = useState("");


    const [defaultTipo, setDefaultTipo] = useState("");
    const [selectTipo, setSelectTipo] = useState("");
    const [stringTipo, setstringTipo] = useState("");

    const [defaultEstado, setDefaultEstado] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [stringEstado, setstringEstado] = useState("");



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

    const LoadEstadosOfertas = () => {
        const url = "https://pint-backend.onrender.com/estado/ofertasvagas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataEstadosOfertas(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }


    const LoadOferta = () => {
        const url = baseUrl + "ofertas/get/" + ofertaId;
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setcampTitulo(data.titulo)
                    setcampDepartamento(data.departamento)
                    setcampLocalizacao(data.localizacao)

                    setSelectTipo(data.tiposofertavagaId);
                    setDefaultTipo(data.tiposofertavaga.tipo)
                    setstringTipo(data.tiposofertavaga.tipo)

                    setSelectEstado(data.estadosofertavagaId);
                    setDefaultEstado(data.estadosofertavaga.estado)
                    setstringEstado(data.estadosofertavaga.estado)

                    setcampExpAnterior(data.experiencia_anterior)



                    if (data.experiencia_anterior === 1) {
                        setcampExpAnteriorBoolean(true)
                    }

                    setcampTempExpAnterior(data.tempo_minimo_de_experiencia)
                    setcampHabMin(data.habilitacoes_minimas)
                    setcampRenumeracao(data.renumeracao_base_iliquida)
                    setcampDescricao(data.descricao)
                    setcampImagem(data.imagem)

                    setIsLoading(false)
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })

        LoadTiposOfertas();
        LoadEstadosOfertas();

    }

    useEffect(() => {
        LoadOferta();
    }, []);


    function SendUpdate() {
        if (selectTipo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tipo de Oferta!',
            });
        }
        else if (selectEstado === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Estado!',
            });
        } else if (campTitulo === "") {
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
        }
        else {
            //url de backend
            const url = baseUrl + "ofertas/update/" + ofertaId
            if (campExpAnteriorBoolean === false) {
                setcampTempExpAnterior("sem experiencia")
            }
            const formData = new FormData();
            formData.append("estadoofertavaga", selectEstado);
            formData.append("tipoofertavaga", selectTipo);
            formData.append("titulo", campTitulo);
            formData.append("departamento", campDepartamento);
            formData.append("localizacao", campLocalizacao);
            formData.append("experiencia_anterior", campExpAnteriorBoolean ? 1 : 0);
            formData.append("tempo_minimo_de_experiencia", campExpAnteriorBoolean ? campTempExpAnterior : "sem experiencia");
            formData.append("habilitacoes_minimas", campHabMin);
            formData.append("renumeracao_base_iliquida", campRenumeracao);
            formData.append("descricao", campDescricao);
            formData.append("imagem", campImagem);

            axios.post(url, formData, { headers: authHeader() })
                .then(response => {
                    console.log(response);
                    if (response.data.success === false) {
                        alert(response.data.message)
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Oferta Atualizada',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/backoffice/ofertas')
                    }
                })
                .catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }
    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/ofertas/"}>Ofertas</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Oferta</li>
                </ol>
            </nav>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/ofertas/" + ofertaId + "/update"}>Detalhes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/ofertas/" + ofertaId + "/candidaturas/"}>Candidaturas</Link>
                </li>
            </ul>
            {isLoading ? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>
            ) :
                <div >
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label>Titulo</label>
                                <input type="text" className="form-control" placeholder="Titulo" value={campTitulo} onChange={(value) => setcampTitulo(value.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="inputState">Tipo de Projeto</label>
                                <select id="inputState" className="form-control" onChange={(value) => setSelectTipo(value.target.value)}>
                                    <option value={selectTipo}>{defaultTipo}</option>
                                    {dataTiposOfertas.filter((data) => data.tipo !== defaultTipo)
                                        .map((data) => {
                                            return (
                                                <option key={data.id} value={data.id}>{data.tipo}</option>
                                            )
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="inputState">Tipo de Projeto</label>
                                <select id="inputState" className="form-control" onChange={(value) => setSelectTipo(value.target.value)}>
                                    <option value={selectTipo}>{defaultTipo}</option>
                                    {dataTiposOfertas.filter((data) => data.tipo !== defaultTipo)
                                        .map((data) => {
                                            return (
                                                <option key={data.id} value={data.id}>{data.tipo}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="inputState">Estado</label>
                                <select id="inputState" className="form-control" onChange={(value) => setSelectEstado(value.target.value)}>
                                    <option value={selectEstado}>{stringEstado}</option>
                                    {dataEstadosOfertas.filter((data) => data.estado !== defaultEstado)
                                        .map((data) => {
                                            return (
                                                <option key={data.id} value={data.id}>{data.estado}</option>
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
                            <div className="col">
                                {campExpAnteriorBoolean &&
                                    <div className="form-group col-md-6">
                                        <label>Tempo Mínimo de Experiencia</label>
                                        <input type="text" className="form-control" placeholder="Tempo Mínimo de Experiencia" value={campTempExpAnterior} onChange={(value) => setcampTempExpAnterior(value.target.value)} />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Habilitações Mínimas</label>
                            <textarea type="text" className="form-control" placeholder="Habilitações Mínimas" value={campHabMin} onChange={(value) => setcampHabMin(value.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Renumeração Base Ilíquida</label>
                            <input type="text" className="form-control" placeholder="Renumeração Base Ilíquida" value={campRenumeracao} onChange={(value) => setcampRenumeracao(value.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Descricão</label>
                            <textarea type="text" className="form-control" placeholder="Descricão" value={campDescricao} onChange={(value) => setcampDescricao(value.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Imagem</label>
                            <input type="file" className="form-control" accept='image/*' placeholder="Imagem" onChange={event => setcampImagem(event.target.files[0])} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => SendUpdate()}>Update</button>
                </div>
            }
        </div>
    );
}

