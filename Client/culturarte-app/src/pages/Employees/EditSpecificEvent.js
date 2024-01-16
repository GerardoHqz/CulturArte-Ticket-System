import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import toast, { Toaster } from "react-hot-toast";
import { format, parseISO } from "date-fns";

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

import { saveTier } from "../../services/Tier";
import { saveSponsorToEvent } from "../../services/SponsorToEvent";
import { getEventById } from "../../services/Event";
import { getTiersByEvent } from "../../services/Tier";
import { getAllSponsorToEventByEvent } from "../../services/SponsorToEvent";
import { updateEvent } from "../../services/Event";
import e from "cors";

function EditSpecificEvent() {
  const params = useParams();

  const actualDate = new Date();
  const formatActualDate = actualDate.toISOString();

  const [sponsors, setSponsors] = useState([1]);
  const [messageApi, contextHolder] = message.useMessage();
  const [menuVisible, setMenuVisible] = useState(false);

  //Para encontrar el evento
  const [event, setEvent] = useState([]);

  //Para actualizar el evento
  const [place, setPlace] = useState(event.place);
  const [title, setTitle] = useState(event.title);
  const [involved, setInvolved] = useState(event.involved);
  const [description, setDescription] = useState(event.description);
  const [state, setState] = useState(true);
  const [duration, setDuration] = useState(300);
  const [selectedCategoryName, setSelectedCategoryName] = useState();
  const token = localStorage.getItem("token");

  //Para crear el tier
  const [tierName, setTierName] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [selectedEventIdTier, setSelectedEventIdTier] = useState("");

  //Para sponsor
  const [selectedEventIdSponsor, setSelectedEventIdSponsor] = useState("");
  const [selectedSponsorId, setSelectedSponsorId] = useState("");

  //Para obtener los tiers
  const [tiers, setTiers] = useState([]);
  //para obtener los sponsors
  const [sponsorsToEvent, setSponsorsToEvent] = useState([]);

  const [updateSponsorsList, setUpdateSponsorsList] = useState(false);
  const [updateCategoriesList, setUpdateCategoriesList] = useState(false);

  const handleUpdateSponsorsList = () => {
    setUpdateSponsorsList(prevState => !prevState);
  };
  const handleUpdateCategoriesList = () => {
    setUpdateCategoriesList(prevState => !prevState);
  };

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

  const getEvent = async () => {
    try {
      const response = await getEventById(params.eventId, token);
      setEvent(response);
      setSelectedCategoryName(event.category.name);
      console.log("id:" + params.id + " titulo:" + response.title);
    } catch (error) {
      console.error(error);
    }
  };

  const getTiers = async () => {
    try {
      const response = await getTiersByEvent(params.eventId, token);
      setTiers(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getSponsorsToEvent = async () => {
    try {
      const response = await getAllSponsorToEventByEvent(params.eventId, token);
      setSponsorsToEvent(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await updateEvent(
        place,
        title,
        involved,
        description,
        localStorage.getItem("Image"),
        localStorage.getItem("EventDate"),
        localStorage.getItem("EventHour"),
        state,
        duration,
        selectedCategoryName,
        token,
        params.eventId
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
    if(tierName || seats || price)
      handleAddTier()
    if(selectedSponsorId)
      handleAddSponsorToEvent()
  };

  const handleAddTier = async () => {
    try {
      const response = await saveTier(
        tierName,
        seats,
        price,
        params.eventId,
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
        params.eventId,
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

  useEffect(
    () => {
      getEvent(); // Obtener el evento al cargar el componente
      getTiers(); // Obtener los tiers al cargar el componente
      getSponsorsToEvent(); // Obtener los sponsors al cargar el componente
      setTitle(event.title);
      setPlace(event.place);
      setInvolved(event.involved);
      setDescription(event.description);
    },
    [event.title],
    [event.place],
    [event.involved],
    [event.description]
  );

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
          <span className="flex-grow text-center">Editar evento</span>
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
                value={title}
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
                value={place}
              />
            </div>
            <div class="my-3">
              <h2>Participantes</h2>
              <Input
                class="w-full"
                onChange={(e) => setInvolved(e.target.value)}
                value={involved}
              />
            </div>
            <div class="my-3 ">
              <h2>Categorias</h2>
              <div class="flex max-sm:flex-col max-sm:gap-3 justify-between gap-5 my-3 w-full">
                <div class="flex flex-col">
                  <SelectCategory 
                  selectCategories={selectCategories}/>
                </div>
                <NewCategory/>
              </div>
            </div>
            <div class="my-3">
              <h2>Descripción</h2>
              <Description
                setDescription={setDescription}
                value={description}
              />
            </div>

            <div>
              {contextHolder}
              <div class="my-3">
                <h2>Patrocinadores</h2>
              </div>
              <div class="flex max-sm:flex-col max-sm:gap-3 justify-between gap-5 my-3 w-full">
                <div class="flex flex-col">
                  <SelectSponsor
                    key={sponsors.id}
                    selectSponsors={selectSponsors}
                    updateSponsorsList={handleUpdateSponsorsList}
                  />
                  
                    {sponsorsToEvent && sponsorsToEvent.length > 0
                      ? sponsorsToEvent
                          .map((sponsor) => <li className="mb-2 ml-2">{sponsor.nameSponsorship}</li>)
                      : <p>No hay patrocinadores</p>
                    }
                </div>
                <NewSponsor updateSponsorsList={handleUpdateSponsorsList} />
              </div>
              <div></div>
              <div class="my-3">
                <h2>Tiers</h2>
              </div>
              <div class="flex max-sm:flex-col max-sm:gap-3 justify-between my-3 w-full">
                <div class="flex flex-col"></div>
                <div>
                  <div class="flex justify-between gap-5  w-full">
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
                  
                    {tiers && tiers.length > 0
                      ? tiers
                          .map(
                            (t) =>
                              <li className="mb-2 ml-2 grid grid-cols-3 grid-rows-1 justify-between">
                                <div>{t.nameTier}</div>
                                <div>Costo: ${t.price}</div> 
                                <div>cantidad: {t.amountSeant} entradas</div>
                                </li>
                          )
                      : "No hay tiers"}
                </div>
              </div>
              <div class="flex flex-col"></div>
              <Link to="/employee/editevent"
                onClick={handleUpdateEvent}
                className="btn bg-blue text-white w-50% h-14 px-4 py-2 my-6 rounded-md hover:bg-opacity-90"
              >
                Actualizar evento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSpecificEvent;
