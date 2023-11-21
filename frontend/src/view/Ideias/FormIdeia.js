import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import authHeader from '../auth.header';
import authService from '../auth.service';

export default function IdeiaCreate() {
  const navigate = useNavigate()


  const [dataTipos, setdataTipo] = useState([]);

  const [selectTipo, setSelectTipo] = useState("");
  const [campTitulo, setcampTitulo] = useState("");
  const [campDescricao, setcampDescricao] = useState("");

  function SendSave() {
    if (selectTipo === "") {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: 'Insira o Tipo de Ideia!',
      });
    } else if (campTitulo === "") {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: 'Insira o Título!',
      });
    } else if (campDescricao === "") {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: 'Insira a Decricap!',
      });
    }
    else {
      const baseUrl = "https://pint-backend.onrender.com/ideias/create";
      const datapost = {
        tipoideia: selectTipo,
        titulo: campTitulo,
        descricao: campDescricao,
        user: authService.getCurrentUser().id,
      };
      axios
        .post(baseUrl, datapost, { headers: authHeader() })
        .then((response) => {
          if (response.data.success === false) {
            alert(response.data.message);
          }
          else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Ideia Submetida',
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/ideias')
          }
        })
        .catch((error) => {
          alert("Error 34 " + error);
        });
    }
  }


  const LoadTiposIdeia = () => {
    const url = "https://pint-backend.onrender.com/tipos/ideias/list";
    axios.get(url, { headers: authHeader() })
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataTipo(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error)
      });
  }


  useEffect(() => {
    LoadTiposIdeia();
  }, [])

  return (
    <div className='tabela-centro'>
      <div className="container">
        <div className="row">
          <div className="col">
            <label htmlFor="inputtitulo">Título </label>
            <input id="inputtitulo" type="text" className="form-control" placeholder="Título" value={campTitulo} onChange={value => setcampTitulo(value.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="inputempresa">Descrição </label>
            <input id="nputempresa" type="text" className="form-control" placeholder="Descrição" value={campDescricao} onChange={value => setcampDescricao(value.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="inputtipo">Tipo de Ideia</label>
            <select id="inputtipo" className="form-control" onChange={value => setSelectTipo(value.target.value)} style={{width:'49.5%'}}>
              <option disabled selected>Choose...</option>
              {dataTipos.map((data) => {
                return (
                  <option key={data.id} value={data.id}>{data.tipo}</option>
                )
              })}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => SendSave()}>Submeter</button>
      </div>
    </div>
  );
}