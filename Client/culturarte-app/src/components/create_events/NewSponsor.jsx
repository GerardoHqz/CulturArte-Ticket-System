import React, { useRef, useEffect } from "react";
import { ColorPicker } from "antd";
import { Input } from "antd";
import { useMemo, useState } from "react";
import PromotionalImage from "./PromotionalImage";
import { toast, Toaster } from "react-hot-toast";

import { saveSponsorship } from "../../services/Sponsor";

const NewSponsor = ({ updateSponsorsList }) => {
  // const [showPicker, setShowPicker] = useState(false);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");


  const handleAddSponsor = async () => {
    try {
      const imageId = localStorage.getItem("Image");
      const response = await saveSponsorship(name, imageId, token);
      console.log(response)
      updateSponsorsList();
      setShow(false);

    } catch (error) {
        let errorMessage = "Error occurred";
        const errorData = error.response.data;
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
    <div>
      <Toaster />
      <div>
        <button
          className="btn border border-grayborder text-grayborder px-4 py-2 rounded-md hover:bg-grayborder hover:text-white w-14vw max-sm:w-4/5"
          onClick={() => setShow(true)}
        >
          Agregrar nuevo patrocinador
        </button>
      </div>
      <div>
        {show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white w-1/5 rounded-md shadow-lg py-6 px-10">
              <h2 className="text-2xl text-center font-semibold mb-4 text-blue font-montserrat">
                Nuevo patrocinador
              </h2>
              <div class="flex flex-col">
                <div>
                  <h2 className="font-montserrat">Nombre</h2>
                  <Input onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="my-5 ">
                  <h2 className="font-montserrat">Logo patrocinador</h2>
                  <PromotionalImage />
                </div>
              </div>
              <button
                className="btn bg-blue text-white font-montserrat px-4 py-2 mr-1 rounded hover:bg-opacity-90 "
                onClick={() => {
                  handleAddSponsor();
                }}
              >
                Agregar
              </button>
              <button
                className="btn bg-grayborder text-white font-montserrat px-4 py-2 ml-1 rounded hover:bg-opacity-90 "
                onClick={() => {
                  setShow(false);
                  localStorage.removeItem("Image");
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewSponsor;
