import React,  { useState, useEffect} from "react";
import MenuEmployee from "../../components/MenuEmployee";
import AssignedPersonalCard from "../../components/assigned_personal/AssignedPersonalCard";
import Filter from "../../components/filter/Filter";
import { format, parseISO } from 'date-fns';

import { AiOutlineMenu } from "react-icons/ai";

import { getAllUpcomingEvents } from "../../services/Event";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

function AssignStaff() {
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
        if(data.length > 0){
          setEvents(data);
          setFilteredEvents(data);
          console.log(data);
        } else {
          console.log('Error: No upcoming events found.');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [events]);

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
    <div className="flex font-montserrat justify-center">
      <div className="w-1/5 sticky max-sm:w-0">
        <MenuEmployee/>
      </div>

      <div className="w-4/5 mt-8 mx-12 max-sm:mx-3">
      <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center">
        <AiOutlineMenu
          onClick={openMenu}
          className="sm:hidden mr-2"
          style={{ verticalAlign: "middle" }}
        />
        <span className="flex-grow text-center">Asignar Personal</span>
        {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
      </h1>
        <p className="text-blue font-medium text-xl mb-6">Eventos</p>
        <hr className="border-gray-300 mb-4" />
        <Filter 
          events={events} 
          filteredEvents={filteredEvents}
          handleSearchChange={handleSearchChange}
          handleFilterOptionChange={handleFilterOptionChange}
        />
        <div className="mt-8 flex justify-center">
          <div className="max-w-screen-lg mx-auto">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <AssignedPersonalCard
                  eventId={event.eventId}
                  title={event.title}
                  date={formatDate(event.date)}
                  hour={formatHour(event.hour)}
                  place={event.place}
                  image={event.image.id}
                />
            ))
            ) : (
              <p class="text-blue font-medium text-xl mb-6">No hay eventos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignStaff;