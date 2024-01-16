import axios from 'axios';

const baseURL = "http://localhost:8080/permission"; 

const savePermission = (info, token) => {
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

const deletePermissionById = (permissionId, token) => {
  return axios
    .delete(`${baseURL}/${permissionId}`, {
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

const getAllPermissions = (token) => {
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

const getPermissionById = (permissionId, token) => {
  return axios
    .get(`${baseURL}/${permissionId}`, {
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
  savePermission,
  deletePermissionById,
  getAllPermissions,
  getPermissionById,
};
