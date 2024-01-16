import React from 'react'
import axios from 'axios';

const baseURL = "http://localhost:8080/image";

function getImageById(id) {
    return axios
      .get(baseURL + `/${id}`, { responseType: "arraybuffer" })
      .then((response) => {
        const imageBlob = new Blob([response.data], { type: "image/jpeg" });
        const imageURL = URL.createObjectURL(imageBlob);
        return imageURL;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addImage = (file, token) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
  
      axios
        .post(baseURL + "/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Agrega este encabezado para indicar que estás enviando un formulario multipart
          },
        })
        .then((response) => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.log("Error:", error);
          reject(error);
        });
    });
  };

export { getImageById, addImage }