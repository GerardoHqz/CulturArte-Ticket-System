import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/Footer";
import EventTicket from "../../components/EventTicket";

import ResponsiveNav from "../../components/menu/responsive/ResponsiveNav";
import ResponsiveUserMenu from "../../components/menu/responsive/ResponsiveUserMenu";

import { getTransfersByUser } from "../../services/Transfer";

function TransferredTickets() {
  const token = localStorage.getItem("token");

  const [tickets, setTickets] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

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

  useEffect(() => {
    getTransfersByUser(token)
      .then((data) => {
        setTickets(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const formatDate = (date) => {
    const dateformat = new Date(date);
    return `${dateformat.getDate()}/${(dateformat.getMonth()+1)}/${dateformat.getFullYear()}    ${dateformat.getHours()}:${dateformat.getMinutes()}:${dateformat.getSeconds()}`
  }

  return (
    <div>
      <Menu />
      <div class="flex w-full max-sm:flex-col">
      <ResponsiveNav openMenu={openMenu} />
        <div div="w-full">
          <UserMenu />
        </div>
        <div class="w-full">
          <h1 class="text-center font-Montserrat text-orange font-medium text-2xl">
            Tickets transferidos
          </h1>
          {menuVisible && <ResponsiveUserMenu closeMenu={closeMenu} />}
          <div class="flex flex-wrap mx-16 my-14 gap-10 justify-between max-sm:mx-6">
            {tickets.map((ticket) => (
                <div key={ticket.ticketId.ticketId}>
              <EventTicket
                  id={ticket.ticketId.event.ticketId}
                  participants={ticket.ticketId.event.involved}
                  description={ticket.ticketId.event.description}
                  image={ticket.ticketId.event.image.id}
                  association={ticket.ticketId.event.association}
                  date={`${ticket.ticketId.event.date[2]} ${
                    monthNames[ticket.ticketId.event.date[1]]
                  }`}
                  title={ticket.ticketId.event.title}
                  seat={ticket.ticketId.seat}
                  time={`${ticket.ticketId.event.hour[0]}:${ticket.ticketId.event.hour[1]}`}
                  bgColor={ticket.ticketId.event.category.color}
                  category={ticket.ticketId.event.category.name}
                  location={ticket.ticketId.event.place}
                />
              <div class="w-80 h-max bg-none shadow-md">
                <p class="font-montserrat p-4 pb-1 text-blue"> Transferido a: {ticket.userId.username}</p>
                <p class="font-montserrat p-4 pt-1 text-gray-600">{formatDate(ticket.dateTransfer)}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferredTickets;