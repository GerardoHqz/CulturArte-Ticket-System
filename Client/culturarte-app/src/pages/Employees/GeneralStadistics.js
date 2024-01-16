import React,  { useState, useEffect} from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import MenuEmployee from "../../components/MenuEmployee";
import Filter from "../../components/filter/Filter";
import AssignedEventsComp from "../../components/AssignedEvents";
import { Link } from 'react-router-dom'
import { format, parseISO } from "date-fns";

import { GetAllEvents, updateEvent } from "../../services/Event";
import { getAllUpcomingEvents } from "../../services/Event";
import { getAllUsers } from "../../services/User";
import { getPopularPlaces } from "../../services/Event";

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

Chart.register(ArcElement, Tooltip, Legend);

function GeneralStadistics() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bestPlace, setBestPlace] = useState([]);
  const [eventUpcoming,setEventUpcoming] = useState([]);
  const [manyUsers,setManyUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterOption, setFilterOption] = useState('1');
  const [chartData, setChartData] = useState(null);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  //Obtener eventos
  useEffect(() => {
    GetAllEvents()
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
          setFilteredEvents(data);
          console.log(data);

          const mostFrequencePlace = getMostFrequentPlace(data)
          setBestPlace(mostFrequencePlace);

          popularPlaces().then((data) => {
            setChartData(data);
          });

        } else {
          console.log('Error: No upcoming events found.');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    getAllUpcomingEvents()
      .then((data) => {
        if (data && data.length > 0) {
          setEventUpcoming(data.length)
          console.log(data.length);
        } else {
          setEventUpcoming(0);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    getAllUsers(localStorage.getItem("token"))
      .then((data) => {
        console.log(data);
        if(data && data.length > 0){
          setManyUsers(data.length);
        }else{
          setManyUsers(0);
        }
      })
  }, []);

  //Obtener el lugar donde mas eventos se realizaron
  const getMostFrequentPlace = (events) => {
    const places = events.map((event) => event.place);
    const placeFrequencies = {};
  
    places.forEach((place) => {
      if (placeFrequencies[place]) {
        placeFrequencies[place]++;
      } else {
        placeFrequencies[place] = 1;
      }
    });
  
    const sortedPlaces = Object.entries(placeFrequencies).sort(
      (a, b) => b[1] - a[1]
    );
  
    if (sortedPlaces.length > 0) {
      return sortedPlaces[0][0];
    } else {
      return '';
    }
  };
  
  //Obtener los 3 lugares donde mas eventos se realizaron
  const popularPlaces = async() => {
    const places = await getPopularPlaces(localStorage.getItem("token"));
    const labels = places.map((p) => p.place);
    const values = places.map((p) => p.count);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Lugares',
          data: values,
          backgroundColor: ['#408CAD', '#B686E5', '#FFD9A8'],
          borderColor: ['#408CAD', '#B686E5', '#FFD9A8'],
        },
      ],
    };

    return chartData;
  }

  //Para el filtro de eventos
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    let filtered = [];

    if (filterOption === '1') {
      filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchValue)
      );
    } else if (filterOption === '2') {
      filtered = events.filter((event) =>
        formatDate(event.date).includes(searchValue)
      );
    } else if (filterOption === '3') {
      filtered = events.filter((event) =>
        event.place.toLowerCase().includes(searchValue)
      );
    }

    setFilteredEvents(filtered);
  };

  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
    handleSearchChange({ target: { value: '' } }); // Limpiar el valor de búsqueda al cambiar la opción de filtro
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const formatHour = (hour) => {
    const parsedHour = parseISO(`2000-01-01T${hour}`);
    return format(parsedHour, 'h:mm a');
  };

  const data = {
    labels: ["Localidad 1", "Localidad 2", "Localidad 3"],
    datasets: [
      {
        label: "Localidades",
        data: [55, 25, 15],
        backgroundColor: ["#408CAD", "#B686E5", "#FFD9A8"],
        borderColor: ["#408CAD", "#B686E5", "#FFD9A8"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        margin: '10'
      },
    },
  };

  return (
    <div class="flex w-full">
      <div className="w-1/5 max-sm:w-0">
        <MenuEmployee/>
      </div>
      <div class="w-full mx-10 max-sm:mx-3 my-5 ml-60 sticky">
        <p class="text-2xl font-semibold text-blue text-center mb-2">
          Estadisticas
        </p>
        <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center pt-3">
        <AiOutlineMenu
          onClick={openMenu}
          className="sm:hidden mr-2"
          style={{ verticalAlign: "middle" }}
        />
        <span className="flex-grow text-center">Estadísticas generales</span>
        {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
      </h1>
        <hr class=" border-gray-300 mb-4" />
        <div class="w- full flex justify-around text-center items-center font-montserrat text-white">

          <div class="w-1/6 bg-purple-600 p-3">
            <h1>{manyUsers}</h1>
            <h2>Usuarios</h2>
          </div>
          <div class="w-1/6 bg-purple-600 p-3">
            <h1>{eventUpcoming}</h1>
            <h2>Eventos proximos</h2>
          </div>
          <div class="w-1/6 bg-purple-600 p-3">
            <h1>{bestPlace}</h1>
            <h2>Localidad mas popular</h2>
          </div>
        </div>
        <div class="w-1/2">
          <p class="text-blue font-medium text-xl ">Estadisticas por localidad</p>
          {chartData ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
        <p class="text-blue font-medium text-xl mb-4">Estadisticas por eventos</p>
        <hr class=" border-gray-300 mb-4" />
        <div class="my-2">
          <Filter 
            events={events} 
            filteredEvents={filteredEvents}
            handleSearchChange={handleSearchChange}
            handleFilterOptionChange={handleFilterOptionChange}
          />
        </div>
        <div>
          {filteredEvents.length > 0 ? ( 
            filteredEvents.map((event) => (
              <Link to={`/employee/stadistic/${event.eventId}`}>
                <AssignedEventsComp
                  key={event.eventId}
                  eventId={event.eventId}
                  image={event.image.id}
                  title={event.title}
                  date={formatDate(event.date)}
                  hour={formatHour(event.hour)}
                  location={event.place}
                  button="Estadisticas"
                />
              </Link>
            ))
          ) : (
            <p class="text-blue font-medium text-xl mb-6">No hay eventos disponibles.</p>
          )} 
        </div>
      </div>
    </div>
  );
}

export default GeneralStadistics;
