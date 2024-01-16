import React, { useState, useEffect } from "react";
import MenuEmployee from "../../components/MenuEmployee";
import AssignedEventsComp from "../../components/AssignedEvents";
import Filter from "../../components/filter/Filter";
import { format, parseISO } from "date-fns";

import { getEventsByUser } from "../../services/UserToEvent";
import { getUserByEmail } from "../../services/Auth";

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

function AssignedEvents() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterOption, setFilterOption] = useState("1");

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const getEvents = async () => {
    try {
      const user = await getUserByEmail(localStorage.getItem("username"));
      const response = await getEventsByUser(
        user.userId,
        localStorage.getItem("token")
      );
      if (response.length > 0) {
        setEvents(response);
        setFilteredEvents(response);
      } else {
        console.log("Error: No events found.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    let filtered = [];

    if (filterOption === "1") {
      filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchValue)
      );
    } else if (filterOption === "2") {
      filtered = events.filter((event) =>
        formatDate(event.date).includes(searchValue)
      );
    } else if (filterOption === "3") {
      filtered = events.filter((event) =>
        event.place.toLowerCase().includes(searchValue)
      );
    }

    setFilteredEvents(filtered);
  };

  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
    handleSearchChange({ target: { value: "" } }); // Limpiar el valor de búsqueda al cambiar la opción de filtro
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const formatHour = (hour) => {
    const parsedHour = parseISO(`2000-01-01T${hour}`);
    return format(parsedHour, "h:mm a");
  };

  return (
    <div class="flex font-montserrat">
      <div className="w-1/5 ">
        <MenuEmployee />
      </div>
      <div class="w-screen mt-8 mx-12">
        <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center">
          <AiOutlineMenu
            onClick={openMenu}
            className="sm:hidden mr-2"
            style={{ verticalAlign: "middle" }}
          />
          <span className="flex-grow text-center">Eventos asignados</span>
          {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
        </h1>
        <p class="text-blue font-medium text-xl mb-6">Eventos</p>
        <hr class=" border-gray-300 mb-4" />
        <Filter
          events={events}
          filteredEvents={filteredEvents}
          handleSearchChange={handleSearchChange}
          handleFilterOptionChange={handleFilterOptionChange}
        />
        <div class="mt-8 flex flex-col gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <AssignedEventsComp
                key={event.eventId}
                eventId={event.eventId}
                image={event.image.id}
                title={event.title}
                date={formatDate(event.date)}
                hour={formatHour(event.hour)}
                location={event.place}
                button="Escaner ticket"
              />
            ))
          ) : (
            <p class="text-blue font-medium text-xl mb-6">
              No hay eventos asignados
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignedEvents;
