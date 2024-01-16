import React, { useEffect } from "react";
import qrCode from "../../assets/imgQR.png";
import { useState } from "react";
import ticketOK from "../../assets/redeemTicket/imgRedeemOk.png";
import ticketError from "../../assets/redeemTicket/imgRedeemError.png"; 
import QRCode from "react-qr-code";
import { createQRCode } from "../../services/QrCode";


function TicketCard(props) {
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState("canjear"); //para escoger que elemento mostrar despues de escanear
  const [QRid, setQRid] = useState(null);

  function statusHandler(param) {
    //verificar si el escaneo se realizo o sucedio un error
    setStatus(param);
  }

  useEffect(() => {
    createQRCode(true, props.id, token).then((res) => {
      setQRid(res);
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div class="flex justify-center items-center w-full">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {status == "canjear" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-6 bg-white rounded-lg shadow-lg z-50">
            <button
              className="absolute top-2 right-2 text-gray-500 "
              onClick={() => {
                props.oncloseClick(); //oncloseClick esta en TansferTicket y es el que oculta las ventanas emergentes
              }}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 10l3.647-3.646a1 1 0 1 0-1.414-1.414L8.879 8.586 5.232 4.939A1 1 0 1 0 3.818 6.354L7.465 10l-3.647 3.646a1 1 0 0 0 1.414 1.414L8.879 11.414l3.647 3.646a1 1 0 0 0 1.414-1.414L10.293 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2
              className="text-2xl font-bold mb-4 text-center"
              onClick={() => statusHandler("error")}
            >
              {/* status error: muestra el componente de error */}
              Canjear Ticket
            </h2>
            <h3 className="text-lg mb-6 text-center italic font-montserrat">"{props.title}"</h3>
            {QRid && <QRCode value={QRid}/>}
          </div>
        )}
        {status == "ok" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-6 bg-white rounded-lg shadow-lg z-50">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => {
                props.oncloseClick(); //cierra el componente
              }}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 10l3.647-3.646a1 1 0 1 0-1.414-1.414L8.879 8.586 5.232 4.939A1 1 0 1 0 3.818 6.354L7.465 10l-3.647 3.646a1 1 0 0 0 1.414 1.414L8.879 11.414l3.647 3.646a1 1 0 0 0 1.414-1.414L10.293 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center italic">
              "{props.title}"
            </h2>
            <h3 className="text-lg mb-6 text-center font-montserrat">¡Disfrute del evento!</h3>
            <img className="mx-auto" src={ticketOK} alt="Redeem ticket OK" />
          </div>
        )}
        {status == "error" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-6 bg-white rounded-lg shadow-lg z-50">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => {
                props.oncloseClick();
              }}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 10l3.647-3.646a1 1 0 1 0-1.414-1.414L8.879 8.586 5.232 4.939A1 1 0 1 0 3.818 6.354L7.465 10l-3.647 3.646a1 1 0 0 0 1.414 1.414L8.879 11.414l3.647 3.646a1 1 0 0 0 1.414-1.414L10.293 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center font-montserrat">¡ERROR!</h2>
            <h3 className="text-lg mb-6 text-center font-montserrat">Ticket no válido</h3>
            <img
              className="mx-auto"
              src={ticketError}
              alt="Redeem ticket error"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketCard;
