import React, { useState } from "react";

import { Link, Outlet } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import profileImg from "../../../assets/imgProfile.png";

function ResponsiveEmployeeMenu({ closeMenu }) {

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-black bg-opacity-50 z-50 font-montserrat font-normal sm:hidden">
      <div className="flex flex-col items-center fixed top-0 left-0 h-screen bg-menuEmployee-bg text-white w-1/2 pt-3">
        <AiOutlineMenu
          className="sm:hidden w-1/2 bg-inherit items-center"
          onClick={closeMenu}
        />
        <div className="flex justify-center items-center pt-3">
          <img
            src={profileImg}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="ml-2">
          <h6 className="text-lg mt-2 text-center">Nombre del Perfil</h6>
          <p className="text-sm underline text-center">Administrador</p>
        </div>
        <div className="flex-grow">
          <ul className="p-6 ">
            <Link to="/employee/createevent">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <a href="/" className="block w-full py-2 text-lg ">
                  Crear evento
                </a>
              </li>
            </Link>
            <Link to="/employee/editevent">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <a href="/" className="block w-full py-2 text-lg ">
                  Editar Evento
                </a>
              </li>
            </Link>
            <Link to="/employee/assignstaff">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <a href="/" className="block w-full py-2 text-lg ">
                  Asignar personal
                </a>
              </li>
            </Link>
            <Link to="/employee/assignedevents">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <a href="/" className="block w-full py-2 text-lg ">
                  Eventos asignados
                </a>
              </li>
            </Link>
            <Link to="/employee/panicbuttom">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <a href="/" className="block w-full py-2 text-lg ">
                  Botón de pánico
                </a>
              </li>
            </Link>
            <li className="py-2 mb-2 hover:scale-105 transition-transform">
              <Link to="/employee/stadistic">
                <a href="/" className="text-lg ">
                  Estadísticas
                </a>
              </Link>
            </li>
            <Link to="/employee/employees">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <a href="/" className="block w-full py-2 text-lg ">
                  Empleados
                </a>
              </li>
            </Link>
            <Link to="/employee/users">
              <li className=" mb-2 hover:scale-105 transition-transform">
                <a href="/" className="block w-full py-2 text-lg ">
                  Usuarios
                </a>
              </li>
            </Link>
          </ul>
        </div>
        <div className="p-4 hover:scale-105 transition-transform">
          <Link to="/">
            <a href="/" className="text-md  underline">
              Cerrar sesión
            </a>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ResponsiveEmployeeMenu;
