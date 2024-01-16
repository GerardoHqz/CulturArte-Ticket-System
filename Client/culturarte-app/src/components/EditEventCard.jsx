import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllSponsorToEventByEvent } from "../services/SponsorToEvent";
import { getTiersByEvent } from "../services/Tier";
import { toggleEvent } from "../services/Event";

import { getImageById } from '../services/Image';

const EditEventCard = (props) => {
  const { eventId, place, title, image, date, hour, state, category, description } = props;

  const [archived, setArchived] = useState(!state);
  const [isArchived, setIsArchived] = useState(archived);
  const [sponsors, setSponsors] = useState([]);
  const [tiers, setTiers] = useState([]);

  const [imageURL, setImageURL] = useState(""); // Estado para almacenar la URL de la imagen

  useEffect(() => {
    getImageById(image)
      .then((data) => {
        setImageURL(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const getSponsorsByEvent = async () => {
    try {
      const response = await getAllSponsorToEventByEvent(eventId, localStorage.getItem("token"));
      setSponsors(response);
    } catch (error) {
      console.error("Error al obtener los patrocinadores:", error);
    }
  };

  const getTiers = async () => {
    try {
      const response = await getTiersByEvent(eventId, localStorage.getItem("token"));
      console.log(response);
      if (response) {
        setTiers(response);
      } else {
        setTiers([]);
      }
    } catch (error) {
      console.error("Error al obtener los tiers:", error);
    }
  };

  const handleToggle = async () => {
    try {
      const response = await toggleEvent(eventId, localStorage.getItem("token"));
      console.log(response);
    } catch (error) {
      console.error("Error al cambiar el estado del evento:", error);
    }
  };

  const handleArchive = async () => {
    setArchived(!archived);
    try {
      const response = await toggleEvent(eventId, localStorage.getItem("token"));
      console.log(response);
      setIsArchived(!isArchived);
    } catch (error) {
      console.error("Error al cambiar el estado del evento:", error);
    }
  };

  useEffect(() => {
    getSponsorsByEvent();
    getTiers();
    setIsArchived(archived);
  }, [archived]);

  return (
    <div className="relative w-3/4 p-5 pb-10 bg-white rounded-lg shadow-lg sm:w-full my-5">
      <div className="flex flex-col sm:flex-row">
        <div className="flex items-start w-32 h-32 sm:w-40 sm:h-40 sm: items-center">
          <img src={imageURL} alt="Event Poster" className="w-full h-full object-contain rounded-lg" />
        </div>
        <div className="flex-grow p-2">
          <h6 className="text-sm font-bold">
            Titulo: <span className="font-normal text-sm">{title}</span>
          </h6>
          <h6 className="text-sm font-bold">
            Fecha y hora: <span className="font-normal text-sm">{date} {hour}</span>
          </h6>
          <h6 className="text-sm font-bold">
            Direccion: <span className="font-normal text-sm">{place}</span>
          </h6>
          <h6 className="text-sm font-bold">
            Categoria: <span className="font-normal text-sm">{category}</span>
          </h6>
          <h6 className="text-sm font-bold">
            Descripcion: <span className="font-normal text-sm">{description}</span>
          </h6>
          <h6 className="text-sm font-bold">
            Patrocinadores: <span className="font-normal text-sm">
              {sponsors && sponsors.length > 0
                ? sponsors.map((sponsor) => sponsor?.nameSponsorship).join(", ")
                : "No hay patrocinadores"}
            </span>
          </h6>
          <h6 className="text-sm font-bold">
            Tiers: <span className="font-normal text-sm">
              {tiers && tiers.length > 0
                ? tiers.map((t) => `${t.nameTier} $${t.price} cantidad: ${t.amountSeant}`).join(", ")
                : "No hay tiers"}
            </span>
          </h6>
        </div>

        {archived && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10 rounded-lg overflow-hidden">
            <div>
              <p className="text-center text-white bg-red-700 transform rotate-archived p-2 w-1/3 absolute top-5  right-0 translate-x-14">
                Archivado
              </p>
            </div>

          </div>
        )}
        <div className="absolute bottom-3 left-0 ml-2 mb-0 z-20 flex items-center mt-1">
          <Link to={`/employee/edit/${eventId}`}>
            <button className="bg-blue-500 text-white  bg-blue px-4 py-2 rounded mr-2 text-sm">
              Editar
            </button>
          </Link>
          <button
            className={`px-4 py-2 rounded ${archived ? "bg-green-500 text-white" : "bg-gray-400"} text-sm`}
            onClick={handleArchive}
          >
            {archived ? "Archivado" : "Archivar"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default EditEventCard;
