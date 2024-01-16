import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function VerifyAccount() {
    const confirmationCode = localStorage.getItem("Verify")
  const [code, setCode] = useState('');

  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault()
    if(code == confirmationCode){
        toast.success("Ok")
        navigate("/setpassword")
    }
    else{
        toast.error("Wrong code")
    }
  }

  return (
    <div className="bg-verification-bg w-screen h-screen flex justify-center items-center font-montserrat">
        <Toaster/>
      <form className="flex flex-col bg-white rounded-l-md shadow-lg w-2/5 h-5/6">
        <h2 className="text-5xl m-14 text-center">Verificar Cuenta</h2>
        <p className="text-center text-gray-500 mb-14">Ingresa el código que ha sido enviado a tu email</p>
        <input
          className="mx-24 border-solid border-2 border-gray-400 p-3 rounded-md focus:outline-none mt-10"
          placeholder="Código"
          onChange={(e) => setCode(e.target.value)}
        />
          <button onClick={handleVerify} >Verificar</button>
      </form>
      <Outlet />
    </div>
  );
}

export default VerifyAccount;