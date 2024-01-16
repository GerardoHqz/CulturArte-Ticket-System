import React, { useEffect, useState } from "react";
import { MdLocationPin, MdCalendarMonth } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import ConfirmTransfer from "../transfer_ticket/ConfirmTransfer";
import SuccessTransfer from "../transfer_ticket/SuccessTransfer";
import ErrorTransfer from "../transfer_ticket/ErrorTransfer";
import successLogo from "../../assets/success-transfer.png";
import failLogo from "../../assets/error-transfer.png";
import { Toaster, toast } from "react-hot-toast";

import { confirmTransfer } from "../../services/Transfer";
import { saveTransfer } from "../../services/Transfer";

import Category from "../Category";
import { getImageById } from "../../services/Image";
const token = localStorage.getItem("token");

function TransferTicket({
  id,
  image,
  title,
  date,
  time,
  location,
  bgColor,
  category,
  quantity,
  total,
  oncloseClick,
}) {
  const [component, setComponent] = useState("email");
  const [emailTransfer, setEmailTransfer] = useState("");
  const [imageURL, setImageURL] = useState(""); // Estado para almacenar la URL de la imagen
  const [code, setCode] = useState("");

  var currentdate = new Date();
  var datetime = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}    ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  useEffect(() => {
    getImageById(image)
      .then((data) => {
        setImageURL(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleVerifyTransfer = async () => {
    try {
      const response = await confirmTransfer(id, emailTransfer, token);
      console.log(response);
      setComponent("Confirmation");
    } catch (error) {
      console.error(error);
      const errorData = error; // Obtener los datos de error de la respuesta
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

  const handleTransfer = () => {
    if (code == localStorage.getItem("VerifyTransfer")) {
      saveTransfer(id, emailTransfer, token)
        .then((data) => {
          console.log(data);
          setComponent("sucess");
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(error.message);
        });
    } else {
      toast.error("Wrong code");
      setComponent("error");
    }
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <Toaster />
      <div class="flex justify-center items-center w-full">
        {component == "email" && (
          <div class="bg-transparent p-8 flex w-3/5">
            <div class="bg-white h-full rounded-md w-full">
              <div class="px-10 pb-5">
                <p class="font-semibold text-2xl text-center pt-5 pb-3">
                  Transferencia de ticket
                </p>
                <label class="mx-5 font-montserrat">
                  Dirección e-mail a enviar:
                </label>
                <input
                  class="border-solid border-2 border-gray-400 p-1 ml-5 rounded-md w-90%"
                  onChange={(e) => setEmailTransfer(e.target.value)}
                />
                <p class="ml-5 -mb-4 mt-3 text-sm font-montserrat">
                  Ticket a transferir:
                </p>
                <div class="flex m-4 ml-5 solid border-2 border-gray-200 shadow-md rounded-sm items-center w-11/12">
                  <img
                    src={imageURL}
                    class="w-52 h-52 mx-4 my-5 object-cover"
                    alt="Event logo"
                  />
                  <div class="flex flex-col mx-4 my-5 gap-y-3 w-2/5">
                    <p class="font-semibold text-xl font-montserrat">{title}</p>
                    <p class="flex items-center font-medium font-montserrat">
                      {" "}
                      <MdCalendarMonth size={25} class="mr-3" /> {date}
                    </p>
                    <p class="flex items-center font-medium font-montserrat">
                      {" "}
                      <AiOutlineClockCircle size={25} class="mr-3" /> {time}
                    </p>
                    <p class="flex items-center font-medium font-montserrat">
                      {" "}
                      <MdLocationPin size={25} class="mr-3" /> {location}
                    </p>
                    <Category bgColor={bgColor} category={category} />
                    <div class="w-full flex justify-between font-medium font-montserrat">
                      <p>Cantidad: {quantity}</p>
                      <p>Total: ${total}</p>
                    </div>
                  </div>
                </div>
                <button
                  class="bg-darkblue text-white p-2 ml-5 m-4 mt-0 rounded-md w-11/12 hover:bg-blue-900 cursor-pointer"
                  onClick={() => {
                    handleVerifyTransfer();
                  }}
                >
                  Transferir ticket
                </button>
              </div>
            </div>
            <ImCross
              class="ml-3 cursor-pointer"
              onClick={() => {
                oncloseClick();
              }}
            />
          </div>
        )}

        {component == "Confirmation" && (
          <div class="bg-transparent p-8 flex">
            <div class="bg-white w-fit h-fit rounded-md flex flex-col items-center px-9 py-4 gap-y-2">
              <p class="font-semibold text-2xl text-center pt-5 pb-3 font-montserrat">
                Transferencia de ticket
              </p>
              <label class="mx-5 font-montserrat">
                Ingrese el código de confirmación enviado a su email:
              </label>
              <input
                class="border-solid border-2 border-gray-400 m-4 p-1 rounded-md w-11/12"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <button
                class="bg-darkblue text-white p-2 m-4 mt-0 rounded-md w-11/12 hover:bg-blue-900 cursor-pointer"
                onClick={() => {
                  handleTransfer();
                }}
              >
                Verificar
              </button>
            </div>

            <ImCross
              class="ml-3 cursor-pointer"
              onClick={() => {
                oncloseClick(); // Llama a la función para ocultar los componentes en RedeemTicket
              }}
            />
          </div>
        )}

        {component == "sucess" && (
          <div class="bg-transparent p-8 flex">
            <div class="bg-white w-fit h-fit rounded-md flex flex-col items-center px-9 py-4 gap-y-2">
              <p class="font-semibold text-2xl text-center pt-5 pb-3 font-montserrat">
                ¡Transferencia realizada con éxito!
              </p>
              <img
                class="h-60 w-60 m-8 mt-4"
                src={successLogo}
                alt="success logo"
              />
              <p>Transferido a: {emailTransfer}</p>
              <p class="text-gray-500 font-montserrat">{datetime}</p>
            </div>
            <ImCross
              class="ml-3 cursor-pointer"
              onClick={() => {
                oncloseClick(); // Llama a la función para ocultar los componentes en RedeemTicket
              }}
            />
          </div>
        )}

        {component == "error" && (
          <div class="bg-transparent p-8 flex">
            <div class="bg-white w-fit h-fit rounded-md flex flex-col items-center px-9 py-4 gap-y-2">
              <p class="font-semibold text-2xl text-center pt-5 font-montserrat">
                ¡Error!
              </p>
              <p>Código inválido</p>
              <img
                class="h-60 w-60 m-8 mt-4"
                src={failLogo}
                alt="success logo"
              />
            </div>
            <ImCross
              class="ml-3 cursor-pointer"
              onClick={() => {
                oncloseClick(); // Llama a la función para ocultar los componentes en RedeemTicket
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferTicket;
