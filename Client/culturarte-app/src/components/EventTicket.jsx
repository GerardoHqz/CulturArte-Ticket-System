import React, { useEffect, useState } from "react";
import Category from "./Category";
import EventBuyCard from "./buy_tickets/EventBuyCard";
import { MdLocationPin } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

import { getImageById } from "../services/Image";

function EventTicket(params) {
  const location = useLocation();
  const [imageURL, setImageURL] = useState(""); // Estado para almacenar la URL de la imagen

  useEffect(() => {
    getImageById(params.image)
      .then((data) => {
        setImageURL(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const card = {
    id: params.id,
    image: imageURL,
    association: params.association,
    date: params.date,
    title: params.title,
    seat: params.seat,
    description: params.description,
    time: params.time,
    category: params.category,
    location: params.location
  };

  useEffect(() => {
    localStorage.setItem("eventTicketCard", JSON.stringify(card));
  }, [card]);

  return (
    <Link to="/user/buytickets">
      <div class="w-80 h-max bg-none shadow-md" key={params}>
        <img src={imageURL} alt="Event logo" class="w-96 h-48 rounded" />
        <p class="bg-zinc-800 text-sm p-2 text-white font-montserrat">
          {params.participants}
          {params.association}
        </p>
        <div class="flex bg-white rounded-b-xl">
          <p class=" border-r-2 text-center font-semibold pr-2 mx-2 my-2 font-montserrat">
            {params.date}
          </p>
          <div class="my-2 mx-1 gap-y-3 flex flex-col">
            <p class="font-semibold font-montserrat">{params.title}</p>
            <p class="font-semibold font-montserrat">Seat: {params.seat}</p>
            <p class="font-extralight font-montserrat">{params.time}</p>
            <Category bgColor={params.bgColor} category={params.category} />
            <p class="flex items-center font-extralight font-montserrat">
              <MdLocationPin size={25} class="mr-3" /> {params.location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventTicket;