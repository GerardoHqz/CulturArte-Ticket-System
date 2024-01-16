import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from 'antd';
import FilterListEmployee from "./FilterListEmployee";

function Filter({users, filteredUsers, handleSearchChange}) {
    let filtered = [];
    return (
        <div class="w-full p-2 bg-grayFilter flex items-center justify-between rounded font-montserrat">
            <div class="flex items-center gap-4 pl-4">
                <FiSearch size={24} />
                <Input onChange={handleSearchChange} placeholder="Borderless" bordered={false} style={{ backgroundColor: '#FFFFFF', height: '4vh', width: '73vw', borderRadius:'0.2rem'}} />
            </div>
        </div>
    );
}

export default Filter;