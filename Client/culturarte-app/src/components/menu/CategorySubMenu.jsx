import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";


import { VscChevronDown } from "react-icons/vsc";

const CategorysubMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      class="w-1/5"
    >
      <div class="w-full relative">
        <button
          className={`text-black flex justify-center px-6 py-1 items-center w-full rounded max-sm:pl-12 max-sm:font-bold ${
            isVisible ? "bg-gray-300 " : "bg-white"
          } transition-all ease-in-out duration-300`}
        >
          Categorías <VscChevronDown className="items-center" size={18} />
        </button>
        {isVisible && (
          <div className="">
            <ul class="absolute z-20 bg-white rounded-md w-full max-sm:w-max max-sm:bg-white">
              <Link to="/categories/music">
                <li className="p-3 pt-4 hover:bg-gray-200 transition-all ease-in-out duration-300 font-montserrat">
                  <a href="/">Música</a>
                </li>
              </Link>
              <Link to="/categories/dance">
                <li className="p-3 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Danza</a>
                </li>
              </Link>
              <Link to="/categories/cinema">
                <li className="p-3 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Cine</a>
                </li>
              </Link>
              <Link to="/categories/art">
                <li className="p-3 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Exposicion de arte</a>
                </li>
              </Link>
              <Link to="/categories/literature">
                <li className="p-3 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Literatura</a>
                </li>
              </Link>
              <Link to="/categories/forum">
                <li className="p-3 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Foro</a>
                </li>
              </Link>
              <Link to="/categories/theatre">
                <li className="p-3 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Teatro</a>
                </li>
              </Link>
              <Link to="/categories/debate">
                <li className="p-3 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Debate</a>
                </li>
              </Link>
              <Link to="/categories/standup">
                <li className="p-3 pb-4 hover:bg-gray-200 transition-all ease-in-out font-montserrat duration-300">
                  <a href="/">Stand Up y Comedia</a>
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
      <Outlet />
    </li>
  );
};

export default CategorysubMenu;
