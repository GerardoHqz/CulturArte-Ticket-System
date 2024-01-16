import React, { useState } from "react";

function EventFilter({ option }) {
  const [optionSelected, setOptionSelected] = useState(0);

  const handleOptionClick = (selectedOption) => {
    setOptionSelected(selectedOption);
    option(selectedOption);
  };

  return (
    <div className="w-2/12 h-screen bg-white m-0 max-sm:hidden">
      <div className="m-6 sticky top-5">
        <h2 className="font-bold font-montserrat text-xl p-2">Eventos</h2>
        <ul className="text-lg">
          <li
            className={`mr-4 cursor-pointer font-montserrat p-2 hover:bg-gray-200 ${
              optionSelected === 0 ? "bg-gray-200" : ""
            } ${optionSelected === 0 ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => handleOptionClick(0)}
          >
            Todos
          </li>
          <li
            className={`mr-4 cursor-pointer font-montserrat p-2 hover:bg-gray-200 ${
              optionSelected === 1 ? "bg-gray-200" : ""
            } ${optionSelected === 1 ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => handleOptionClick(1)}
          >
            Proximos
          </li>
          <li
            className={`mr-4 cursor-pointer font-montserrat p-2 hover:bg-gray-200 ${
              optionSelected === 2 ? "bg-gray-200" : ""
            } ${optionSelected === 2 ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => handleOptionClick(2)}
          >
            Pasados
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EventFilter;
