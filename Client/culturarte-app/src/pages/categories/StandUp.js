import React, { useState, useEffect } from "react";
import axios from "axios";

import Menu from "../../components/menu/Menu";
import CategoryBanner from "../../components/CategoryBanner";
import EventCard from "../../components/EventCard";
import EventFilter from "../../components/EventFilter";
import Footer from "../../components/Footer";

import ResponsiveMenu from "../../components/menu/responsive/ResponsiveMenu";
import ResponsiveNav from "../../components/menu/responsive/ResponsiveNav";

import {
  getAllEventsByCategory,
  getAllPastEventsByCategory,
  getAllUpcomingEventsByCategory,
} from "../../services/Event";

function StandUp() {
  const [events, setEvents] = useState([]);
  const [optionSelected, setOptionSelected] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const option = (opt) => {
    setOptionSelected(opt);
  };

  const getEvents = (opt) => {
    opt("Stand up y Comedia")
      .then((data) => {
        const filteredEvents = data.filter((event) => event.state === true);
        setEvents(filteredEvents);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    getEvents(getAllEventsByCategory);
  }, []);

  const filter = () => {
    switch (optionSelected) {
      case 0:
        getEvents(getAllEventsByCategory);
        break;
      case 1:
        getEvents(getAllUpcomingEventsByCategory);
        break;
      case 2:
        getEvents(getAllPastEventsByCategory);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    filter();
  }, [optionSelected]);

  return (
    <div class="h-screen w-screen font-montserrat">
      <ResponsiveNav openMenu={openMenu} />
      <Menu />
      <CategoryBanner
        bgColor="#FF65D4"
        category="Stand up y Comedia"
        class="w-screen"
      />
      <div class="flex">
        {menuVisible && (
          <ResponsiveMenu option={option} closeMenu={closeMenu} />
        )}
        <EventFilter events={events} option={option} />
        <section class="bg-gray-300 flex gap-y-8 gap-x-24 flex-wrap pl-12 pt-10 pb-10 w-full max-sm:justify-center max-sm:pl-0">
          {events.lenght > 0 ? (events.map((event) => (
            <div
              class="cursor-pointer hover:scale-105 transition-transform"
              key={`${event.eventId}_event_card`}
            >
              <EventCard
                id={event.eventId}
                participants={event.involved}
                description={event.description}
                image={event.image.id}
                association={event.association}
                date={`${event.date[2]} ${monthNames[event.date[1]]}`}
                title={event.title}
                time={`${event.hour[0]}:${event.hour[1]}`}
                bgColor={event.category.color}
                category={event.category.name}
                location={event.place}
              />
            </div>
          ))
          ) : (
            <p class="text-blue font-medium text-xl mb-6">
              No hay eventos
            </p>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default StandUp;
