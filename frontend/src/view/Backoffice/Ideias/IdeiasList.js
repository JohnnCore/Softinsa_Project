import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import { Link } from "react-router-dom";
import React ,{useEffect, useState} from "react";
import authHeader from '../../auth.header'
import { SyncLoader } from 'react-spinners';

export default function IdeiasListBO(){
    const [isLoading, setIsLoading] = useState(true);

    const [dataIdeias, setDataIdeias] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc"); // Track the current sort direction
    const [searchQuery, setSearchQuery] = useState(""); // Track the search query


    useEffect(() => {
        LoadIdeiasBO();
    },[]);

    function handleSortClick(column) {
        const sortedData = [...dataIdeias].sort((a, b) => {
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
      
        setDataIdeias(sortedData);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      }
      

    function LoadIdeiasBO() {
        const url = "https://pint-backend.onrender.com/ideias/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataIdeias(data);
                setIsLoading(false)
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    function filterDataIdeias() {
        if (searchQuery.trim() === "") {
          return dataIdeias;
        } else {
          const searchTerm = searchQuery.toLowerCase();
          return dataIdeias.filter(
            (data) =>
              data.user.primeiro_nome.toLowerCase().includes(searchTerm) ||
              data.user.ultimo_nome.toLowerCase().includes(searchTerm)
          );
        }
      }

    function LoadFillData(){
        const sortedData = filterDataIdeias();
        return sortedData.map((data)=>{
            return(
                <tr key={data.id}>
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.titulo}</td>
                    <td className='align-middle'>{data.tipodeideia.tipo}</td>

                    <td className='align-middle'>
                        <Link className="btn btn-outline-info " to={"/backoffice/ideias/"+data.id+"/update"} >Edit</Link>
                    </td>
                </tr>
            )
        });
    }

    function handleSearch(event) {
        setSearchQuery(event.target.value);
      }

    return (
        <div className='tabela-centro'>
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
            {isLoading ? (
            <div className='loading'>
              <SyncLoader color="#0D6EFD" />
            </div>
            ) :
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
                              onClick={() => handleSortClick("titulo")}
                              style={{ cursor: "pointer" }}
                          >TÍTULO</th>
                          <th scope="col"
                              onClick={() => handleSortClick("tipodeideia.tipo")}
                              style={{ cursor: "pointer" }}
                          >TIPO DE IDEIA</th>
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
