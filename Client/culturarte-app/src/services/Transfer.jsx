import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseURL = "http://localhost:8080/transfer"; 

const confirmTransfer = (ticketId, email, token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      ticketId: ticketId,
      userId: email
    };
  return axios
    .post(`${baseURL}/verify`, data, config)
    .then((response) => {
      console.log(response.data.message);
      localStorage.setItem("VerifyTransfer", response.data.message)
      resolve(response.data.message)
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
};

const saveTransfer = (ticketId, email, token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      ticketId: ticketId,
      userId: email
    };
  return axios
    .post(`${baseURL}/`, data, config)
    .then((response) => {
      console.log(response.data);
      localStorage.removeItem("VerifyTransfer")
      toast.success("Ticket transfered!")
      resolve(response.data)
    })
    .catch((error) => {
      console.log(error);
      reject(error)
    });
  });
};

const updateTransfer = (info, transferId, token) => {
  return axios
    .put(`${baseURL}/${transferId}`, info, {
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

const deleteTransfer = (transferId, token) => {
  return axios
    .delete(`${baseURL}/${transferId}`, {
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

const getAllTransfers = (token) => {
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

const getTransferById = (transferId, token) => {
  return axios
    .get(`${baseURL}/${transferId}`, {
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

const getTransfersByUser = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  return axios
    .get(`${baseURL}/user`, config)
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

export {
  saveTransfer,
  confirmTransfer,
  updateTransfer,
  deleteTransfer,
  getAllTransfers,
  getTransferById,
  getTransfersByUser
};
