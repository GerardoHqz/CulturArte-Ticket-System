import React,  { useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import MenuEmployee from "../../components/MenuEmployee";
import { Doughnut, Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';
import { AiOutlineMenu } from "react-icons/ai";

import { getTiersByEvent } from "../../services/Tier";
import { getTicketByEventId } from "../../services/Ticket";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function EventStadistic() {
  const params = useParams();

  const [menuVisible, setMenuVisible] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [tierSeats, setTierSeats] = useState([]);
  const [tierSeatsSold, setTierSeatsSold] = useState([]);
  const [title, setTitle] = useState("");
  const [ticketSold, setTicketSold] = useState("");
  const [ticketCanjeados, setTicketCanjeados] = useState("");
  const [ticketNoCanjeados, setTicketNoCanjeados] = useState("");
  

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };
  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  
  //obtengo los tiers del evento
  const getTiers = async () => {
    try {
      const response = await getTiersByEvent(params.eventId, localStorage.getItem("token"));
      if (response) {
        // nombre del evento
        const titleEvent = response[0].event.title;
        // nombres de los tiers
        const tierNames = response.map((tier) => tier.nameTier);
        // tickets vendidos
        const tierSeatsSold = response.map((tier) => tier.amountSeantOriginal - tier.amountSeant);
        // suma de los tickets vendidos
        const ticketSold = tierSeatsSold.reduce((acc, curr) => acc + curr, 0);
        // tickets que se pueden vender
        const tierSeats = response.map((tier) => tier.amountSeantOriginal);
  
        setTitle(titleEvent);
        setTicketSold(ticketSold);
        setTiers(tierNames);
        setTierSeats(tierSeats);
        setTierSeatsSold(tierSeatsSold);;
        console.log("tiers:", tierNames);
        console.log("tickets vendidos:", tierSeatsSold);
        console.log("tickets disponibles:", tierSeats);
      } else {
        setTitle("");
        setTicketSold("");
        setTiers([]);
        setTierSeats([]);
        setTierSeatsSold([]);
      }
    } catch (error) {
      console.error("Error al obtener los tiers:", error);
    }
  };

  const getTickets = async () => {
    try {
      const response = await getTicketByEventId(params.eventId, localStorage.getItem("token"));
      if (response) {
        // Obtener tickets canjeados
        const ticketsCanjeados = response.filter((tier) => tier.redmed === true);
        const cantidadTicketsCanjeados = ticketsCanjeados.length;
        // Obtener tickets no canjeados
        const ticketsNoCanjeados = response.filter((tier) => tier.redmed === false);
        const cantidadTicketsNoCanjeados = ticketsNoCanjeados.length;

        setTicketCanjeados(cantidadTicketsCanjeados);
        setTicketNoCanjeados(cantidadTicketsNoCanjeados);
      } else {
        setTicketCanjeados("");
        setTicketNoCanjeados("");
      }
    } catch (error) {
      console.error("Error al obtener los tickets:", error);
    }
  };
  

  useEffect(() => {
    getTiers();
    getTickets();
  }, []);


  //Visuales de estadistica = graficas de barras
  const options = {
    responsive: true,
    plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
        },
    },
  };

  //Aqui quiero que se muestre el nombre de los tiers
  const chartData = {
    labels: tiers, // Usar los nombres de los tiers como labels
    datasets: [
      {
        label: 'Tickets Disponibles',
        data: tierSeats, // Usar las cantidades de tierSeats como datos
        backgroundColor: '#0E7BAA',
      },
      {
        label: 'Tickets Vendidos',
        data: tierSeatsSold, // Usar las cantidades de tierSeatsSold como datos
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const labels = ['Tier 1', 'Tier 2', 'Tier 3'];

  const data = {
      labels,
      datasets: [
          {
              label: 'Tickets Disponibles',
              //aqui quiero que se muestren los tickets disponibles
              //que estan en tierSeats
              data: [100, 50, 25],
              backgroundColor: '#0E7BAA',
          },
          {
              label: 'Tickets Vendidos',
              //aqui quiero que se muestren los tickets vendidos
              //que estan en tierSeatsSold
              data: [80, 25, 15],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
      ],
  };

  return (
    <div>
      <div class="flex w-full">
        <div className="w-1/5 max-sm:w-0">
          <MenuEmployee />
        </div>
        <div class="w-full mx-32 max-sm:mx-3 my-5 sticky">

        <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center pt-3">
        <AiOutlineMenu
          onClick={openMenu}
          className="sm:hidden mr-2"
          style={{ verticalAlign: "middle" }}
        />
        <span className="flex-grow text-center">Estadísticas</span>
        {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
      </h1>
          <p class="text-blue font-medium text-xl mb-4">Estadisticas: {title}</p>
          <hr class=" border-gray-300 mb-4" />

          <p class="text-blue font-medium text-xl mb-4">Tickets y asistencia</p>

          <div class="w- full flex justify-around text-center items-center font-montserrat text-white">

            <div class="w-1/6 bg-pink-300 p-3">
              <h1>{ticketSold}</h1>
              <h2>Tickets Vendidos</h2>
            </div>
            <div class="w-1/6 bg-pink-300 p-3">
              <h1>{ticketCanjeados}</h1>
              <h2>Tickets Canjeados</h2>
            </div>
            <div class="w-1/6 bg-pink-300 p-3">
              <h1>{ticketNoCanjeados}</h1>
              <h2>Tickets No Canjeados</h2>
            </div>
          </div>
          <div class="w-full">
            <p class="text-blue font-medium text-xl mb-4">Tickets canjeados por hora</p>
            <div class="w-full">
              <Bar options={options} data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventStadistic;