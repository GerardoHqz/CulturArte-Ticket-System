import React, { useState, useEffect } from 'react';
import { getAllPermissions } from '../services/Permission';
import { saveUserToPermission } from '../services/UserToPermission';
import toast, { Toaster } from "react-hot-toast";

const EmployeePermissions = ({ selectedPermissions, id }) => {
  const [permissionSelected, setPermissionSelected] = useState([]);
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [permissions, setPermissions] = useState([]);
  const [permissionAssigned, setPermissionAssigned] = useState([]);

  useEffect(() => {
    if (token) {
      getAllPermissions(token)
        .then((data) => {
          setPermissions(data);
        })
        .catch((error) => {

          console.log('Error:', error);
        });
    }
  }, [token]);

  useEffect(() => {
    setPermissionAssigned(selectedPermissions.map((permission) => permission.namePermission));
  }, [selectedPermissions]);

  const handleOptionSelect = (option) => {
    if (permissionSelected.includes(option)) {
      setPermissionSelected(permissionSelected.filter((selectedOption) => selectedOption !== option));
    } else {
      setPermissionSelected([...permissionSelected, option]);
    }
  };

  const SavePermission = () => {
    const permissionsToAdd = permissionSelected.filter((permission) => !permissionAssigned.includes(permission));
    for (let index = 0; index < permissionsToAdd.length; index++) {
      const info = {
        userId: id,
        permissionId: permissionsToAdd[index],
      }

      saveUserToPermission(info, token)
        .then((data) => {
          setPermissionSelected([]);
          setShow(false); // Ocultar el modal
          toast.success("Permiso asignado correctamente")
        })
        .catch((error) => {
          toast.error("Error al agregar permiso")
          console.log("Error:", error);
        });

    }

  };

  const handleCancel = () => {
    setPermissionSelected([]); // Limpiar el estado permissionSelected
    setShow(false); // Ocultar el modal
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-between ml-96 ">
        <button
          className="bg-cyan-800 text-white text-sm px-2.5 py-1.5 rounded"
          onClick={() => setShow(true)}
        >
          Asignar Permisos
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-1/4 p-6 rounded-lg text-center">
            <h2 className="font-montserrat text-3xl font-semibold mb-4 text-cyan-800 mx-auto">Asignar Permisos</h2>
            <div className="flex flex-col">
              {Object.keys(permissions).map((key) => {
                const permission = permissions[key];
                const isSelected = permissionSelected.includes(permission.permissionId);
                const isAssigned = permissionAssigned.includes(permission.namePermission);
                const disable = isAssigned && !isSelected;

                return (
                  <button
                    key={key}
                    className={`w-1/2 mx-auto px-3 py-1 text-sm font-montserrat rounded ${disable ? 'bg-gray-600 cursor-not-allowed' : isSelected ? 'bg-cyan-800 text-white cursor-pointer' : 'bg-white cursor-pointer'} border ${isSelected ? 'border-blue-800' : 'border-gray-300'}`}
                    onClick={() => handleOptionSelect(permission.permissionId)}
                    disabled={disable}
                  >

                    {permission.namePermission}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button className="bg-cyan-800 text-white px-4 py-2 rounded" onClick={() => SavePermission()}>
                Aceptar
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePermissions;


