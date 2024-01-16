import React from "react";
import ticketError from '../../assets/redeemTicket/imgRedeemError.png';

function TicketCardOK(){
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-6 bg-white rounded-lg shadow-lg z-50">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick="">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10.293 10l3.647-3.646a1 1 0 1 0-1.414-1.414L8.879 8.586 5.232 4.939A1 1 0 1 0 3.818 6.354L7.465 10l-3.647 3.646a1 1 0 0 0 1.414 1.414L8.879 11.414l3.647 3.646a1 1 0 0 0 1.414-1.414L10.293 10z"
                    clipRule="evenodd"
                />
            </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center font-montserrat">¡ERROR!</h2>
            <h3 className="text-lg mb-6 text-center font-montserrat">Ticket no válido</h3>
            <img className="mx-auto" src={ticketError} alt="Redeem ticket error" />
        </div>
    );
};

export default TicketCardOK;