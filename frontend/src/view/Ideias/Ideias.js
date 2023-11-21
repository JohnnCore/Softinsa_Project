import './ideias.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import authHeader from '../auth.header';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import authService from '../auth.service';
import Swal from 'sweetalert2';


export default function OfertavagaList() {
    const navigate = useNavigate()
    const [dataOfertavaga, setdataOfertavaga] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function LoadOfertavaga() {
        setIsLoading(true);
        const url = "https://pint-backend.onrender.com/ideias/list";
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

    function handlecriar() {
        navigate("create")
    }

    useEffect(() => {
        LoadOfertavaga();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [Tipo, setTipo] = useState('Todos');

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
        const filteredDataid = dataOfertavaga.filter((data) =>
            data.user.id === authService.getCurrentUser().id
        );
        const sortedData = filteredDataid.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
        const filteredData = sortedData.filter((data) =>
            data.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredtipoData = Tipo === 'Todos' ? filteredData : filteredData.filter((data) =>
            data.tipodeideia.tipo.toLowerCase() === Tipo.toLowerCase()
        );

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredtipoData.slice(indexOfFirstItem, indexOfLastItem);

        setNumberOfPages(Math.ceil(filteredtipoData.length / itemsPerPage));

        if (filteredtipoData.length === 0 && isLoading === false) {
            return (
                <div className='sem_ideias'>
                    <h1>Ainda estou em branco, sem nenhuma ideia no momento.</h1>
                    <button onClick={handlecriar} style={{ width: '200px' }} type="button" class="btn btn-primary">Criar Ideia</button>
                </div>
            )
        } else {
            return currentItems.map((data) => {
                return (
                    <div key={data.id} className="col-lg-4 no-modal card_ideia">
                        <div className="card cardb card-margin">
                            <hr className='linha_card' />
                            <p className='tipo_ideia'>{data.tipodeideia.tipo}</p>
                            <div className="card-header no-border">
                                <h4 className="card-title mt-0">{data.titulo}</h4>
                                <div className="widget-49-meeting-points mt-3 ml-5">
                                    <h6>Criada Por: {data.user.primeiro_nome} {data.user.ultimo_nome}</h6>
                                    <h6>Tipo: {data.tipodeideia.tipo}</h6>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="widget-49">
                                    <div className="widget-49-meeting-points mt-3 ml-5">
                                        <div>
                                            <p>{data.descricao}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        }
    }

    return (
        <div className='ideias'>
            <div className="">
                <div>
                    <h1 className='table_titulo'>Ideias</h1>
                    <hr />
                    <div className="row filters mb-4">
                        <div className='col-lg-2'>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Pesquisa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Título da Ideia"
                                    aria-label="Username"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)} />
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="form-group estados">
                                <label htmlFor="exampleFormControlSelect1">Tipo da Ideia</label>
                                <select className="form-control" id="exampleFormControlSelect1" onChange={(event) => setTipo(event.target.value)}>
                                    <option >Todos</option>
                                    <option >Design</option>
                                    <option >Recurso</option>
                                    <option >Melhoria</option>
                                    <option >Funcionalidade</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button onClick={handlecriar} style={{ marginLeft: '60px', marginBottom: '-15px' }} type="button" class="btn btn-primary">Criar Ideia</button>

                        </div>
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
                        <label className='label_mostrard'>Ideias</label>
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