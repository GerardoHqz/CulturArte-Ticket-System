import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/Footer";
import EventCard from "../../components/EventCard";
import ReedemTicket from "../../components/redeemTicket/redeemTicket";
import TransferTicket from "../../components/transfer_ticket/TransferTicket";

import ResponsiveNav from "../../components/menu/responsive/ResponsiveNav";
import ResponsiveUserMenu from "../../components/menu/responsive/ResponsiveUserMenu";

import { getAllTicketsByUser } from "../../services/Ticket";
import EventTicket from "../../components/EventTicket";

function RedeemTicket() {
  const token = localStorage.getItem("token");

  const [showQr, setShowQr] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  const [clickedEvent, setClickedEvent] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  var [tickets, setTickets] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    getAllTicketsByUser(page, size, token)
      .then((data) => {
        setTickets(data);
        console.log(tickets);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [size, showTransfer]);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
    console.log(menuVisible);
  };

  const handleHideComponents = () => {
    //funcion para cerrar el componente
    setShowQr(false);
    setShowTransfer(false);
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

  const handleClickEvent = (key) => {
    //almacena el evento al que se ha dado click

    tickets.map((ticket) => {
      if (ticket.ticketId == key) {
        setClickedEvent(ticket);
      }
    });

    console.log(clickedEvent);
    console.log(showTransfer);
  };

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
            Mis tickets
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
                  date={`${ticket.event.date[2]} ${
                    monthNames[ticket.event.date[1]]
                  }`}
                  title={ticket.event.title}
                  seat={ticket.seat}
                  time={`${ticket.event.hour[0]}:${ticket.event.hour[1]}`}
                  bgColor={ticket.event.category.color}
                  category={ticket.event.category.name}
                  location={ticket.event.place}
                />
                <div class="w-full h-max bg-none flex flex-col justify-center shadow-md items-center ">
                  <div class="w-full">
                    <div class="w-full my-3 flex justify-center">
                      <button
                        class="font-montserrat bg-orange w-90% text-white p-2 shadow-md cursor-pointer hover:scale-105 hover:ml-2 hover:mr-2 transition-transform"
                        onClick={() => {
                          setShowQr(true);
                          handleClickEvent(ticket.ticketId);
                        }}
                      >
                        Canjear Ticket
                      </button>
                    </div>
                    <div class="w-full my-3 flex justify-center">
                      <button
                        class="font-montserrat bg-yellow text-white w-90% p-2 shadow-md cursor-pointer hover:scale-105 hover:ml-2 hover:mr-2 transition-transform"
                        onClick={() => {
                          setShowTransfer(true);
                          handleClickEvent(ticket.ticketId);
                        }}
                      >
                        Transferir ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {showQr && (
              <ReedemTicket
                oncloseClick={handleHideComponents} //se manda al componente la funcion para dejar de mostrar
                title={clickedEvent.event.title}
                id={clickedEvent.ticketId}
              />
            )}
            {showTransfer && (
              <div class="w-full mb-2">
                <TransferTicket
                  id={clickedEvent.ticketId}
                  image={clickedEvent.event.image.id}
                  title={clickedEvent.event.title}
                  date={`${clickedEvent.event.date[2]} ${
                    monthNames[clickedEvent.event.date[1]]
                  }`}
                  time={`${clickedEvent.event.hour[0]}:${clickedEvent.event.hour[1]}`}
                  location={clickedEvent.event.place}
                  bgColor={clickedEvent.event.category.color}
                  category={clickedEvent.event.category.name}
                  quantity="1"
                  total={clickedEvent.tier.price}
                  oncloseClick={handleHideComponents}
                />
              </div>
            )}
          </div>
          <button className="bg-orange rounded-md p-3 text-white shadow-md w-11/12 ml-10 hover:bg-red-400" onClick={() => setSize(size+10)}>Cargar más</button>
        </div>
      </div>
    </div>
  );
}

export default RedeemTicket;
