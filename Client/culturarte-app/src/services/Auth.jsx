import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const baseURL = "http://localhost:8080/auth";

const LoginService = (email, password) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(baseURL + "/login", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token); // Guardar el token en localStorage
        console.log("Token:", token);
        toast.success("Ok!");
        resolve();
      })
      .catch((error) => {
        toast.error("Credenciales incorrectas");
        console.log("Error:", error.response.data);
        reject(error);
      });
  });
};

const SignupService = (username, password) => {
  return new Promise((resolve, reject) => {
  const data = {
    username: username,
    password: password,
  };

  return axios
    .post(baseURL + "/signup", data)
    .then((response) => {
      console.log(response);
      toast.success("Successfully created!");
      resolve(response)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    });
  });
};

const getUserByEmail = (email) => {
  return axios
    .get(`${baseURL}/by-email/${email}`, {
      headers: {
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

const getUserById = (userId, token) => {
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

const getUserByToken = (info, token) => {
  return axios
    .get(`${baseURL}/token/${info}`, {
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
      return null;
    });
};

const logout = (token) => {
  return axios
    .put(`${baseURL}/logout`, null, {
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
      return null;
    });
};

const verifyAccount = (email) => {
  return new Promise((resolve, reject) => {
  const data = {
    email: email,
  };
  return axios
    .post(`${baseURL}/verification-account`, data)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("Verify", response.data)
      resolve(response.data)
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  });
};

export { LoginService, SignupService, getUserByEmail, getUserById, getUserByToken, logout , verifyAccount};
