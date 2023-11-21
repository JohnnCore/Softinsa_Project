import './OportunidadesList.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { SyncLoader } from 'react-spinners';

import authHeader from '../../auth.header'

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import moment from 'moment';
import 'moment-timezone';

export default function OportunidadesListBO() {

  const [isLoading, setIsLoading] = useState(true);

  const [dataOportunidades, setDataOportunidades] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc"); // Track the current sort direction
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query



  useEffect(() => {
    LoadOportunidadesBO();
  }, []);

  

  function LoadOportunidadesBO() {
    const url = "https://pint-backend.onrender.com/oportunidades/list";
    axios.get(url, { headers: authHeader() })
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setDataOportunidades(data);
          setIsLoading(false)
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error)
      });
  }

  function handleSortClick(column) {
    const sortedData = [...dataOportunidades].sort((a, b) => {
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
  
    setDataOportunidades(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  }

  function filterDataOportunidades() {
    if (searchQuery.trim() === "") {
      return dataOportunidades;
    } else {
      const searchTerm = searchQuery.toLowerCase();
      return dataOportunidades.filter(
        (data) =>
          data.user.primeiro_nome.toLowerCase().includes(searchTerm) ||
          data.user.ultimo_nome.toLowerCase().includes(searchTerm)
      );
    }
  }

  function LoadFillData() {
    const sortedData = filterDataOportunidades();
    return sortedData.map((data) => {
      return (
        <tr key={data.id} >
          <th className='align-middle'>{data.id}</th>
          <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
            <p style={{ fontSize: "13px" }}>{data.user.email}</p>
          </td>
          <td className='align-middle'>{data.tiposdeprojeto.tipo}</td>
          <td className='align-middle'>{data.areasdenegocio.area}</td>
          <td className='align-middle'>{data.estadosoportunidade.estado}</td>
          <td className='align-middle'>{moment(data.data_criacao).tz('Europe/London').format('DD/MM/YYYY')}</td>
          <td className='align-middle'>{moment(data.data_atualizacao).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>

          <td className='align-middle'>
            <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()} to={"/backoffice/oportunidades/" + data.id + "/update"} >Edit</Link>
          </td>
        </tr>
      )
    });
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <>
    
      {isLoading ? (
        <div className='loading'>
          <SyncLoader color="#0D6EFD" />
        </div>
      ) :
        <div className="container-fluid" style={{ marginLeft: '10%' }}>
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
        <table className="ml-5 table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col"
                onClick={() => handleSortClick("#")}
                style={{ cursor: "pointer" }}
              >#</th>
              <th scope="col"
                onClick={() => handleSortClick("user.primeiro_nome")}
                style={{ cursor: "pointer" }}
              >CRIADOR</th>
              <th scope="col"
                onClick={() => handleSortClick("tiposdeprojeto.tipo")}
                style={{ cursor: "pointer" }}
              >TIPO DE PROJETO</th>
              <th scope="col"
                onClick={() => handleSortClick("areasdenegocio.area")}
                style={{ cursor: "pointer" }}
              >ÁREA DE NEGÓCIO</th>
              <th scope="col"
                onClick={() => handleSortClick("estadosoportunidade.estado")}
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
            {LoadFillData()}
          </tbody>
        </table>
        </div>
      }
    </>
  );
}
