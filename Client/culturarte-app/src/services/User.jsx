import axios from "axios";

const baseURL = "http://localhost:8080/user";

const getAllUsers = (token) => {
  return axios
    .get(`${baseURL}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data.content);
      return response.data.content;
    })
    .catch((error) => {
      console.log(error);
    });
};

const toggleUserByEmail = (email, token) => {
  return new Promise((resolve, reject) => {
    return axios
      .put(`${baseURL}/toggle/${email}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
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
  getAllUsers,
  toggleUserByEmail,
};
