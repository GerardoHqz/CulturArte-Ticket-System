import axios from 'axios';

const baseURL = 'http://localhost:8080/category';  

const saveCategory = (info,token) => {
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
      console.error(error);
    });
};

const deleteCategoryByName = (name,token) => {
  return axios
    .delete(`${baseURL}/${name}`, {
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
      console.error(error);
    });
};

const getAllCategories = (token) => {
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

const getCategoryByName = (name,token) => {
  return axios
    .get(`${baseURL}/${name}`, {
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
      console.error(error);
    });
};


export { saveCategory, deleteCategoryByName, getAllCategories, getCategoryByName };