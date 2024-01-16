import React, { useState } from "react";

import DecoracionDerecha from "../assets/decoracionDerecha.png";
import DecoracionIzquierda from "../assets/decoracionIzquierda.png";

function CategoryBanner(params) {

  return (
    <div
      class="text-white font-medium text-center h-auto text-4xl relative overflow-hidden"
      style={{ backgroundColor: `${params.bgColor}` }}
    >
      <img
        src={DecoracionDerecha}
        alt=""
        className="absolute z-10 h-64 mix-blend-color-dodge"
      />
      <img
        src={DecoracionIzquierda}
        alt=""
        className="absolute z-10 h-64 mix-blend-color-dodge right-0 bottom-0"
      />

      <p class="p-5">{params.category}</p>
    </div>
  );
}
export default CategoryBanner;
