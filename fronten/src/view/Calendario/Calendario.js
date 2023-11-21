import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import authHeader from '../auth.header';
import authService from '../auth.service';
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SyncLoader } from 'react-spinners';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import moment from 'moment';
import 'moment-timezone';

export default function Calendario() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);

  const [events, setEvents] = useState([]);

  const LoadEventos = async () => {
    try {
      const reunioesoportunidades = await LoadReunioesOportunidades();
      const entrevistas = await LoadEntrevistas();
      const reunioesideias = await LoadReunioesIdeias();
      setIsLoading(false);

      const combinedEvents = [...reunioesoportunidades, ...entrevistas, ...reunioesideias];
      setEvents(combinedEvents);
    } catch (error) {
      console.error(error);
      // Trate o erro adequadamente
    }
  };

  const LoadReunioesOportunidades = async () => {
    const url = "https://pint-backend.onrender.com/reunioes/oportunidadescolaboradores/"+authService.getCurrentUser().id+"/list";

    try {
      const response = await axios.get(url, { headers: authHeader() });

      if (response.data.success) {
        const data = response.data.data;
        const newEvents = data.map(item => ({
          title: item.reunioesoportunidade.titulo,
          start: item.reunioesoportunidade.data_reuniao,
          // start: new Date(item.reunioesoportunidade.data_reuniao).setHours(new Date(item.reunioesoportunidade.data_reuniao).getHours()-1),

          evento: item,
        }));

        return newEvents;
      } else {
        throw new Error("Error Web Service!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const LoadEntrevistas = async () => {
    const url = "https://pint-backend.onrender.com/entrevistas/"+authService.getCurrentUser().id+"/list";

    try {
      const response = await axios.get(url, { headers: authHeader() });

      if (response.data.success) {
        const data = response.data.data;
        const newEvents = data.map(item => ({
          title: item.candidatura.user.primeiro_nome + ' ' + item.candidatura.user.ultimo_nome + ' entrevista',
          start: item.data_entrevista,

          // start: new Date(item.data_entrevista).setHours(new Date(item.data_entrevista).getHours()-1),

          evento: item,
        }));

        return newEvents;
      } else {
        throw new Error("Error Web Service!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const LoadReunioesIdeias = async () => {
    const url = "https://pint-backend.onrender.com/reunioes/ideiascolaboradores/"+authService.getCurrentUser().id+"/list";
    console.log(url);

    try {
      const response = await axios.get(url, { headers: authHeader() });

      if (response.data.success) {
        const data = response.data.data;
        const newEvents = data.map(item => ({
          title: item.reunioesideia.titulo,
          start: item.reunioesideia.data_reuniao,
          // start: new Date(item.reunioesideia.data_reuniao).setHours(new Date(item.reunioesideia.data_reuniao).getHours()-1),

          evento: item,
        }));
 
        return newEvents;
      } else {
        throw new Error("Error Web Service!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  function renderEventContent(eventInfo) {
    return (
      <>

        <b>{moment(eventInfo.event.start).tz('Europe/London').format('HH:mm')}</b>
        
        <i>{eventInfo.event.title.slice(0, 25)}...</i>
      </>
    );
  }

  useEffect(() => {
    LoadEventos();
  }, []);
  
  const handleEventClick = (info) => {
    console.log(info.event.extendedProps.evento.reunioesoportunidadeId);
    if (info.event.extendedProps.evento.reunioesoportunidadeId)
    {
      navigate("/backoffice/oportunidades/"+info.event.extendedProps.evento.reunioesoportunidade.oportunidadeId+"/reunioes/"+info.event.extendedProps.evento.reunioesoportunidadeId+"/update")
      // alert("Event Title: " + info.event.title + "\nStart Date: " + info.event.start);
    }
    else if (info.event.extendedProps.evento.candidaturaId)
    {
      navigate("/backoffice/ofertas/"+info.event.extendedProps.evento.candidatura.ofertasvagaId+"/candidaturas/"+info.event.extendedProps.evento.candidaturaId+"/entrevistas/"+info.event.extendedProps.evento.id+"/update")

    }
    else if (info.event.extendedProps.evento.reunioesideiaId)
    {
      navigate("/backoffice/ideias/"+info.event.extendedProps.evento.reunioesideia.ideiaId+"/reunioes/"+info.event.extendedProps.evento.reunioesideiaId+"/update")
    }
  };
  
  function handleDateClick() {
    alert('Dia clicado:');
  }

  console.log(events);
  return (
    <div style={{width: '30%'}}>
      {isLoading ? (
        <div className='loading'>
          <SyncLoader color="#0D6EFD" />
        </div>
      ) : (
        <FullCalendar
          // dayCellContent={handleDayCellContent }
          plugins={[dayGridPlugin, interactionPlugin]}
          height={500}
          defaultView="dayGridMonth"
          themeSystem="Simplex"
          events={events}
          eventClick={handleEventClick} // Adicione o manipulador de eventos
          eventContent={renderEventContent}
          // dateClick={(e) => handleDateClick(e)}
          // dayMaxEvents={true}
          dayMaxEventRows={0}
        />
      )}
    </div>
  );
}
