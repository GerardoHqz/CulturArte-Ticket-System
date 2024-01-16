import React, { useState, useEffect } from 'react';
import EmployeeMenu from '../../components/MenuEmployee';
import UserCard from '../../components/Usercard'; 

import { AiOutlineMenu } from "react-icons/ai";

import ResponsiveEmployeeMenu from "../../components/menu/responsive/ResponsiveEmployeeMenu";

import { getAllUsers } from "../../services/User";

const AdminUser = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [users, setUsers] = useState([]);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsers(localStorage.getItem("token"), 0, 10);
      setUsers(response);
      console.log(users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  return (
    <div className="flex font-montserrat">
      <div className="w-1/5 max-sm:w-0">
        <EmployeeMenu />
      </div>
      <div className="w-4/5 mx-auto p-4">
      <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center pt-3">
        <AiOutlineMenu
          onClick={openMenu}
          className="sm:hidden mr-2"
          style={{ verticalAlign: "middle" }}
        />
        <span className="flex-grow text-center">Administrar usuarios</span>
        {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
      </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-6">
          {users ? (
            users.map(user => (
              <UserCard key={user.userId} email={user.username} state={user.state}/>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
