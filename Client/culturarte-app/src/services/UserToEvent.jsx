import axios from 'axios';

const baseURL = 'http://localhost:8080/user-event'; // Reemplaza la URL base con la correspondiente a tu aplicación Spring Boot

const saveUserToEvent = (info, token) => {
  return axios
    .post(`${baseURL}/`, info, {
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

const getAllUserToEvent = (token) => {
  return axios
    .get(`${baseURL}/` , {
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

const removeUserFromEvent = (userId, eventId, token) => {
  const data = {
    userId: userId,
    eventId: eventId,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .delete(`${baseURL}/`, { ...config, data: data })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUsersByEvent = (eventId, token) => {
  return axios
    .get(`${baseURL}/event/${eventId}`, {
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

const getEventsByUser = (userId, token) => {
  return axios
    .get(`${baseURL}/user/${userId}`, {
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

const getUsersAvailable = (eventId, token) => {
  return axios
    .get(`${baseURL}/available/${eventId}`, {
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

export {
  saveUserToEvent,
  getAllUserToEvent,
  removeUserFromEvent,
  getUsersByEvent,
  getEventsByUser,
  getUsersAvailable
};
