import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { SignupService } from "../services/Auth";

function SetUserPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      console.log("Las contraseñas no coinciden");
      return;
    } 

    try {
      await SignupService(localStorage.getItem("username"), password);
      toast.success("Cuenta creada");
      console.log("Cuenta creada");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.password || "Error creación de cuenta");
      console.error("Error de inicio de sesión:", error.response.data.password);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="bg-verification-bg w-screen h-screen flex justify-center items-center font-montserrat">
      <Toaster/>
      <form className="flex flex-col bg-white rounded-l-md shadow-lg w-2/5 h-5/6">
        <h2 className="text-5xl m-14 text-center">Verificar Cuenta</h2>
        <p className="text-center text-gray-500 mb-14">
          Establece una contraseña para mayor seguridad
        </p>
        <input
          className="mx-24 border-solid border-2 border-gray-400 p-3 rounded-md focus:outline-none mt-10"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          className="mx-24 border-solid border-2 border-gray-400 p-3 rounded-md focus:outline-none mt-5"
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Link
          to=""
          className="mb-5 mt-16 p-3 text-center rounded-md bg-sky-700 text-white mx-24 cursor-pointer hover:bg-sky-900"
        >
          <input type="submit" value="Crear Cuenta" onClick={handleSignup} />
        </Link>
      </form>
      <Outlet />
    </div>
  );
}

export default SetUserPassword;
