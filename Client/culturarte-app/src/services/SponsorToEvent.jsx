import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseURL = 'http://localhost:8080/sponsor-event'; 

const saveSponsorToEvent = (sponsorId, eventId, token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      sponsorId: sponsorId,
      eventId: eventId,
    };
  return axios
    .post(`${baseURL}/`, data, config)
    .then((response) => {
      console.log(response.data);
      toast.success("Sponsor added to event!")
      resolve(response.data)
    })
    .catch((error) => {
      console.log(error);
      reject(error)
    });
  })
};

const deleteSponsorToEvent = (info,token) => {
  return axios
    .delete(`${baseURL}/`, info, {
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

const getAllSponsorToEvent = (token) => {
  return axios
    .get(`${baseURL}/`, {
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

const getAllSponsorToEventByEvent = (eventId, token) => {
  return axios
    .get(`${baseURL}/${eventId}`, {
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

export { saveSponsorToEvent, deleteSponsorToEvent, getAllSponsorToEvent, getAllSponsorToEventByEvent };
