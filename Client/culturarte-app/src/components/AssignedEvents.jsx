import React, { useState, useRef, useEffect } from 'react';
import QRscanner from './QR scanner/QRscanner';

import { getImageById } from '../services/Image';

function AssignedEvents(params) {
  const [show, setShow] = useState(false);

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

  return (
    <div className='flex justify-between bg-white p-6 rounded-md mx-6 border-gray-200 border-2 shadow-md'>
      <img alt='Event logo' src={imageURL} />
      <div className='flex flex-col gap-5'>
        <p className='font-montserrat'>Título: {params.title}</p>
        <p className='font-montserrat'>Fecha: {params.date}</p>
        <p className='font-montserrat'>Hora: {params.hour}</p>
        <p className='font-montserrat'>Lugar: {params.location}</p>
      </div>
      <div>
        <button className='bg-sky-700 text-white h-max p-3 rounded-sm shadow-md cursor-pointer' onClick={() => {setShow(true)}}>
          {params.button}
        </button>
      </div>
      {show && <QRscanner eventId={params.eventId} setShow={setShow}/>}
    </div>
  );
}

export default AssignedEvents;
