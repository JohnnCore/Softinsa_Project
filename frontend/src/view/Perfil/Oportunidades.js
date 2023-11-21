import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import authHeader from "../auth.header";
import authService from "../auth.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";


export default function OportunidadesPerfil() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [dataOportunidades, setdataOportunidades] = useState([]);
    const [consultarcard, setconsultarcard] = useState(0);

    const [dataTiposProjeto, setdataTiposProjeto] = useState([]);
    const [dataAreasNegocio, setdataAreasNegocio] = useState([]);

    const [selectTipo, setSelectTipo] = useState("");
    const [selectArea, setSelectArea] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campEmpresa, setcampEmpresa] = useState("");
    const [campNecessidades, setcampNecessidades] = useState("");
    const [estadooportunidade, setestadooportunidade] = useState("");
    const [estadooportunidadeId, setestadooportunidadeId] = useState("");

    function LoadOportunidades() {
        setIsLoading(true);
        const url = "https://pint-backend.onrender.com/oportunidades/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataOportunidades(data);
                    setIsLoading(false);
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
                    authService.logout();
                    navigate('/login');
                }
            })
            .catch(error => {
                alert(error)
                setIsLoading(false);
            });
    }

    useEffect(() => {
        LoadOportunidades();
    }, []);

    function handleCardClick(data) {
        setconsultarcard(data.id);
        setSelectTipo(data.tiposdeprojetoId);
        setSelectArea(data.areasdenegocioId);
        setcampTitulo(data.titulo);
        setcampEmpresa(data.empresa);
        setcampNecessidades(data.necessidades);
        setestadooportunidadeId(data.estadosoportunidadeId);
        setestadooportunidade(data.estadosoportunidade.estado);
    }


    function ShowOportunidades() {
        const filteredData = dataOportunidades.filter((data) => {
            return data.user.id === authService.getCurrentUser().id && (data.estadosoportunidadeId === 4 || data.estadosoportunidadeId === 5)
        })
        const sortedData = filteredData.sort((a, b) => {
            return new Date(b.data_criacao) - new Date(a.data_criacao);
        });


        return sortedData.map((data) => {
            return (
                <div key={data.id} className="col-lg-4 no-modal">
                    <div className="card cardb card-margin" onClick={() => handleCardClick(data)}>
                        <hr className='linha_card' />
                        <div className="card-header no-border">
                            <h4 className="card-title mt-0">{data.titulo}</h4>
                            <h6>Criada Por: {data.user.primeiro_nome} {data.user.ultimo_nome} ({data.data_criacao.slice(0, 10)})</h6>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-meeting-points mt-3 ml-5">
                                    <div>
                                        <strong>Nome da Empresa</strong>
                                        <p>{data.empresa}</p>
                                    </div>
                                    <div style={{ paddingRight: '60px' }}>
                                        <strong>Estado</strong>
                                        <div className='bola'
                                            style={{
                                                backgroundColor: data.estadosoportunidadeId === 2 ? "#24bb29" :
                                                    data.estadosoportunidadeId === 3 ? "#f3fa39" :
                                                        data.estadosoportunidadeId === 4 ? "red" :
                                                            data.estadosoportunidadeId === 5 ? "blue" : "#e0e3e7"
                                            }}
                                        >
                                            <div className='estado'>
                                                {data.estadosoportunidade.estado}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="widget-49-meeting-points mt-2">
                                    <div>
                                        <strong>Tipo de Projeto</strong>
                                        <p>{data.tiposdeprojeto.tipo}</p>
                                    </div>
                                    <div>
                                        <strong>Área de Negócio</strong>
                                        <p>{data.areasdenegocio.area}</p>

                                    </div>
                                </div>
                                <div className="widget-49-meeting-action">
                                    <h6 className='data'>Data de Atualização: {data.data_atualizacao.slice(0, 10)}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const LoadTiposProjeto = () => {
        const url = "https://pint-backend.onrender.com/tipos/projetos/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataTiposProjeto(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    const LoadAreasNegocio = () => {
        const url = "https://pint-backend.onrender.com/areas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataAreasNegocio(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    useEffect(() => {
        LoadTiposProjeto();
        LoadAreasNegocio();
    }, []);

    function handlevoltar() {
        setconsultarcard(0);
    }

    function sendEditOportunidade() {
        if (selectTipo === 0 || selectArea === 0 || campTitulo === "" || campEmpresa === "" || campNecessidades === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos!',
            })
        } else {
            const baseUrl = "https://pint-backend.onrender.com/oportunidades/update/" + consultarcard;
            const datapost = {
                tipodeprojeto: selectTipo,
                areadenegocio: selectArea,
                estadooportunidade: 1,
                titulo: campTitulo,
                empresa: campEmpresa,
                necessidade: campNecessidades
            }
            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Oportunidade Editada com Sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        window.location.reload();
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.data.message,
                            showConfirmButton: true,
                            confirmButtonColor: "#0D6EFD"
                        });
                    }
                }).catch(error => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.response.data.message,
                        showConfirmButton: true,
                        confirmButtonColor: "#0D6EFD"
                    });
                })
        }
    }



    return (
        <div style={{ marginLeft: '100px' }}>
            <ul class="nav nav-pills nav-fill mb-4" style={{ width: '33.3%', marginLeft: '33.3%' }}>
                <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to={"/perfil"}>Detalhes</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to={"/perfil/oportunidades"}>Oportunidades</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" aria-current="page" to={"/perfil/Candidaturas"}>Candidaturas</Link>
                </li>
            </ul>

            {isLoading && (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>
            )}
            <div className="row cartoes" style={consultarcard ? { display: 'none' } : {}}>
                <ShowOportunidades />
            </div>
            <div style={consultarcard ? {} : { display: 'none' }}>
                <div className='form-op'>
                    <div>
                        <p onClick={handlevoltar} className="text-primary" style={{ position: 'absolute', left: '25%', cursor: 'pointer' }}>&lt;voltar</p>
                    </div>
                    <div className="form-group col-md-6 mt-3">
                        <label htmlFor="inputtitulo">Título </label>
                        <input type="text" className="form-control" value={campTitulo} onChange={(value) => setcampTitulo(value.target.value)} />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                        <label htmlFor="inputempresa">Empresa </label>
                        <input id="nputempresa" type="text" className="form-control" placeholder="Empresa" value={campEmpresa} onChange={value => setcampEmpresa(value.target.value)} />
                    </div>
                    <div className="form-group col-md-6 mt-3">
                        <label htmlFor="inputnecessidades">Necessidades </label>
                        <textarea id="inputnecessidades" type="text" className="form-control" placeholder="Necessidades" value={campNecessidades} onChange={value => setcampNecessidades(value.target.value)} />
                    </div>
                    <div className='row mt-3'>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputtipo">Tipo de Projeto</label>
                            <select id="inputtipo" className="form-control" value={selectTipo} onChange={value => setSelectTipo(value.target.value)}>
                                <option disabled selected>Choose...</option>
                                {dataTiposProjeto.map((data) => {
                                    return (
                                        <option key={data.id} value={data.id}>{data.tipo}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputarea">Área de Negócio</label>
                            <select id="inputarea" className="form-control" value={selectArea} onChange={value => setSelectArea(value.target.value)}>
                                <option disabled selected >Choose...</option>
                                {dataAreasNegocio.map((data) => {
                                    return (
                                        <option key={data.id} value={data.id}>{data.area}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div style={{ paddingRight: '60px', display: 'flex', marginTop: '10px' }}>
                        <p>Estado</p>
                        <div className='bola'
                            style={{
                                backgroundColor: estadooportunidadeId === 2 ? "#24bb29" :
                                    estadooportunidadeId === 3 ? "#f3fa39" :
                                        estadooportunidadeId === 4 ? "red" :
                                            estadooportunidadeId === 5 ? "blue" : "#e0e3e7", marginTop: '6px', marginLeft: '5px'
                            }}
                        >
                            <div className='estado'>
                                {estadooportunidade}
                            </div>
                        </div>

                    </div>
                    <div className="btn btn-primary" onClick={sendEditOportunidade}>Submeter</div>
                </div>
            </div>
        </div>
    )

}