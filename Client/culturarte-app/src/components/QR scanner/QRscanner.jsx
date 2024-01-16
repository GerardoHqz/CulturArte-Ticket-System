import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

import { getQRCodeById } from "../../services/QrCode";
import { redeemTicket } from "../../services/Ticket";

function QRscanner({ eventId, setShow }) {
  const token = localStorage.getItem("token");
  const [scanRes, setScanRes] = useState('');
  const [QRFound, setQRFound] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 700,
        height: 700,
      },
      fps: 3,
    });

    scanner.render(success, error);

    function success(res) {
      scanner.clear();
      setScanRes(res);
      findQR(res);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const verify = (data) => {
    if (!data.ticket || !data.ticket.event || data.ticket.event.eventId !== eventId) {
      toast.error("Ticket does not belong to event");
      console.log("Ticket does not belong to event");
      console.log(eventId);
      console.log(data.ticket);
      return;
    }
  
    if (data.ticket.redmed === true) {
      toast.error("Ticket already redeemed");
      console.log("Ticket already redeemed");
      return;
    }
  
    var now = new Date();
    var QRdate = new Date(data.date_create);
    var diff = Math.abs(now - QRdate);
    var minutes = Math.floor(diff / 1000 / 60);
  
    if (minutes > 20) {
      toast.error("QR expired, create a new one");
      console.log("QR expired, create a new one");
      return;
    }
  
    redeemTicket(data.ticket.ticketId, token)
      .then((res) => {
        toast.success("Ticket redeemed successfully!");
        console.log(res);
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
        const errorData = error.response.data;
        let errorMessage = "Error occurred";
  
        if (errorData) {
          Object.keys(errorData).forEach((field) => {
            const fieldErrors = errorData[field];
            if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
              errorMessage += `\n${field}: ${fieldErrors.join(", ")}`;
            }
          });
        }
  
        toast.error(errorMessage);
      });
  };
  
  const findQR = (res) => {
    getQRCodeById(res, token)
      .then((data) => {
        console.log(data); // Verificar la estructura de datos
        setQRFound(data);
        if (data && data.ticket && data.ticket.event && data.ticket.event.eventId) {
          verify(data);
        } else {
          toast.error("Invalid QR code");
          console.log("Invalid QR code");
        }
      })
      .catch((error) => {
        console.error(error);
        const errorData = error.response ? error.response.data : null;
        let errorMessage = "Error occurred";
  
        if (errorData) {
          Object.keys(errorData).forEach((field) => {
            const fieldErrors = errorData[field];
            if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
              errorMessage += `\n${field}: ${fieldErrors.join(", ")}`;
            }
          });
        }
  
        toast.error(errorMessage);
      });
  };
    

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <Toaster/>
      <div className="bg-white p-6 w-128 h-128 rounded-md border-gray-200 border-2 shadow-md relative">
        {scanRes ? (
          <div>Success: {scanRes}</div>
        ) : (
          <>
            <div id="reader"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default QRscanner;
