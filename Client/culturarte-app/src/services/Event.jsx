import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const baseURL = "http://localhost:8080/event";

function GetAllEvents() {
  return axios
    .get(baseURL + `/`)
    .then((response) => {
      console.log(response.data.content);
      return response.data.content;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAllEventsByCategory(cat) {
  return axios
    .get(baseURL + `/category/${cat}`)
    .then((response) => {
      console.log(response.data.content);
      return response.data.content;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAllPastEventsByCategory(cat) {
  return axios
    .get(baseURL + `/category/past/${cat}`)
    .then((response) => {
      console.log(response.data.content);
      return response.data.content;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAllUpcomingEventsByCategory(cat) {
  return axios
    .get(baseURL + `/category/upcoming/${cat}`)
    .then((response) => {
      console.log(response.data.content);
      return response.data.content;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAllUpcomingEvents() {
  return axios
    .get(baseURL + `/upcoming`)
    .then((response) => {
      console.log(response.data.content);
      return response.data.content;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAllPastEvents() {
  return axios
    .get(baseURL + `/past`)
    .then((response) => {
      console.log(response.data.content);
      return response.data.content;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getEventById(id, token) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${baseURL}/${id}`, config)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function getPopularPlaces(token){
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${baseURL}/popular`, config)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      }
      )
      .catch((error) => {
        console.log(error);
        reject(error);
      }
      );
  });
}

function saveEvent(
  place,
  title,
  involved,
  description,
  imageId,
  date,
  hour,
  state,
  duration,
  category,
  token
) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      place: place,
      title: title,
      involved: involved,
      description: description,
      image_id: imageId,
      date: date,
      hour: hour,
      state: state,
      duration: duration,
      category: category,
    };
    return axios
      .post(baseURL + `/`, data, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Event added!");
        resolve(response.data);
        localStorage.removeItem("EventDate");
        localStorage.removeItem("EventHour");
        localStorage.removeItem("Image");
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function updateEvent(
  place,
  title,
  involved,
  description,
  imageId,
  date,
  hour,
  state,
  duration,
  category,
  token,
  eventId
) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      place: place,
      title: title,
      involved: involved,
      description: description,
      image_id: imageId,
      date: date,
      hour: hour,
      state: state,
      duration: duration,
      category: category,
    };
    return axios
      .put(baseURL + `/${eventId}`, data, config)
      .then((response) => {
        console.log(response.data);
        toast.success("Event updated!");
        resolve(response.data);
        localStorage.removeItem("EventDate");
        localStorage.removeItem("EventHour");
        localStorage.removeItem("Image");
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function toggleEvent(eventId, token) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(`${baseURL}/toggle/${eventId}`, {}, config)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}


export {
  GetAllEvents,
  getAllEventsByCategory,
  getAllPastEventsByCategory,
  getAllUpcomingEventsByCategory,
  getAllPastEvents,
  getAllUpcomingEvents,
  getEventById,
  getPopularPlaces,
  saveEvent,
  updateEvent,
  toggleEvent
};
