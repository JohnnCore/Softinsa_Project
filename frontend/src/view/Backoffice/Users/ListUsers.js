import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import authHeader from "../../auth.header";

export default function ListUserBO() {
  const [dataUsers, setDataUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc"); // Track the current sort direction
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query

  useEffect(() => {
    LoadUsersBO();
  }, []);

  function LoadUsersBO() {
    const url = "https://pint-backend.onrender.com/users/list/";
    axios
      .get(url, { headers: authHeader() })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataUsers(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleSortClick(column) {
    const sortedData = [...dataUsers].sort((a, b) => {
      if (column === "#") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      } else if (column === "estado") {
        return sortDirection === "asc" ? a[column] - b[column] : b[column] - a[column];
      } else {
        if (sortDirection === "asc") {
          return a[column].localeCompare(b[column]);
        } else {
          return b[column].localeCompare(a[column]);
        }
      }
    });
    setDataUsers(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  function filterDataUsers() {
    if (searchQuery.trim() === "") {
      return dataUsers;
    } else {
      const searchTerm = searchQuery.toLowerCase();
      return dataUsers.filter(
        (data) =>
          data.primeiro_nome.toLowerCase().includes(searchTerm) ||
          data.ultimo_nome.toLowerCase().includes(searchTerm)
      );
    }
  }

  function LoadFillData() {
    const filteredDataUsers = filterDataUsers(); // Apply the filter to get the filtered data
    return filteredDataUsers.map((data) => {
      return (
        <tr key={data.id}>
          <th className="align-middle">{data.id}</th>
          <td className="align-middle">
            {data.primeiro_nome + " " + data.ultimo_nome}
            <p style={{ fontSize: "13px" }}>{data.email}</p>
          </td>
          <td className="align-middle">{data.telemovel}</td>
          <td className="align-middle">{data.cargo}</td>
          <td className="align-middle">
            {data.estado ? "Ativo" : "Inativo"}
          </td>
          <td className="align-middle">
            <Link
              className="btn btn-outline-info"
              onClick={(e) => e.stopPropagation()}
              to={data.id + "/edit"}
            >
              Edit
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="tabela-centro">
      <Link className="btn_adicionar" to={"create"}>
        Criar Novo
      </Link>
      <div>
        <input
          type="text"
          class="form-control"
          style={{ width: "250px" }}
          placeholder="Procurar por nome"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th
              scope="col"
              onClick={() => handleSortClick("#")} // Make the column header clickable and trigger sorting by ID
              style={{ cursor: "pointer" }} // Change the cursor to indicate it's clickable
            >
              #
            </th>
            <th
              scope="col"
              onClick={() => handleSortClick("primeiro_nome")} // Make the column header clickable
              style={{ cursor: "pointer" }} // Change the cursor to indicate it's clickable
            >
              NOME
            </th>
            <th>TELEMÓVEL</th>
            <th
              scope="col"
              onClick={() => handleSortClick("cargo")} // Make the column header clickable
              style={{ cursor: "pointer" }} // Change the cursor to indicate it's clickable
            >
              CARGO
            </th>
            <th
              scope="col"
              onClick={() => handleSortClick("estado")} // Make the column header clickable
              style={{ cursor: "pointer" }} // Change the cursor to indicate it's clickable
            >
              ESTADO
            </th>
            <th scope="col">EDITAR</th>
          </tr>
        </thead>
        <tbody>
          <LoadFillData />
        </tbody>
      </table>
    </div>
  );
}
