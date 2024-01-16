import React from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";

import { Link, Outlet } from "react-router-dom";

import Notification from "../Notifications";
import icono from "../../../assets/icono.jpg";

function ResponsiveNav({ openMenu }) {
  return (
    <div className="flex justify-around items-center py-3 w-screen font-montserrat text-sm bg-white sm:hidden">
        <AiOutlineMenu onClick={openMenu}/>
      <Link to="/home">
        <img src={icono} alt="logo" className="w-9 h-auto" />
      </Link>
      <Notification />
      <Link to="/user/redeem">
        <VscAccount className="text-center" size={35} />
      </Link>
    </div>
  );
}

export default ResponsiveNav;
