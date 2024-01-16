import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from 'antd';
import FilterListEvents from "./FilterListEvents"; 

function Filter({ events, filteredEvents, handleSearchChange, handleFilterOptionChange }) {
    return (
        <div class="w-full p-2 bg-grayFilter flex items-center justify-between rounded font-montserrat">
            <div class="flex items-center gap-4 pl-4">
                <FiSearch size={24} />
                <Input
                    placeholder="Buscar..."
                    bordered={false}
                    style={{
                        backgroundColor: "#FFFFFF",
                        height: "4vh",
                        width: "30vw",
                        borderRadius: "0.2rem",
                    }}
                    onChange={handleSearchChange}
                />
            </div>
            <div class="flex items-center gap-4 pr-4">
                <h2 class="font-medium">Buscar por: </h2>
                <FilterListEvents  
                    handleFilterOptionChange={handleFilterOptionChange}
                />
            </div>
        </div>
    );
}

export default Filter;