import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/Footer";
import EventCard from "../../components/EventCard";

import ResponsiveNav from "../../components/menu/responsive/ResponsiveNav";
import ResponsiveUserMenu from "../../components/menu/responsive/ResponsiveUserMenu";

import { getPastTicketsByUser } from "../../services/Ticket";
import EventTicket from "../../components/EventTicket";

function PastEventsUser() {
  const token = localStorage.getItem("token");
  const [menuVisible, setMenuVisible] = useState(false);

  var [tickets, setTickets] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setZize] = useState(10);

  useEffect(() => {
    getPastTicketsByUser(page, size, token)
      .then((data) => {
        setTickets(data);
        console.log(tickets)
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
    console.log(menuVisible)
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

  return (
    <div>
      <Menu />
      <div class="flex w-full max-sm:flex-col">
      <ResponsiveNav openMenu={openMenu} />
        <div>
          <UserMenu />
        </div>
        <div class="w-full">
          <h1 class="text-center font-Montserrat text-orange font-medium text-2xl">
            Eventos pasados
          </h1>
          {menuVisible && <ResponsiveUserMenu closeMenu={closeMenu} />}
          <div class="flex flex-wrap mx-16 my-14 gap-10 justify-between max-sm:mx-6">
          {tickets.map((ticket) => (
              <div key={`${ticket.ticketId}_ticket_card`}>
                <EventTicket
                  id={ticket.event.ticketId}
                  participants={ticket.event.involved}
                  description={ticket.event.description}
                  image={ticket.event.image.id}
                  association={ticket.event.association}
                  date={`${ticket.event.date[2]} ${monthNames[ticket.event.date[1]]}`}
                  title={ticket.event.title}
                  seat={ticket.seat}
                  time={`${ticket.event.hour[0]}:${ticket.event.hour[1]}`}
                  bgColor={ticket.event.category.color}
                  category={ticket.event.category.name}
                  location={ticket.event.place}
                />
                </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastEventsUser;
