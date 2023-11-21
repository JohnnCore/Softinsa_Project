import React from "react";
import axios from 'axios';
import authHeader from '../../auth.header'
import { useState } from "react";
import { useEffect } from "react";
import {IoMdAdd} from 'react-icons/io'
import Swal from "sweetalert2";



export default function Tipos() {
    const [dataTiposProjeto, setdataTiposProjeto] = useState([]);
    const [dataAreasNegocio, setdataAreasNegocio] = useState([]);

    const LoadTiposProjeto = () =>{
        const url = "https://pint-backend.onrender.com/tipos/projetos/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataTiposProjeto(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    const LoadAreasNegocio = () =>{
        const url = "https://pint-backend.onrender.com/areas/list";
        axios.get(url, {headers: authHeader()})
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataAreasNegocio(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    useEffect(() =>{
        LoadTiposProjeto();
        LoadAreasNegocio();
    }, [])

    function createTipoProjeto(){
        const baseUrl = "https://pint-backend.onrender.com/tipos/projetos/create";
      Swal.fire({
        title: 'Coloque o nome do novo Tipo de Projeto',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#0D6EFD',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios.post(baseUrl, { tipo: login }, {headers: authHeader()})
            .then(response => {
              Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
              });
              window.location.reload();
            })
            .catch(error => {
              Swal.showValidationMessage(error.response.data.message)
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
        }
      })
    }

    function createArea(){
        const baseUrl = "https://pint-backend.onrender.com/areas/create";
      Swal.fire({
        title: 'Coloque o nome da nova Área de Negócio',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#0D6EFD',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return axios.post(baseUrl, { area: login }, {headers: authHeader()})
            .then(response => {
              Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
              });
              window.location.reload();
            })
            .catch(error => {
              Swal.showValidationMessage(error.response.data.message)
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
        }
      })
    }


    return(
        <div style={{width: '50%', marginLeft: '25%', border: '1px solid #B1BAC5', borderRadius: '5px', display:'flex'}}>
            <div style={{width: '50%', height: '100%', margin: 0, textAlign: "center"}}>
                <div className="mb-2" style={{backgroundColor: '#0D6EFD', color: 'white', height: '50px'}}>
                    <h5 style={{verticalAlign: 'middle',paddingTop: '10px'}}>Tipos de Projeto</h5>
                </div>
                <div style={{position: "relative"}}>
                    {dataTiposProjeto.map((data) => {
                                return (
                                    <p key={data.id} value={data.id}>{data.tipo}</p>
                                )
                            })}
                    <IoMdAdd onClick={createTipoProjeto} size={30} style={{position: 'absolute', right: 10, top: 0,cursor: 'pointer'}}/>
                </div>
            </div>
            <div style={{width: '50%', height: '100%', margin: 0,textAlign: "center", borderLeft: '1px solid #B1BAC5'}}>
            <div className="mb-2" style={{backgroundColor: '#0D6EFD', color: 'white', height: '50px'}}>
                    <h5 style={{verticalAlign: 'middle',paddingTop: '10px'}}>Áreas de Negócio</h5>
            </div>
                <div style={{position: "relative"}}>
                    {dataAreasNegocio.map((data) => {
                                return (
                                    <p key={data.id} value={data.id}>{data.area}</p>
                                )
                            })}
                    <IoMdAdd onClick={createArea} size={30} style={{position: 'absolute', right: 10, top: 0, cursor: 'pointer'}}/>
                </div>
            </div>

        </div>
    )
}