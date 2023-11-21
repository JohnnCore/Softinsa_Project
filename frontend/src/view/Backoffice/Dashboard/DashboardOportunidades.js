import './Dashboard.css'
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from 'react-vis';
import moment from 'moment';
import 'moment-timezone';

import axios from 'axios';
import authHeader from '../../auth.header';

export default function CandidaturasListBO() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dataOportunidades, setDataOportunidades] = useState([]);
  const [dataEstadosOportunidade, setdataEstadosOportunidade] = useState([]);
  const [oportunidadesPorEstado, setOportunidadesPorEstado] = useState([]);
  
  const [hoverValue, setHoverValue] = useState(null);
  const [clickValue, setClickValue] = useState(null);

  const LoadOportunidades = () => {
    const url = "https://pint-backend.onrender.com/oportunidades/list";
    axios.get(url, { headers: authHeader() })
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setDataOportunidades(data);
          setIsLoading(false);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  const LoadEstadosOportunidades = () => {
    const url = "https://pint-backend.onrender.com/estado/oportunidades/list";
    axios.get(url, { headers: authHeader() })
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataEstadosOportunidade(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  const LoadAll = () => {
    LoadOportunidades();
    LoadEstadosOportunidades();
  }

  useEffect(() => {
    LoadAll();
  }, []);

  useEffect(() => {
    contarOportunidadesPorEstado();
  }, [dataOportunidades, dataEstadosOportunidade]);

  const handleValueMouseClick = (datapoint, event) => {
    setClickValue(datapoint.x);
  };
  
  const handleValueMouseOver = (datapoint, event) => {
    setHoverValue(datapoint.y);
  };

  const handleValueMouseOut = () => {
    setHoverValue(null);
  };

  const BarChart = () => {
    const data = Object.entries(oportunidadesPorEstado).map(([estado, quantidade]) => ({
      x: `${estado}`,
      y: quantidade,
    }));

    return (
      <XYPlot xType="ordinal" width={400} height={300}>
        <VerticalBarSeries style={{cursor:'pointer'}} data={data}
          onValueClick={handleValueMouseClick}
          onValueMouseOver={handleValueMouseOver}
          onValueMouseOut={handleValueMouseOut}
        />
        <XAxis />
        <YAxis />
      </XYPlot>
    );
  };

  const contarOportunidadesPorEstado = () => {
    const contagemOportunidadesPorEstado = {};

    dataEstadosOportunidade.forEach((estado) => {
      let contagem = 0;

      dataOportunidades.forEach((oportunidade) => {
        if (oportunidade.estadosoportunidadeId === estado.id) {
          contagem++;
        }
      });

      contagemOportunidadesPorEstado[estado.estado] = contagem;
    });

    setOportunidadesPorEstado(contagemOportunidadesPorEstado);
  };

  const filterDataOportunidades = () => {
    if (clickValue) {
      return dataOportunidades.filter((data) => data.estadosoportunidade.estado === clickValue);
    }
    return dataOportunidades;
  };

  const LoadFillData = () => {
    const sortedData = filterDataOportunidades();
    sortedData.sort((a, b) => a.id - b.id); // Ordena os dados por ID
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

  return (
    <div className="tabela-centro">
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/backoffice/dashboard/oportunidades"}>Oportunidades</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={"/backoffice/dashboard/ofertas"}>Ofertas</Link>
        </li>
      </ul>
      <div className='grafico'>
        <BarChart />
      </div>
    
      {hoverValue && (
        <div className="estado_op">
          <h5>{hoverValue}</h5>
        </div>
        )}

      {clickValue && (
          <>
        <div>
          <h4>{clickValue}</h4>
        </div>
        <table className="ml-5 table table-hover table-striped">
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>User</th>
            <th scope='col'>Tipo de Projeto</th>
            <th scope='col'>Área de Negócio</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Data de Criação</th>
            <th scope='col'>Data de Atualização</th>
            <th scope='col'>Editar</th>
          </tr>
        </thead>
        <tbody>
          <LoadFillData/>
        </tbody>
      </table>
      </>
      )}
    </div>
  );
}
