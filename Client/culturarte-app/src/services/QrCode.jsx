import axios from 'axios';

const baseURL = 'http://localhost:8080/qrcode'; 

const createQRCode = (active, ticket_id, token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      active: active,
      ticket_id: ticket_id
    };
  return axios
    .post(`${baseURL}/`, data, config)
    .then((response) => {
      console.log(response.data);
      resolve(response.data)
    })
    .catch((error) => {
      console.log(error);
      reject(error)
    });
  })
};

const updateQRCode = (info, id,token) => {
  return axios
    .put(`${baseURL}/${id}`, info, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getQRCodeById = (id,token) => {
  return new Promise((resolve, reject) => {
  return axios
    .get(`${baseURL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data);
      resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
      reject(error)
    });
  })
};

export { createQRCode, updateQRCode, getQRCodeById };
