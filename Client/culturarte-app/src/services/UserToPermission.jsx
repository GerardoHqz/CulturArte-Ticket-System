import axios from 'axios';

const baseURL = 'http://localhost:8080/user-permission'; // Reemplaza la URL base con la correspondiente a tu aplicación Spring Boot

const saveUserToPermission = (info, token) => {
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
      console.log(error.data);
    });
};

const deleteUserToPermission = async (info, token) => {
  try {
    const response = await axios.delete(`${baseURL}/`, {
      data: info,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response);
    const errorMessage = error.response?.data?.message || 'Error al eliminar el permiso';
    throw new Error(errorMessage);
  }
};

const getAllUserToPermission = (token) => {
  return axios
    .get(`${baseURL}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPermissionByUser = (userId, token) => {
  return axios
    .get(`${baseURL}/${userId}`, {
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

const getUsersWithEmployeePermission = (permissionId, token) => {
  return axios
    .get(`${baseURL}/user-by-permission/${permissionId}`, {
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
  saveUserToPermission,
  deleteUserToPermission,
  getAllUserToPermission,
  getPermissionByUser,
  getUsersWithEmployeePermission,
};
