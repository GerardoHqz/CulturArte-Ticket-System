import React,  { useState, useEffect} from "react";
import MenuEmployee from "../../components/MenuEmployee";
import EditEventCard from "../../components/EditEventCard";
import Filter from "../../components/filter/Filter";
import { format, parseISO } from 'date-fns';

import { getAllUpcomingEvents } from "../../services/Event";

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

function ViewEditEvent({}) {
  const [events, setEvents] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterOption, setFilterOption] = useState('1');

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  useEffect(() => {
    getAllUpcomingEvents()
      .then((data) => {
        if (data.length > 0) {
          setEvents(data);
          setFilteredEvents(data);
          console.log("data event");
          console.log(data);
        } else {
          console.log('Error: No upcoming events found.');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

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

  return (
    <div className="flex flex-row font-montserrat">
      <div className="w-1/5 sticky max-sm:w-0">
        <MenuEmployee />
      </div>
      <div className="my-5 mx-60 max-sm:mx-5">
        {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
        <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center">
          <AiOutlineMenu
            onClick={openMenu}
            className="sm:hidden mr-2"
            style={{ verticalAlign: "middle" }}
          />
          <span className="flex-grow text-center">Editar Evento</span>
        </h1>
        <div class="w-full mt-5">
          <Filter 
            events={events} 
            filteredEvents={filteredEvents}
            handleSearchChange={handleSearchChange}
            handleFilterOptionChange={handleFilterOptionChange}
          />
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EditEventCard
                eventId={event.eventId}
                title={event.title}
                date={formatDate(event.date)}
                hour={formatHour(event.hour)}
                place={event.place}
                description={event.description}
                image={event.image.id}
                state={event.state}
                category={event.category.name}
              />
            ))
          ) : (
            <p class="text-blue font-medium text-xl mb-6">No hay eventos disponibles.</p>
          )}
        </div>    

      </div>
    </div>
  );
}

export default ViewEditEvent;
