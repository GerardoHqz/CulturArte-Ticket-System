import React, { useState } from 'react';

const Tier = () => {
  const [selected, setSelected] = useState(false);

  const handleItemClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      className={`flex items-center justify-between px-2 py-1 rounded ${selected ? 'bg-blue-950 text-white' : 'bg-white'} ${selected ? '' : 'border-2 border-blue-950'}`}
      style={{ width: '10vw', margin: '0.5rem', borderColor: selected ? '' : '#1E3A8A' }}
      onClick={handleItemClick}
    >
      <p className="text-sm font-montserrat">Tier tipo 1</p>
      <p className={`text-sm ${selected ? 'text-white' : ''}`}>$0.00</p>
    </div>
  );
};

export default Tier;
