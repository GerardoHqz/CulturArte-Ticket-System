import axios from "axios";
import { toast } from "react-hot-toast";

const baseURL = "http://localhost:8080/tier";

const getAllTiers = (page, size, token) => {
  return axios
    .get(`${baseURL}/`, {
      params: {
        page,
        size,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getTierById = (tierId, token) => {
  return axios
    .get(`${baseURL}/${tierId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getTiersByEvent = (eventId, token) => {
  return axios
    .get(baseURL + `/event/${eventId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

const saveTier = (tierName, seats, price, selectedEventId, token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      nameTier: tierName,
      amountSeant: seats,
      price: price,
      event: selectedEventId,
    };
    return axios
      .post(`${baseURL}/`, data, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Tier Added!");
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const updateTier = (info, tierId, token) => {
  return axios
    .put(`${baseURL}/${tierId}`, info, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteTier = (tierId, token) => {
  return axios
    .delete(`${baseURL}/${tierId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getAllTiers, getTierById, getTiersByEvent, saveTier, updateTier, deleteTier };
