import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeePermissions from './EmployeePermissions';
import { deleteUserToPermission } from '../services/UserToPermission';
import toast, { Toaster } from 'react-hot-toast';

const EmployeeCard = ({ username, userId, permissions, updatePermissions }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleDeletePermission = (permission, index) => {
    const info = {
      userId: userId,
      permissionId: permission,
    };

    deleteUserToPermission(info, token)
      .then((data) => {
        console.log('data');
        console.log(data);
        toast.success('Permiso eliminado correctamente');
        updatePermissions(permission); // Actualizar la lista de permisos después de eliminar uno
      })
      .catch((error) => {
        console.log('Error:', error.message);
        toast.error(error.message);
      });

    console.log(`Eliminar permiso: ${permission}`);
  };

  console.log('userId');
  console.log(userId);
  return (
    <div className="bg-white w-4/5 p-4 rounded-lg border border-gray-300 font-montserrat">
      <Toaster />
      <div className="flex items-center">
        <h2 className="text-lg font-bold font-montserrat">{username}</h2>
        <div>
          <EmployeePermissions selectedPermissions={permissions} id={userId} />
        </div>
      </div> 
      <hr className="my-4" />
      <div className="mt-4">
        <h3 className="text-sm font-bold font-montserrat">Permisos</h3>
        <div className="mt-2">
          {permissions.map((permission, index) => (
            <div className="flex items-center justify-between mb-1" key={index}>
              <li className="text-sm font-montserrat m-2">{permission.namePermission}</li>

              <button
                className="bg-red-700 text-white text-xs px-2 py-1 rounded"
                onClick={() => handleDeletePermission(permission.permissionId, index)}
              >
                Quitar Permiso
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
