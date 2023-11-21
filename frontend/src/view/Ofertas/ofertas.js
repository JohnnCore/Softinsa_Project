import './ofertas.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Popup from './Popup';
import authHeader from '../auth.header';
import Swal from 'sweetalert2';
import authService from '../auth.service';
import { SyncLoader } from 'react-spinners';


export default function OfertavagaList() {
    const navigate = useNavigate()
    const [dataOfertavaga, setdataOfertavaga] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function LoadOfertavaga() {
        setIsLoading(true);
        const url = "https://pint-backend.onrender.com/ofertas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataOfertavaga(data);
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
            });
    }

    useEffect(() => {
        LoadOfertavaga();
    }, []);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedOfertavaga, setSelectedOfertavaga] = useState({});

    function handleCardClick(data) {
        setSelectedOfertavaga(data);
        setShowPopup(true);
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocTerm, setSearchLocTerm] = useState('');
    const [exp, setExp] = useState('2');

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



    function LoadFillData() {
        const Datatosee = dataOfertavaga.filter((data) =>
            data.estadosofertavaga.id === 1
        );
        const sortedData = Datatosee.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

        let filteredtipodata;

        if (authService.getPermission() === 4 || authService.getPermission() === 5) {
            filteredtipodata = sortedData.filter((data) =>
                data.tiposofertavaga.id === 2 || data.tiposofertavaga.id === 3
            );
        } else {
            filteredtipodata = sortedData.filter((data) =>
                data.tiposofertavaga.id === 1 || data.tiposofertavaga.id === 3
            );
        }

        const filteredData = filteredtipodata.filter((data) =>
            data.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const filteredExpData = exp === '2' ? filteredData : filteredData.filter((data) =>
            String(data.experiencia_anterior) === String(exp)
        );

        const filteredLocationData = filteredExpData.filter((data) =>
            data.localizacao.toLowerCase().includes(searchLocTerm.toLowerCase())
        );

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredLocationData.slice(indexOfFirstItem, indexOfLastItem);

        setNumberOfPages(Math.ceil(filteredLocationData.length / itemsPerPage));

        return currentItems.map((data) => {
            return (
                <div key={data.id} className="col-lg-4 no-modal">
                    <div className="card cardb card-margin" onClick={() => handleCardClick(data)}>
                        <hr className='linha_card' />
                        <div className="card-header no-border">
                            <h4 className="card-title mt-0">{data.titulo}</h4>
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-meeting-points mt-3 ml-5">
                                    <div>
                                        <strong>Departamento</strong>
                                        <p>{data.departamento}</p>
                                    </div>
                                    <div>
                                        <strong style={{ marginRight: '60px' }}>Localização</strong>
                                        <p>{data.localizacao}</p>
                                    </div>
                                </div>
                                <div className="widget-49-meeting-points mt-2">
                                    <div style={{ paddingRight: '60px' }}>
                                        <strong>Experiencia Anterior</strong>
                                        <div className='bola'
                                            style={{ backgroundColor: data.experiencia_anterior === 1 ? "#24bb29" : "red" }}
                                        >
                                            <div className='estado'>
                                                {data.tempo_minimo_de_experiencia}
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <strong>Habilitações minimas</strong>
                                        <p>{data.habilitacoes_minimas}</p>
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

    return (
        <div className='ofertas'>
            {showPopup && (
                <Popup selectedOfertavaga={selectedOfertavaga} onClose={() => setShowPopup(false)} />
            )}
            <div className="">
                <div>
                    <h1 className='table_titulo'>Ofertas</h1>
                    <hr />
                    <div className="row filters mb-4">
                        <div className="col-lg-2">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Pesquisa</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Título da Oferta/Vaga"
                                        aria-label="Username"
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Localização"
                                        aria-label="Username"
                                        value={searchLocTerm}
                                        onChange={(event) => setSearchLocTerm(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="form-group estados">
                                <label htmlFor="exampleFormControlSelect1">Experiencia Anterior</label>
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    onChange={(event) => setExp(event.target.value)}
                                >
                                    <option value={2}>Todos</option>
                                    <option value={1}>Sim</option>
                                    <option value={0}>Nao</option>
                                </select>
                            </div>
                        </div>
                        {/* Other elements */}
                    </div>

                </div>
                {isLoading && (
                    <div className='loading'>
                        <SyncLoader color="#0D6EFD" />
                    </div>
                )}
                <div className="row cartoes">
                    <LoadFillData />
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
                        <label className='label_mostrard'>Ofertas/Vagas</label>
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