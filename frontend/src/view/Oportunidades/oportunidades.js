import './oportunidades.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Popup from './Popup';
import { SyncLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import authService from '../auth.service';
import authHeader from '../auth.header';


export default function OportunidadesList() {
    const navigate = useNavigate()
    const [dataOportunidades, setdataOportunidades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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


    function handlecriar() {
        navigate("create")
    }



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

    useEffect(() => {
        LoadOportunidades();
    }, []);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState({});

    function handleCardClick(data) {
        setSelectedOpportunity(data);
        setShowPopup(true);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [numberOfPages, setNumberOfPages] = useState(0);

    function handlesetItemsPerPage(e) {
        setItemsPerPage(e);
        setCurrentPage(1);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    function previouspage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextpage() {
        if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const [searchTerm, setSearchTerm] = useState('');
    function HandlecSearch(value) {
        setSearchTerm(value)
        setCurrentPage(1)
    }
    const [estado, setEstado] = useState('Todos');
    const [ordem, setOrdem] = useState('');

    function LoadFillData() {
        const sortedData = dataOportunidades.sort(
            ordem === "Antigos" ? (a, b) => new Date(a.data_criacao) - new Date(b.data_criacao) :
                ordem === "Nome da Empresa" ? (a, b) => a.empresa.localeCompare(b.empresa) :
                    ordem === "Empresa" ? (a, b) => a.empresa.localeCompare(b.empresa) :
                        ordem === "Estado" ? (a, b) => a.estadosoportunidade.id - b.estadosoportunidade.id :
                            ordem === "Tipo de Projeto" ? (a, b) => a.tiposdeprojeto.tipo.localeCompare(b.tiposdeprojeto.tipo) :
                                ordem === "Área de Negócio" ? (a, b) => a.areasdenegocio.area.localeCompare(b.areasdenegocio.area) :
                                    (a, b) => new Date(b.data_criacao) - new Date(a.data_criacao)
        );

        const filteredData = sortedData.filter((data) =>
            data.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const filteredItems = filteredData.filter(data => data.user.id === authService.getCurrentUser().id && (data.estadosoportunidadeId === 1 || data.estadosoportunidadeId === 2 || data.estadosoportunidadeId === 3)); //

        const filteredestadoData = estado === "Todos" ? filteredItems : filteredItems.filter((data) =>
            data.estadosoportunidade.estado.toLowerCase() === estado.toLowerCase()
        );
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredestadoData.slice(indexOfFirstItem, indexOfLastItem);

        setNumberOfPages(Math.ceil(filteredestadoData.length / itemsPerPage));


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

        return currentItems.map((data) => {
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
        });
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
        <div className='oportunidades'>
            {showPopup && (
                <Popup selectedOpportunity={selectedOpportunity} onClose={() => setShowPopup(false)} />
            )}
            <div className="">
                <div >
                    <h1 className='table_titulo'>Oportunidades</h1>
                    <hr />
                    <div className="row filters mb-4" style={consultarcard ? { display: 'none' } : {}}>
                        <div className='col-lg-2 ms-3'>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Pesquisa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Título da Oportunidade"
                                    aria-label="Username"
                                    value={searchTerm}
                                    onChange={(event) => HandlecSearch(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-1 estados me-4">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Estado</label>
                                <select className="form-control" id="exampleFormControlSelect1" onChange={(event) => setEstado(event.target.value)}>
                                    <option >Todos</option>
                                    <option >Não Avaliada</option>
                                    <option >Avaliada</option>
                                    <option >Em Processamento</option>
                                    <option >Cancelada</option>
                                    <option >Realizada</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-1 order">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Ordenar</label>
                                <select className="form-control " id="exampleFormControlSelect1" onChange={(event) => setOrdem(event.target.value)}>
                                    <option>Recentes</option>
                                    <option>Antigos</option>
                                    <option>Nome da Empresa</option>
                                    <option>Estado</option>
                                    <option>Tipo de Projeto</option>
                                    <option>Área de Negócio</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button onClick={handlecriar} style={{ marginLeft: '60px', marginBottom: '-15px' }} type="button" class="btn btn-primary">Criar Oportunidade</button>

                        </div>

                    </div>
                </div>
                {isLoading && (
                    <div className='loading'>
                        <SyncLoader color="#0D6EFD" />
                    </div>
                )}
                <div className="row cartoes" style={consultarcard ? { display: 'none' } : {}}>
                    <LoadFillData />
                </div>
                <div style={consultarcard ? {} : { display: 'none' }}>
                    <div className='form-op'>
                        <div>
                            <p onClick={() => setconsultarcard(0)} className="text-primary" style={{ position: 'absolute', left: '25%', cursor: 'pointer' }}>&lt;voltar</p>
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
                <div className='form-group btn_page_out'>
                    <div className='nbr_cards_div'>
                        <label className='label_mostrare'>A Mostrar</label>
                        <select class="form-select form-select nbr_cards" aria-label=".form-select-lg example" onChange={(event) => handlesetItemsPerPage(event.target.value)}>
                            <option selected>12</option>
                            <option>24</option>
                            <option>36</option>
                            <option>48</option>
                        </select>
                        <label className='label_mostrard'>Oportunidades</label>
                    </div>
                    <div className='btn_page_in'>
                        <ul className="pagination">
                            <li className="page-item"
                                onClick={previouspage}>
                                <a className="page-link btn_page">Previous</a></li>
                            {[...Array(numberOfPages)].map((_, index) => (
                                <li className='page-item'
                                    onClick={() => handlePageChange(index + 1)}>
                                    <a className={`page-link btn_page ${currentPage === (index + 1) ? "checked" : ""}`}>
                                        {index + 1}
                                    </a>
                                </li>
                            ))}
                            <li className="page-item"
                                onClick={nextpage}>
                                <a className="page-link btn_page">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}