import React, { useEffect, useState } from "react";
import icono from "../../assets/icono.jpg";
import { Link, Outlet } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import Notification from "./Notifications";
import CategorySubMenu from "./CategorySubMenu";

import { getPermissionByUser } from "../../services/UserToPermission";
import { getUserByToken } from "../../services/Auth";

function Menu() {
  const [permissions, setPermissions] = useState([]);

  const getListPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = await getUserByToken(token);
      const userPermissions = await getPermissionByUser(userId, token);
      setPermissions(userPermissions);
    } catch (error) {
      console.error("Error al obtener los permisos del usuario:", error);
    }
  };

  useEffect(() => {
    getListPermissions();
  }, []);

  return (
    <nav className="flex justify-around items-center p-3 font-montserrat text-sm bg-white max-sm:hidden">
      <Link to="/home">
        <img src={icono} alt="logo" className="w-9 h-auto" />
      </Link>
      <ul className="flex justify-between" style={{ width: "60%" }}>
        <CategorySubMenu />
        <li className="py-1 px-4 hover:bg-gray-200">
          <Link to="/home/upcomingevents"> Eventos próximos </Link>
        </li>
        <li className="py-1 px-4 hover:bg-gray-200">
          <Link to="/home/pastevents">Eventos pasados </Link>
        </li>
        <li className="py-1 px-4 hover:bg-gray-200">
          <Link to="/user/redeem">Canjear ticket</Link>
        </li>
        <li className="py-1 px-4 hover:bg-gray-200">
          <Link to="/user/transfers">Tickets transferidos</Link>{" "}
        </li>
      </ul>
      <div className="flex justify-between w-max items-center">
        {permissions.some(
          (permission) =>
            permission.namePermission === "gestion de eventos" ||
            permission.namePermission === "asignacion de personal" ||
            permission.namePermission === "validacion de tickets" ||
            permission.namePermission === "desactivar/activar API" ||
            permission.namePermission === "acceso a estadisticas" ||
            permission.namePermission === "gestion de permisos" ||
            permission.namePermission === "desactivar/activar usuarios"
        ) ? (
          <Link to="/employee/home">
            <span className="py-1 px-4 hover:bg-darkblue bg-blue rounded-md text-white">Portal de empleados</span>
          </Link>
        ) : null}
        <Notification />
        <Link to="/user/redeem">
          <VscAccount className="text-center" size={35} />
        </Link>
      </div>
      <Outlet />
    </nav>
  );
}

export default Menu;
