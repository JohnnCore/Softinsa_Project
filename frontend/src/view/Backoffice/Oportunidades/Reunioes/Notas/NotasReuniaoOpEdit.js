import axios from 'axios';
import authHeader from '../../../../auth.header'
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import 'sweetalert2/src/sweetalert2.scss'

export default function NotasReuniaoOpUpdate() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    const { oportunidadeId, reuniaoId, notaId } = useParams();

    const [campTitulo, setcampTitulo] = useState("");

    const [campDetalhes, setcampDetalhes] = useState("");



    useEffect(() => {
        const LoadNota = () => {
            const url = "https://pint-backend.onrender.com/notas/get/" + notaId + "/reunioes/" + reuniaoId + "/oportunidades/" + oportunidadeId;
            axios.get(url, { headers: authHeader() })
                .then(res => {
                    if (res.data.success) {
                        const data = res.data.data[0];
                        setcampTitulo(data.titulo)
                        setcampDetalhes(data.detalhes)

                        setIsLoading(false)
                    }
                    else {
                        alert("Error web service")
                    }
                })
                .catch(error => {
                    alert("Error server: " + error)
                })
        }

        LoadNota()
    }, [notaId, reuniaoId, oportunidadeId]);

    function SendUpdate() {
        if (campTitulo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Título!',
            });
        } else if (campDetalhes === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira os Detalhes!',
            });
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/notas/update/" + notaId + "/reunioes/" + reuniaoId + "/oportunidades/" + oportunidadeId
            const datapost = {
                titulo: campTitulo,
                detalhes: campDetalhes
            };
            axios.post(baseUrl, datapost, { headers: authHeader() })
                .then(response => {
                    if (response.data.success === false) {
                        alert(response.data.message)
                    }
                    else {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Nota Atualizada',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/backoffice/oportunidades/' + oportunidadeId + '/reunioes/' + reuniaoId + "/notas")
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }

    return (
        <div className="tabela-centro">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/"}>Oportunidades</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/update"}>Oportunidade</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/reunioes"}>Reuniões</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/reunioes/" + reuniaoId + "/update"}>Reunião</Link></li>
                    <li className="breadcrumb-item"><Link to={"/backoffice/oportunidades/" + oportunidadeId + "/reunioes/" + reuniaoId + "/notas"}>Notas</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Nota</li>
                </ol>
            </nav>
            {isLoading ? (
                <div className='loading'>
                    <SyncLoader color="#0D6EFD" />
                </div>
            ) :
                <div className="container">
                    <div className="row">
                        <div className="col">

                            <label>Título</label>
                            <input type="text" className="form-control" placeholder="Título" value={campTitulo} onChange={(value) => setcampTitulo(value.target.value)} />
                        </div>
                        <div className="col">
                            <label>Detalhes</label>
                            <textarea type="text" className="form-control" placeholder="Detalhes" value={campDetalhes} onChange={(value) => setcampDetalhes(value.target.value)} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => SendUpdate()}>Submeter</button>
                </div>
            }
        </div>
    );
}