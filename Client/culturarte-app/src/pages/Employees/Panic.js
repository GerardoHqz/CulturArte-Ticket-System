import React, { useState, useEffect } from "react";
import MenuEmployee from "../../components/MenuEmployee";
import PanicButton from "../../components/panicButtom";

import { toggleService } from "../../services/Api";

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

const Panic = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [state, setState] = useState(false);

  const closeMenu = () => {
    setMenuVisible(false); 
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const handleToggle = async () => {
    const response = await toggleService(localStorage.getItem("token"));
    console.log(response);
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
        <h1 className="text-3xl font-bold text-blue-500 p-2 text-center text-blue font-montserrat  ml-60 mx-auto">
          Botón de pánico
        </h1>
        {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
      </h1>
      <div className="flex justify-center ml-60 mt-10">
        <div className="mx-auto">
          <PanicButton toggle={handleToggle} />
        </div>
      </div>
    </div>
  );
  
};

export default Panic;
