import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const baseURL = "http://localhost:8080/sponsor";

const saveSponsorship = (nameSponsorship, logo, token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      nameSponsorship: nameSponsorship,
      logo: logo,
    };
    return axios
      .post(`${baseURL}/`, data, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Sponsor added!");
        resolve(response.data.message);
        localStorage.removeItem("Image");
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const updateSponsorship = (info, sponsorId, token) => {
  return axios
    .put(`${baseURL}/${sponsorId}`, info, {
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

const deleteSponsorship = (sponsorshipId, token) => {
  return axios
    .delete(`${baseURL}/${sponsorshipId}`, {
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

const getAllSponsorships = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .get(`${baseURL}/`, config)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getSponsorshipById = (sponsorId, token) => {
  return axios
    .get(`${baseURL}/${sponsorId}`, {
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

export {
  saveSponsorship,
  updateSponsorship,
  deleteSponsorship,
  getAllSponsorships,
  getSponsorshipById,
};
