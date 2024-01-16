import React, { useState, useEffect } from 'react';
import EmployeeMenu from '../../components/MenuEmployee';
import EmployeeCard from '../../components/EmployeeCard';
import Filter from "../../components/filter/FilterEmployee";
import { getAllUserToPermission } from '../../services/UserToPermission';
import { AiOutlineMenu } from 'react-icons/ai';
import ResponsiveEmployeeMenu from '../../components/menu/responsive/ResponsiveEmployeeMenu';

const AdminEmployee = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userPermissions, setUserPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [filterOption, setFilterOption] = useState('1');
  const [searchValue, setSearchValue] = useState('');

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  useEffect(() => {
    if (token) {
      getAllUserToPermission(token)
        .then((data) => {
          const transformedUsers = {};

          for (const item of data) {
            const { username, userId } = item.user;
            const permissions = item.permission;

            if (transformedUsers.hasOwnProperty(username)) {
              transformedUsers[username].permissions.push(permissions);
            } else {
              transformedUsers[username] = {
                userId,
                username,
                permissions: [permissions],
              };
            }
          }

          setUsers(transformedUsers);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, []);

  const updatePermissions = (permissionId) => {
    const updatedUsers = { ...users };

    for (const username in updatedUsers) {
      updatedUsers[username].permissions = updatedUsers[username].permissions.filter(
        (permission) => permission.permissionId !== permissionId
      );
    }

    setUsers(updatedUsers);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    let filtered = [];

    if (filterOption === '1') {
      filtered = employees.filter((employee) =>
        employee.title.toLowerCase().includes(value)
      );
    }
    setFilteredEmployee(filtered);
  };

  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
    setSearchValue(''); // Limpiar el valor de búsqueda al cambiar la opción de filtro
    setFilteredEmployee([]);
  };

  return (
    <div className="flex font-montserrat">
      <div className="w-1/5 max-sm:w-0">
        <EmployeeMenu />
      </div>
      <div className="w-4/5 max-sm:w-full mx-4 sticky">
        <h1 className="text-2xl font-semibold text-blue text-center max-sm:flex items-center pt-3">
          <AiOutlineMenu
            onClick={openMenu}
            className="sm:hidden mr-2"
            style={{ verticalAlign: 'middle' }}
          />
          <span className="flex-grow text-center mt-8">Administrar empleados</span>
          {menuVisible && <ResponsiveEmployeeMenu closeMenu={closeMenu} />}
        </h1>
        <p className="text-blue font-medium text-xl mb-6 ">Permisos</p>
        <hr className="border-gray-300 mb-4" />
        <Filter 
          employees={employees} 
          filteredEmployee={filteredEmployee}
          handleSearchChange={handleSearchChange}
          handleFilterOptionChange={handleFilterOptionChange}
        />
        <div className="grid grid-cols-1 gap-6 justify-items-center mt-6 ml-20">
          {Object.entries(users).map(([username, user], index) => (
            <EmployeeCard
              key={index}
              username={username}
              userId={user.userId}
              permissions={user.permissions}
              updatePermissions={updatePermissions} // Pasar la función de actualización de permisos como prop
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEmployee;
