import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../src/components/menu/Menu";
import BannerBuy from "../../src/components/buy_tickets/BannerBuy";
import Footer from "../../src/components/Footer";
import EventBuyCard from "../components/buy_tickets/EventBuyCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImArrowLeft } from 'react-icons/im'

function BuyTickets() {
  const token = localStorage.getItem("token");

  const location = useLocation();
  const storedCard = localStorage.getItem("eventCard");
  const card = storedCard ? JSON.parse(storedCard) : {};

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen font-montserrat flex flex-col">
      <Menu className="flex-grow" />
      <BannerBuy className="w-screen mt-4" />
      <div className="relative flex flex-col items-start mt-4">
        <button className="absolute left-12 top-8 text-black hover:text-darkblue" onClick={() => navigate(-1)}>
          <ImArrowLeft size={25}/>
        </button>
        <EventBuyCard
          className=" my-4"
        />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default BuyTickets;
