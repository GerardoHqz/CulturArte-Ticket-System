import React, { useState } from "react";

import { Link, Outlet } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import CategorySubMenu from "../CategorySubMenu";

function ResponsiveMenuNoFilters({ closeMenu }) {

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-black bg-opacity-50 z-50 sm:hidden">
      <div className="w-6/12 h-screen bg-white">
        <div className=" mx-6 sticky top-0 pt-3">
          <AiOutlineMenu
            className="sm:hidden w-full bg-inherit items-center"
            onClick={closeMenu}
          />
          <ul className="" style={{ width: "60%" }}>
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ResponsiveMenuNoFilters;
