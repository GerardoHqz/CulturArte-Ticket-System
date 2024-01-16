import axios from "axios";
import { toast } from "react-hot-toast";

const baseURL = "http://localhost:8080/ticket";

function saveTicket(date, hour, redeem, tier, user, event, ammount, token) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      date: date,
      hour: hour,
      redmed: redeem,
      tier: tier,
      user: user,
      event: event,
      ammount: ammount
    };
    return axios
      .post(baseURL + "/", data, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Ticket added")
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      });
  });
}

function deleteTicket(ticketId, token) {
  return axios
    .delete(baseURL + `/${ticketId}`, {
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
}

function updateTicket(info, token) {
  return axios
    .put(baseURL + "/", info, {
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
}

function getAllTickets(page, size, token) {
  return axios
    .get(baseURL + `/?page=${page}&size=${size}`, {
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
}

function getAllTicketsByUser(page, size, token) {
  return new Promise((resolve, reject) => {
    return axios
      .get(baseURL + `/user/?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.content);
        resolve(response.data.content);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getPastTicketsByUser(page, size, token) {
  return new Promise((resolve, reject) => {
    return axios
      .get(baseURL + `/user/past/?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.content);
        resolve(response.data.content);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getUpcomingTicketsByUser(page, size, token) {
  return new Promise((resolve, reject) => {
    return axios
      .get(baseURL + `/user/upcoming/?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.content);
        resolve(response.data.content);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getTicketById(ticketId, token) {
  return axios
    .get(baseURL + `/${ticketId}`, {
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
}

function redeemTicket(ticketId, token) {
  return new Promise((resolve, reject) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return axios
    .patch(baseURL + `/redeem/${ticketId}`, {}, config)
    .then((response) => {
      console.log(response.data);
      resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
      reject(error)
    });
  })
}

function getTicketByEventId(eventId, token) {
  return axios
    .get(baseURL + `/${eventId}/tickets`, {
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
}

export {
  saveTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
  getAllTicketsByUser,
  getPastTicketsByUser,
  getUpcomingTicketsByUser,
  getTicketById,
  redeemTicket,
  getTicketByEventId
};
