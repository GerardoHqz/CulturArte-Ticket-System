import React from 'react';

const AssignedEmployee = ({ email }) => {
  return (
    <div className="w-full mx-auto border border-gray-300 rounded-lg overflow-hidden mt-4">
      <div className="grid grid-cols-2">
        {/* Datos */}
        <div className="col-span-1 flex items-center justify-start pl-4 py-2">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-2" />
          <p className="text-gray-700 font-montserrat">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default AssignedEmployee;

