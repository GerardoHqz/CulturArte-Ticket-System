import React, { useState, useEffect } from "react";
import axios from "axios";

import Menu from "../components/menu/Menu";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import pastEvent from "../assets/pastEvent.png";
import imgEvent from "../assets/imgEvetn.png";
import CategoryBanner from "../components/CategoryBanner";

import ResponsiveNav from "../components/menu/responsive/ResponsiveNav";
import ResponsiveMenuNoFilters from "../components/menu/responsive/ResponsiveMenuNoFilters";

import { getAllPastEvents } from "../services/Event";

function PastEvents() {

  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    getAllPastEvents()
      .then((data) => {
        const filteredEvents = data.filter((event) => event.state === true);
        setEvents(filteredEvents);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  return (
    <div class="h-screen w-screen font-montserrat">
      <ResponsiveNav openMenu={openMenu} />
      <Menu />
      <div className="w-full h-auto">
        <CategoryBanner
          bgColor="#FFA6FC"
          category="Eventos pasados"
          class="w-screen"
        />
      </div>
      <div class="flex w-full">
        {menuVisible && <ResponsiveMenuNoFilters closeMenu={closeMenu} />}
        <section class="flex flex-wrap py-8 gap-10 justify-start bg-gray-300 w-screen px-8">
        {events.lenght > 0 ? (events.map((event) => (
            <div class="cursor-pointer hover:scale-105 transition-transform" key={`${event.eventId}_event_card`}>
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

export default PastEvents;
