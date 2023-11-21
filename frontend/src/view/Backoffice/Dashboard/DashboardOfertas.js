import './Dashboard.css'
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RadialChart } from 'react-vis';
import {
    HorizontalBarSeries,
    XAxis,
    YAxis,
    FlexibleWidthXYPlot,
    DiscreteColorLegend,
} from 'react-vis';



import moment from 'moment';
import 'moment-timezone';

import axios from 'axios';
import authHeader from '../../auth.header';

export default function CandidaturasListBO() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [dataOfertas, setDataOfertas] = useState([]);
    const [dataCandidaturas, setDataCandidaturas] = useState([]);
    const [dataEstadosCandidaturas, setEstadosDataCandidaturas] = useState([]);

    const [candidaturasporEstado, setCandidaturasporEstado] = useState([]);

    const [clickValue, setClickValue] = useState(null);

    const LoadOfertas = () => {
        const url = "https://pint-backend.onrender.com/ofertas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setDataOfertas(data);
                    setIsLoading(false);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    const LoadCandidaturas = () => {
        const url = "https://pint-backend.onrender.com/candidaturas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setDataCandidaturas(data);
                    setIsLoading(false);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }


    const LoadEstadosCandidaturas = () => {
        const url = "https://pint-backend.onrender.com/estado/candidaturas/list";
        axios.get(url, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setEstadosDataCandidaturas(data);
                    setIsLoading(false);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    const LoadAll = () => {
        LoadOfertas();
        LoadCandidaturas();
        LoadEstadosCandidaturas();
    }

    useEffect(() => {
        LoadAll();
    }, []);


    const calcularCandidaturasPorEstado = () => {
        const candidaturasPorEstado = [];

        // Iterar sobre cada oferta


        const ofertasFiltradas = dataOfertas.filter((oferta) => oferta.estadosofertavagaId=== 1);

        ofertasFiltradas.forEach((oferta) => {
            const candidaturasOferta = dataCandidaturas.filter((candidatura) => candidatura.ofertasvagaId === oferta.id);
            const candidaturasPorEstadoOferta = [];

            // Iterar sobre cada estado
            dataEstadosCandidaturas.forEach((estado) => {
                const candidaturasEstado = candidaturasOferta.filter((candidatura) => candidatura.estadoscandidaturaId === estado.id);
                const objetoEstado = {
                    color: obterCorEstado(estado.id),
                    size: candidaturasEstado.length,
                    ofertaId: oferta.id,
                    estado: estado.id,
                };
                candidaturasPorEstadoOferta.push(objetoEstado);
            });

            const objetoOferta = {
                x: oferta.id + ' - '  + oferta.titulo,
                y: candidaturasPorEstadoOferta,
            };

            candidaturasPorEstado.push(objetoOferta);
        });

        return candidaturasPorEstado;
    };

    // Função auxiliar para obter a cor do estado
    const obterCorEstado = (estado) => {
        switch (estado) {
            case 1:
                return "grey";
            case 2:
                return "blue";
            case 3:
                return "red";
            case 4:
                return "lime";
            default:
                return "black";
        }
    };


    useEffect(() => {
        const candidaturasPorEstado = calcularCandidaturasPorEstado();
        setCandidaturasporEstado(candidaturasPorEstado);
    }, [dataOfertas, dataCandidaturas, dataEstadosCandidaturas]);

    console.log(candidaturasporEstado);

    const StackedBarChart = () => {

        const colors = [
            { title: 'Por Analisar', color: 'grey' },
            { title: 'Em Análise', color: 'blue' },
            { title: 'Rejeitada', color: 'red' },
            { title: 'Aceite', color: 'lime' },
        ];

        const colorLegendItems = colors.map((color) => ({
            title: color.title,
            color: color.color,
        }));


        const maxBarSize = Math.max(
            ...candidaturasporEstado.flatMap((d) => d.y.map((entry) => entry.size))
        );

        const stackedData = candidaturasporEstado.flatMap((d) =>
            d.y.map((entry) => ({
                x: entry.size,
                y: d.x,
                color: entry.color,
                size: entry.size / maxBarSize, // Normalizing the size values
                ofertaId: entry.ofertaId,
                estado: entry.estado,
            }))
        );

        const handleBarClick = (bar) => {
            setClickValue(bar);
        };

        const barSeries = colors.map((color) => {
            const filteredData = stackedData.filter((d) => d.color === color.color);
            return <HorizontalBarSeries onValueClick={handleBarClick} data={filteredData} color={color.color} style={{ cursor: 'pointer' }} />;
        });

        return (
            <div>
                <FlexibleWidthXYPlot
                    height={600}
                    yType="ordinal"
                    margin={{ left: 100 }}
                >
                    <XAxis />
                    <YAxis />
                    {barSeries}
                </FlexibleWidthXYPlot>
                <DiscreteColorLegend orientation="horizontal" items={colorLegendItems} />
            </div>
        );
    };

    const filterDataCandidaturas = () => {
        if (clickValue) {
            return dataCandidaturas.filter((data) => data.ofertasvagaId === clickValue.ofertaId && data.estadoscandidaturaId === clickValue.estado);
        }
        return dataCandidaturas;
    };

    const handlePDFClick = (url) => {
        axios.get(url, { headers: authHeader(), responseType: 'blob' })
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl, '_blank');
            })
            .catch(error => {
                console.error('Error:', error);
            }); 
    };

    const LoadFillData = () => {
        const sortedData = filterDataCandidaturas();
        sortedData.sort((a, b) => a.id - b.id); // Ordena os dados por ID
        return sortedData.map((data) => {
            const downloadUrl = `https://pint-backend.onrender.com/candidaturas/ofertas/${data.ofertasvagaId}/file/${data.curriculo}`;
            return (
                <tr key={data.id}>
                    <th className='align-middle'>{data.id}</th>
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{ fontSize: "13px" }}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.user.telemovel}</td>
                    <td className='align-middle'><Link onClick={() => { handlePDFClick(downloadUrl); }}>{data.curriculo}</Link></td>

                    <td className='align-middle'>{data.estadoscandidatura.estado}</td>
                    <td className='align-middle'>{moment(data.data_candidatura).tz('Europe/London').format('DD/MM/YYYY HH:mm')}</td>

                    <td className='align-middle'>
                        <Link className="btn btn-outline-info " to={"/backoffice/ofertas/" + data.ofertasvagaId + "/candidaturas/" + data.id + "/update"}>Editar</Link>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="tabela-centro">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/backoffice/dashboard/oportunidades"}>Oportunidades</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/backoffice/dashboard/ofertas"}>Ofertas</Link>
                </li>
            </ul>
            <div className='grafic'>
                <StackedBarChart />
            </div>

            {clickValue && (
                <table className="ml-5 table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">CANDIDATO</th>
                            <th scope="col">TELEMÓVEL</th>
                            <th scope="col">CURRÍCULO</th>
                            <th scope="col">ESTADO CANDIDATURA</th>
                            <th scope="col">DATA CANDIDATURA</th>
                            <th scope="col">EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <LoadFillData />
                    </tbody>
                </table>
            )}
        </div>
    );
}
