import React,  { useState, useEffect} from "react";
import AssignedEmployee from './AssignedEmployee';
import FilterEmployee from './filter/FilterEmployee';

import { getUsersWithEmployeePermission } from '../services/UserToPermission';
import { saveUserToEvent } from '../services/UserToEvent';
import { getUsersAvailable } from "../services/UserToEvent";

const SelectEmployee = ({ eventId, setUsers2 }) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const getEmployees = async () => {
    try {
      const page = await getUsersAvailable(eventId, localStorage.getItem('token'));
      const users = page.content;
      if(users.length > 0) {
        setUsers(users);
        setFilteredUsers(users);
        console.log(users);
      }else{
        console.log("No hay empleados disponibles");
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };  

  const saveEmployeToEvent = async () => {
    if (selectedUsers.length === 0) {
      console.error('Debes seleccionar al menos un empleado.');
      return;
    }
  
    try {
      for (const userId of selectedUsers) {
        const data = {
          userId,
          eventId,
        };
        const response = await saveUserToEvent(data, localStorage.getItem('token'));
      }
      setUsers2(prevUsers => [...prevUsers]);
    } catch (error) {
      console.error('Error al guardar el empleado:', error);
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };
  

  return (
    <div>
      <div className="ml-auto">
        <button className='bg-sky-700 text-white px-8 py-2 rounded text-xs whitespace-nowrap' onClick={() => {setShow(true); getEmployees();}}>Asignar Personal</button>
      </div>
      {show &&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex">
            <div className="w-6/5 mx-auto p-4 border border-gray-300 rounded-lg bg-white">
              <h1 className="text-3xl font-bold text-cyan-800 p-2 text-left font-montserrat mb-4 border-b border-gray-300">Empleados</h1>
              <div>
                <FilterEmployee 
                  users={users}
                  filteredUsers={filteredUsers}
                  handleSearchChange={handleSearchChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 justify-items-center">
                {filteredUsers.map((user) => (
                  <div key={user.userId} className="flex items-center justify-start pl-4 py-2">
                    <input
                      type="checkbox"
                      id={user.userId}
                      checked={selectedUsers.includes(user.userId)}
                      onChange={() => handleUserSelection(user.userId)}
                    />
                    <label htmlFor={user.userId} className="text-gray-700 font-montserrat ml-2">
                      {user.username}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-start space-x-6 mt-6">
                <button className="bg-cyan-800 text-white px-12 py-2 rounded" onClick={() => {setShow(false); saveEmployeToEvent();}}>Aceptar</button>
                <button className="bg-gray-700 text-white px-12 py-2 rounded" onClick={() => setShow(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default SelectEmployee;