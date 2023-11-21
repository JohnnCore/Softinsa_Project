import './OfertasList.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import authHeader from '../../auth.header'

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React ,{useEffect, useState} from "react";
import { SyncLoader } from 'react-spinners';

import moment from 'moment';
import 'moment-timezone';

export default function OfertasListBO(){
    const [dataOfertas, setDataOfertas] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc"); // Track the current sort direction
    const [searchQuery, setSearchQuery] = useState(""); // Track the search query


    function handleSortClick(column) {
        const sortedData = [...dataOfertas].sort((a, b) => {
          if (column === "#") {
            return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
          } else {
            const valueA = column.split('.').reduce((obj, key) => (obj && obj[key]) || '', a);
            const valueB = column.split('.').reduce((obj, key) => (obj && obj[key]) || '', b);
            
            if (valueA !== undefined && valueB !== undefined) {
              if (typeof valueA === "string" && typeof valueB === "string") {
                return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
              } else {
                return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
              }
            } else {
              return 0;
            }
          }
        });
      
        setDataOfertas(sortedData);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      }

      function filterDataOportunidades() {
        if (searchQuery.trim() === "") {
          return dataOfertas;
        } else {
          const searchTerm = searchQuery.toLowerCase();
          return dataOfertas.filter(
            (data) =>
              data.user.primeiro_nome.toLowerCase().includes(searchTerm) ||
              data.user.ultimo_nome.toLowerCase().includes(searchTerm)
          );
        }
      }
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        LoadOfertasBO();
    },[]);

    function LoadOfertasBO() {
        const url = "https://pint-backend.onrender.com/ofertas/list";
        axios.get(url, {headers:authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataOfertas(data);

                setIsLoading(false)  
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    function LoadFillData(){
        const sortedData = filterDataOportunidades();
        return sortedData.map((data)=>{
            return(
                <tr key={data.id}>
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.titulo}</td>
                    <td className='align-middle'>{data.departamento}</td>
                    <td className='align-middle'>{data.localizacao}</td>
                    <td className='align-middle'>{data.tiposofertavaga.tipo}</td>
                    <td className='align-middle'>{data.estadosofertavaga.estado}</td>
                    <td className='align-middle'>{moment(data.data_criacao).tz('Europe/London').format('DD/MM/YYYY')}</td>
                    <td className='align-middle'>{moment(data.data_atualizacao).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info " to={"/backoffice/ofertas/"+data.id+"/update/"} >Edit</Link>
                    </td>
                </tr>
            )
        });
    }

    function handleSearch(event) {
        setSearchQuery(event.target.value);
      }

    return (
        <div className="tabela-centro">
            <Link className="btn_adicionar " to={"/backoffice/ofertas/create"}>Criar Nova</Link>
            <div>
              <input
                type="text"
                class="form-control"
                style={{ width: "250px" }}
                placeholder="Pesquisar por criador"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {isLoading? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>           
            ):
                <table className="table table-hover table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"
                                onClick={() => handleSortClick("#")}
                                style={{ cursor: "pointer" }}
                            >#</th>
                            <th scope="col"
                                onClick={() => handleSortClick("titulo")}
                                style={{ cursor: "pointer" }}
                            >TITULO</th>
                            <th scope="col"
                                onClick={() => handleSortClick("departamento")}
                                style={{ cursor: "pointer" }}
                            >DEPARTAMENTO</th>
                            <th scope="col"
                                onClick={() => handleSortClick("localizacao")}
                                style={{ cursor: "pointer" }}
                            >LOCALIZAÇÃO</th>
                            <th scope="col"
                                onClick={() => handleSortClick("tiposofertavaga.tipo")}
                                style={{ cursor: "pointer" }}
                            >TIPO DE OFERTA</th>
                            <th scope="col"
                                onClick={() => handleSortClick("estadosofertavaga.estado")}
                                style={{ cursor: "pointer" }}
                            >ESTADO</th>
                            <th scope="col"
                                onClick={() => handleSortClick("data_criacao")}
                                style={{ cursor: "pointer" }}
                            >DATA CRIAÇÃO</th>
                            <th scope="col"
                                onClick={() => handleSortClick("data_atualizacao")}
                                style={{ cursor: "pointer" }}
                            >DATA ATUALIZAÇÃO</th>
                            <th scope="col">EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <LoadFillData/>
                    </tbody>
                </table>
            }
        </div>
    );
}
