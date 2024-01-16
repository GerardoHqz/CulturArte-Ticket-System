import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import eventimg from "../../assets/imgtemp.png";
import cocacola from "../../assets/cocacola.png";
import usaid from "../../assets/usaid.png";
import gruporoble from "../../assets/gruporoble.png";
import avianca from "../../assets/avianca.png";
import hora from "../../assets/Hora.png";
import calendario from "../../assets/calendario.png";
import ubicacion from "../../assets/ubicacion.png";
import SucessBuy from "./SucessBuy";

import { getUserByToken } from "../../services/Auth";
import { getEventById } from "../../services/Event";
import { getImageById } from "../../services/Image";
import { getTiersByEvent } from "../../services/Tier";
import { saveTicket } from "../../services/Ticket";
import { getAllSponsorToEventByEvent } from "../../services/SponsorToEvent";

const Tier = ({ selected, handleItemClick, tierId, tierName, tierPrice }) => {
  return (
    <div
      key={tierId}
      className={`justify-between text-center py-3 px-3 rounded cursor-pointer ${
        selected ? "bg-darkblue text-white" : "bg-white"
      }`}
      style={{ width: "10vw" }}
      onClick={() => {
        handleItemClick(tierId, tierPrice);
      }}
    >
      <p className="text-sm font-montserrat">{tierName}</p>
      <p className={`text-sm ${selected ? "text-white" : ""}`}>${tierPrice}</p>
    </div>
  );
};

const Sponsor = ({ sponsorId, sponsorName, imageId }) => {
  const [imageURL, setImageURL] = useState(""); // Estado para almacenar la URL de la imagen

  useEffect(() => {
    getImageById(imageId)
      .then((data) => {
        setImageURL(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div
      key={sponsorId}
      className='justify-between items-center text-center py-3 px-3 rounded h-2w-24 w-24'>
      <img alt={sponsorName} src={imageURL}/>
    </div>
  );
};

const EventBuyCard = () => {
  const [imageURL, setImageURL] = useState(""); // Estado para almacenar la URL de la imagen

  const [event, setEvent] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  const [FormatDate, setFormatDate] = useState("");
  const [FormatHour, setFormatHour] = useState("");

  const [tiers, setTiers] = useState([]);
  const [selectedTierPrice, setSelectedTierPrice] = useState(0.00);

  //Comprar ticket
  let date = new Date().toJSON().slice(0, 10);
  const [hour, setHour] = useState("");
  const [redeem, setRedeem] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState("");
  const [userId, setUserId] = useState([]);
  const eventId = localStorage.getItem("EventId");
  const [quantity, setQuantity] = useState(0);

  const token = localStorage.getItem("token");

  const handleTierClick = (tierId, tierPrice) => {
    setSelectedTierId(tierId);
    setSelectedTierPrice(tierPrice);
  };

  useEffect(() => {
    getTiersByEvent(eventId, token)
      .then((data) => {
        setTiers(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

      getAllSponsorToEventByEvent(eventId, token)
      .then((data) => {
        setSponsors(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

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

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyTicket = async () => {
    try {
      const response = await saveTicket(
        date,
        hour,
        redeem,
        selectedTierId,
        userId,
        eventId,
        quantity,
        token
      );
      console.log(response);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      const errorData = error.response.data; // Obtener los datos de error de la respuesta
      let errorMessage = "Error occurred";

      // Comprobar si hay errores específicos en los campos y agregarlos al mensaje de error
      if (errorData) {
        Object.keys(errorData).forEach((field) => {
          const fieldErrors = errorData[field];
          if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
            errorMessage += `\n${field}: ${fieldErrors.join(", ")}`;
          }
        });
      }

      // Mostrar el mensaje de error en el Toast
      toast.error(errorMessage);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  useEffect(() => {
    getUserByToken(token)
      .then((data) => {
        setUserId(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    getEventById(eventId, token)
      .then((data) => {
        setEvent(data);
        setFormatDate(`${data.date[2]} ${monthNames[data.date[1]]}`);
        setFormatHour(`${data.hour[0]}:${data.hour[1]}`);
        setHour(`${data.hour[0]}:${data.hour[1]}:00`);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (event && event.image && event.image.id) {
      getImageById(event.image.id)
        .then((data) => {
          setImageURL(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [event]);

  return (
    <div className="w-max bg-white shadow-lg rounded-lg py-6 font-montserrat">
      <Toaster />
      {showSuccess && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <SucessBuy handleCloseSuccess={handleCloseSuccess} />
        </div>
      )}
      <div className="flex justify-center w-screen">
        {/* Imagen */}
        <div className="w-3/12">
          <img
            src={imageURL}
            alt="Descripción de la imagen"
            className="w-auto h-auto object-cover rounded"
          />
        </div>

        {/* Línea gris */}
        <div className="w-1 border-r border-gray-300 mx-4"></div>

        {/* Contenido de texto */}
        <div className="flex flex-col justify-between align-top">
          <div>
            {/* Título */}
            <h1 className="font-bold text-3xl mb-2">{event.title}</h1>

            {/* Fecha */}
            <div className="flex items-center text-gray-600 mb-2">
              <img alt="calendar icon" src={calendario} className="h-6 w-6" />
              <span className="mr-2">
                <i className="icono-fecha"></i>
              </span>
              <span>{FormatDate}</span>
            </div>

            {/* Hora */}
            <div className="flex items-center text-gray-600 mb-2">
              <img alt="hour icon" src={hora} className="h-6 w-6" />
              <span className="mr-2">
                <i className="icono-hora"></i>
              </span>
              <span>{FormatHour}</span>
            </div>

            {/* Ubicación */}
            <div className="flex items-center text-gray-600 mb-4">
              <img alt="location icon" src={ubicacion} className="h-6 w-6" />
              <span className="mr-2">
                <i className="icono-ubicacion"></i>
              </span>
              <span>{event.place}</span>
            </div>

            {/* Descripción */}
            <p className="font-bold text-lg mb-2">
              <span className="shadow-sm">Descripción</span>
            </p>
            <p className="text-gray-700 mb-4">{event.description}</p>
          </div>

          {/* Patrocinadores */}
          <div className="mt-4">
            <p className="font-bold text-lg mb-2">Patrocinadores</p>
            {/* Imágenes de patrocinadores */}
            <div className="flex items-center space-x-2">
            {sponsors!=null &&  sponsors.map((sponsor) => (
                  <Sponsor
                    key={sponsor?.sponsorshipId}
                    sponsorId={sponsor?.sponsorshipId}
                    sponsorName={sponsor?.nameSponsorship}
                    imageId={sponsor?.logo}
                  />
                ))}
            </div>
          </div>

          {/* Compra */}
          <div className="mt-4">
            <p className="font-bold text-lg mb-2">Compra</p>
            {/* Tiers */}
            <div className="flex items-center space-x-2">
              <div className="mr-2 flex gap-3">
                {tiers!=null && tiers.map((tier) => (
                  <Tier
                    key={tier.tierId}
                    selected={tier.tierId === selectedTierId}
                    handleItemClick={handleTierClick}
                    tierId={tier.tierId}
                    tierName={tier.nameTier}
                    tierPrice={tier.price}
                  />
                ))}
              </div>
              {/* cantidad */}
              <div className="flex items-center">
                <p className="text-sm mb-0 mr-1">Cantidad:</p>
                <div className="flex items-center">
                  <button
                    className="bg-darkblue text-white px-1 py-0.5 rounded-l focus:outline-none"
                    onClick={handleQuantityDecrement}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    className="bg-white text-gray-700 px-0.5 py-0.5 w-6 text-center border-t border-b border-gray-300 focus:outline-none"
                    readOnly
                  />
                  <button
                    className="bg-darkblue text-white px-1 py-0.5 rounded-r focus:outline-none"
                    onClick={handleQuantityIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4">
            <p className="font-bold text-lg mb-2">
              Total: ${selectedTierPrice * quantity}
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-left space-x-2 mt-4">
            <button
              className="bg-darkblue text-white px-6 py-0.5 rounded"
              onClick={handleBuyTicket}
            >
              Comprar Ticket
            </button>
            <button className="bg-gray-700 text-white px-12 py-0.5 rounded">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBuyCard;
