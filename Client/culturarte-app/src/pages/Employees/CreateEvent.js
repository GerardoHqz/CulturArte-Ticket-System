import React from "react";
import PromotionalImage from "../../components/create_events/PromotionalImage";
import MenuEmployee from "../../components/MenuEmployee";
import { Input, InputNumber, Button, message } from "antd";
import DatePicker from "../../components/create_events/DatePickerComponent";
import TimePicker from "../../components/create_events/TimePickerComponent";
import Description from "../../components/create_events/Description";
import NewCategory from "../../components/create_events/NewCategory";
import NewSponsor from "../../components/create_events/NewSponsor";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import SelectCategory from "../../components/create_events/SelectCategory";
import SelectSponsor from "../../components/create_events/SelectSponsors";
import SelectEvent from "../../components/create_events/SelectEvent";
import toast, { Toaster } from "react-hot-toast";

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

import { saveEvent } from "../../services/Event";
import { saveTier } from "../../services/Tier";
import { saveSponsorToEvent } from "../../services/SponsorToEvent";

function CreateEvent() {
  const actualDate = new Date();
  const formatActualDate = actualDate.toISOString();

  const [sponsors, setSponsors] = useState([1]);

  const [tierlist, setTierlist] = useState([1]);
  const [messageApi, contextHolder] = message.useMessage();

  const [menuVisible, setMenuVisible] = useState(false);

  //Para crear el evento
  const [place, setPlace] = useState("");
  const [title, setTitle] = useState("");
  const [involved, setInvolved] = useState("");
  const [description, setDescription] = useState("");
  const imageId = localStorage.getItem("Image");
  const date = localStorage.getItem("EventDate");
  const hour = localStorage.getItem("EventHour");
  const [state, setState] = useState(true);
  const [duration, setDuration] = useState(300);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const token = localStorage.getItem("token");

  //Para crear el tier
  const [tierName, setTierName] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [selectedEventIdTier, setSelectedEventIdTier] = useState("");

  //Para sponsor
  const [selectedEventIdSponsor, setSelectedEventIdSponsor] = useState("");
  const [selectedSponsorId, setSelectedSponsorId] = useState("");

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const selectSponsors = (sponsorId) => {
    setSelectedSponsorId(sponsorId);
  };

  const selectCategories = (categoryName) => {
    setSelectedCategoryName(categoryName);
  };

  const selectEventsForTier = (eventId) => {
    setSelectedEventIdTier(eventId);
  };

  const selectEventsForSponsor = (eventId) => {
    setSelectedEventIdSponsor(eventId);
  };

  const handleAddEvent = async () => {
    try {
      const response = await saveEvent(
        place,
        title,
        involved,
        description,
        imageId,
        date,
        hour,
        state,
        duration,
        selectedCategoryName,
        token
      );
      console.log(response);
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

  const handleAddTier = async () => {
    try {
      const response = await saveTier(
        tierName,
        seats,
        price,
        selectedEventIdTier,
        token
      );
      console.log(response);
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

  const handleAddSponsorToEvent = async () => {
    try {
      const response = await saveSponsorToEvent(
        selectedSponsorId,
        selectedEventIdSponsor,
        token
      );
      console.log(response);
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

  return (
    <div class="flex font-montserrat">
      <Toaster />
      <div className="w-1/5 sticky max-sm:w-0">
        <MenuEmployee />
      </div>
      <div className="my-5 max-sm:mx-5">
        <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center">
          <AiOutlineMenu
            onClick={openMenu}
            className="sm:hidden mr-2"
            style={{ verticalAlign: "middle" }}
          />
          <span className="flex-grow text-center">Crear evento</span>
          {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
        </h1>
        <div class="w-full max-sm:flex-col max-sm:gap-3 flex gap-32 my-10 justify-center max-sm:items-center">
          <div class="w-1/5 max-sm:w-4/5 my-3" style={{ height: "40vh" }}>
            <h2>Imagen promocional</h2>
            <PromotionalImage />
          </div>
          <div class="w-2/5 max-sm:w-4/5">
            <div class="my-3">
              <h2>Titulo</h2>
              <Input
                class="w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="flex max-sm:gap-3 justify-between gap-5 my-3 w-full">
              <div>
                <h2>fecha</h2>
                <DatePicker date={formatActualDate} />
              </div>
              <div>
                <h2>Hora</h2>
                <TimePicker />
              </div>
            </div>
            <div class="my-3">
              <h2>Lugar</h2>
              <Input
                class="w-full"
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div class="my-3">
              <h2>Participantes</h2>
              <Input
                class="w-full"
                onChange={(e) => setInvolved(e.target.value)}
              />
            </div>
            <div class="my-3 ">
              <h2>Categorias</h2>
              <div class="flex max-sm:flex-col max-sm:gap-3 justify-between gap-5 my-3 w-full">
                <div class="flex flex-col">
                  <SelectCategory selectCategories={selectCategories} />
                </div>
                <NewCategory />
              </div>
            </div>
            <div class="my-3">
              <h2>Descripción</h2>
              <Description setDescription={setDescription} />
            </div>

            <div>
              {contextHolder}
              <Button
                onClick={() => handleAddEvent()}
                className="btn bg-blue text-white w-50% max-sm:w-4/5 h-14 px-4 py-2 my-6 rounded-md hover:bg-opacity-90 font-montserrat text-lg"
              >
                Agregar evento
              </Button>
              <hr></hr>
              <span className="flex-grow text-center">
                Crear tiers para eventos
              </span>
              <div>
                <SelectEvent selectEvents={selectEventsForTier} />
                {tierlist.map(() => (
                  <div class="flex justify-between gap-5 my-3 w-full">
                    <div>
                      <h2>Nombre</h2>
                      <Input onChange={(e) => setTierName(e.target.value)} />
                    </div>
                    <div>
                      <h2>Precio</h2>
                      <Input
                        type="number"
                        min={0}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <h2>Cantidad</h2>
                      <Input
                        type="number"
                        min={1}
                        style={{ width: "100%" }}
                        onChange={(e) => setSeats(e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleAddTier}
                className="btn bg-blue text-white w-50% max-sm:w-4/5 h-14 px-4 py-2 my-6 rounded-md hover:bg-opacity-90 font-montserrat text-lg"
              >
                Agregar tier
              </Button>
              <hr></hr>
              <div class="my-3">
                <h2>Patrocinadores</h2>
              </div>
              <div class="flex max-sm:flex-col max-sm:gap-3 justify-between gap-5 my-3 w-full">
                <div class="flex flex-col">
                  <SelectEvent selectEvents={selectEventsForSponsor} />
                  <SelectSponsor
                    key={sponsors.id}
                    selectSponsors={selectSponsors}
                  />
                </div>
                <NewSponsor />
              </div>
              <Button
                onClick={handleAddSponsorToEvent}
                className="btn bg-blue text-white w-50% max-sm:w-4/5 h-14 px-4 py-2 my-6 rounded-md hover:bg-opacity-90 font-montserrat text-lg"
              >
                Agregar sponsor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
