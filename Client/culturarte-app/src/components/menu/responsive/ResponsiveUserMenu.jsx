import React from "react";
import profileImg from "../../../assets/imgProfile.png";
import { Link, Outlet } from "react-router-dom";
import DecoracionDerecha from "../../../assets/decoracionDerecha.png";
import DecoracionIzquierda from "../../../assets/decoracionIzquierda.png";

import { AiOutlineMenu } from "react-icons/ai";

function ResponsiveUserMenu({ closeMenu }) {
  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-black bg-opacity-50 z-50 sm:hidden">
      <div className="flex flex-col items-center sticky bg-orange h-screen text-white w-1/2">
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
            <AiOutlineMenu
              className="sm:hidden w-full bg-inherit items-center"
              onClick={closeMenu}
            />
            <div className="flex justify-center items-center mt-5">
              <img
                src={profileImg}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="ml-2">
              <h6 className="text-lg mt-2 text-center">Nombre del Perfil</h6>
            </div>
          </div>
          <div className="flex-grow">
            <ul className="p-6 ">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <Link to="/user/redeem" className="block w-full py-2 text-lg ">
                  Mis Tickets
                </Link>
              </li>
              <li className="py-2 mb-2 hover:scale-105 transition-transform">
                <Link to="/user/pastevents" className="text-lg ">
                  Eventos Pasados
                </Link>
              </li>
              <li className="py-2 mb-2 hover:scale-105 transition-transform">
                <Link to="/user/transfers" className="text-lg ">
                  Tickets Transferidos
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4 bottom-0 hover:scale-105 transition-transform">
            <Link to="/">
              <a href="/" className="text-md  underline">
                Cerrar sesión
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ResponsiveUserMenu;
