import React, { useState } from "react";
import MenuEmployee from "../../components/MenuEmployee";

import icono from "../../assets/icono_bigger.jpg";

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

const EmployeePortal = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };
  return (
    <div className="flex flex-col font-montserrat">
      <div className="w-1/5 sticky max-sm:w-0">
        <MenuEmployee />
      </div>
      <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center pt-3">
        <AiOutlineMenu
          onClick={openMenu}
          className="sm:hidden mr-2"
          style={{ verticalAlign: "middle" }}
        />
        <span className="flex-grow text-center">Portal de empleados</span>
        <div className="flex justify-center items-center mt-6">
          <img src={icono} alt="logo" className="w-80 h-80" />
        </div>
        {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
      </h1>
      <div className="flex justify-center mt-3">
        <div className="mx-auto"></div>
      </div>
    </div>
  );
};

export default EmployeePortal;
