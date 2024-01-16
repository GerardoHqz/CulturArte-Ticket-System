import React from "react";
import profileImg from "../assets/imgProfile.png";
import { Link, Outlet } from "react-router-dom";
import DecoracionDerecha from "../assets/decoracionDerecha.png";
import DecoracionIzquierda from "../assets/decoracionIzquierda.png";

import { logout } from "../services/Auth";

const UserMenu = () => {
  const username = localStorage.getItem("username");
  const handleLogout = async() => {
    await logout(localStorage.getItem("token"));
    localStorage.clear();
  }

  return (
    <div className="flex flex-col items-center sticky top-0 left-0 bg-orange h-screen text-white w-60 max-sm:hidden">
      <img
        src={DecoracionDerecha}
        alt=""
        className="absolute z-0 h-64 mix-blend-color-dodge"
      />
      <img
        src={DecoracionIzquierda}
        alt=""
        className="absolute z-0 h-64 mix-blend-color-dodge right-0 bottom-0"
      />
      <div class="z-10">
        <div className="p-4">
          <div className="flex justify-center items-center mt-5">
            <img
              src={profileImg}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="ml-2">
            <h6 className="text-lg mt-2 text-center">{username}</h6>
          </div>
        </div>
        <div className="flex-grow">
          <ul className="p-6 ">
            <li className="font-montserrat mb-2 hover:scale-105 transition-transform">
              <Link to="/user/redeem" className="block w-full py-2 text-lg ">
                Mis Tickets
              </Link>
            </li>
            <li className=" font-montserrat py-2 mb-2 hover:scale-105 transition-transform">
              <Link to="/user/pastevents" className="text-lg ">
                Eventos Pasados
              </Link>
            </li>
            <li className="font-montserrat py-2 mb-2 hover:scale-105 transition-transform">
              <Link to="/user/transfers" className="text-lg ">
                Tickets Transferidos
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 bottom-0 hover:scale-105 transition-transform">
          <Link to="/">
            <a href="/" className="text-md  underline font-montserrat" onClick={handleLogout}>
              Cerrar sesión
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
