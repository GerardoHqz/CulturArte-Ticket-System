import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import logo from "../assets/login-logoimg.png";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { LoginService } from "../services/Auth";
import { getUserByToken } from "../services/Auth";
import { getUserByEmail } from "../services/Auth";
import { getPermissionByUser } from "../services/UserToPermission";

import { useGoogleLogin } from "@react-oauth/google";
import { LoginGoogle } from "../services/Google";

import { verifyAccount } from "../services/Auth";

function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(
    <AiOutlineEyeInvisible size={25} color="gray" />
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePass = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(<AiOutlineEye size={25} color="gray" />);
    } else {
      setPasswordType("password");
      setPasswordIcon(<AiOutlineEyeInvisible size={25} color="gray" />);
    }
  };

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await LoginService(email, password);
      const token = localStorage.getItem("token");
      localStorage.setItem("username", email);
      navigate("/home");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { access_token } = response;
      const emailResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const emailData = await emailResponse.json();
      const { email } = emailData;
      localStorage.setItem("username", email);
      try {
        const token = await LoginGoogle(email); // Espera el token directamente
        if (token != null) {
          console.log("Token:", token);
          localStorage.setItem("token", token); // Guardar el token en localStorage
          //validar si tiene el permiso gestion de tickets (Usuario normal)
          const user = await getUserByEmail(email);
          const permission = await getPermissionByUser(user.userId, token);
          const hasPermission = permission.some(
            (permission) => permission.namePermission === "gestion de tickets"
          );
          if (hasPermission) {
            navigate("/home");
          } else {
            navigate("/employee/home");
          }
        } else {
          verifyAccount(email).then((response) => {
            console.log(response);
          });
          navigate("/verify");
        }
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
      }
    } catch (error) {
      console.error("Error de inicio de sesión con Google:", error);
    }
  };

  const loginFunc = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
  });

  return (
    <div className="bg-login-bg h-screen w-screen font-montserrat">
      <Toaster />
      <div className="flex justify-center items-center h-screen">
        <form className="flex flex-col bg-white rounded-l-md h-3/4 shadow-lg">
          <h2 className="text-5xl m-14 text-center">Inicio de sesión</h2>
          <input
            className="mx-14 border-solid border-2 border-gray-400 p-3 rounded-md focus:outline-none"
            name="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <div className="flex items-center justify-between mt-3 mx-14 border-solid border-2 border-gray-400 p-3 rounded-md">
            <input
              className="w-full h-full focus:outline-none"
              name="password"
              type={passwordType}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onMouseDown={togglePass} onMouseUp={togglePass}>
              {passwordIcon}
            </button>
          </div>
          <button className="text-right mt-3 mr-14 text-gray-500">
            ¿Olvidaste tu contraseña?
          </button>

          <button
            className="flex justify-center mt-16 mb-2 text-gray-500 rounded-md p-3 border-solid border-2 border-gray-400 mx-14 hover:bg-gray-300"
            onClick={(e) => {
              e.preventDefault();
              loginFunc();
            }}
          >
            <FcGoogle className="mr-3" size={25} /> Iniciar sesión con Google
          </button>
          <button
            className="mb-16 p-3 text-center rounded-md bg-purple-700 text-white mx-14 cursor-pointer hover:bg-purple-900"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </form>
        <img
          className="w-128 h-3/4 rounded-r-md shadow-lg"
          src={logo}
          alt="logo"
        />
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
