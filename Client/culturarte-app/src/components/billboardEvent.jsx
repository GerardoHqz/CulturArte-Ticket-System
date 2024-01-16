import React, { useState } from "react";
import bgImageleft from '../assets/decorationbgL.png'
import bgImageright from '../assets/decorationbgR.png'

function BillboardEvent() {
  const billboardEventsList = [ //list of billboard events
    {
      image:
        "https://www.cultura.gob.sv/wp-content/uploads/2020/12/Serenata-de-Tchaikovsky-son%C3%B3-en-el-Teatro-Nacional-de-San-Salvador.jpg",
      name: "Orquesta Sinfonica",
      category: "Musica",
      color: "#0B6085"
    },
    {
      image:
        "https://www.cultura.gob.sv/wp-content/uploads/2021/07/BFN-1-0-1024x683.jpg",
      name: "Danza Florklorica",
      category: "Danza",
      color: "#B686E5"
    },
    {
      image:
        "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFuemElMjBjb250ZW1wb3IlQzMlQTFuZWF8ZW58MHx8MHx8&w=1000&q=80",
      name: "Danza Contemporanea",
      category: "Danza",
      color: "#B686E5"
    },
  ];

  const BillboardEventItem = ({ event }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <div
        className="relative font-montserrat h-[60vh]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative overflow-hidden w-full h-[60vh]"
          style={{ height: "60vh" }}
        >
          <img
            src={event.image}
            alt="image event"
            className={`absolute inset-0 object-cover w-full h-full ${
              isHovered ? "transform scale-105" : "transform scale-100"
            } transition-transform duration-300`}
          />
        </div>
        <div
          className={`absolute ${
            isHovered ? "h-full bottom-0 flex flex-col justify-center items-center" : "bottom-0"
          } bg-black bg-opacity-80 w-full p-5`}
        >
          <h3 className="text-white pb-5">{event.name}</h3>
          <p
            className="w-max px-4 py-1 bg-opacity-50 text-white rounded-full font-montserrat"
            style={{ backgroundColor: event.color }}
          >
            {event.category}
          </p>
        </div>
      </div>
    );
  };
  

  return (
    <div className="w-full bg-billboard relative">
      <img src={bgImageleft} alt="" className="absolute z-0 top-0 left-0" />
      <h1 className="text-white text-5xl font-montserrat font-medium pl-32 pt-20">Cartelera</h1>
      <div className="grid px-32 pt-20 pb-28 grid-cols-3 gap-20">
        {billboardEventsList.map((event) => (
          <BillboardEventItem key={event.name} event={event} />
        ))}
      </div>
      <img src={bgImageright} alt="" className="absolute z-0 bottom-0 right-0" />
    </div>
  );
  
  
}

export default BillboardEvent;
