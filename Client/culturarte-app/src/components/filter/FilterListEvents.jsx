import React from "react";
import { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space} from 'antd';


function FilterListEvents({ handleFilterOptionChange }) {
  const [option, setOption] = useState('Nombre del evento');

  const handleMenuClick = (e) => {
    const selectedOption = items.find((item) => item.key === e.key);
    setOption(selectedOption.label);
    handleFilterOptionChange(selectedOption.key);
  };
 
  const items = [
    {
      label: 'Nombre del evento',
      key: '1',
    },
    {
      label: 'Fecha',
      key: '2',
    },
    {
      label: 'Lugar',
      key: '3',
    }
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  return (
      <div>
          <Dropdown menu={menuProps} >
              <Button style={{width:'14vw', height:'4vh', display:'flex',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', borderRadius:'0.2rem'}}>
                {option}
                  <DownOutlined />
              </Button>
          </Dropdown>
      </div>
  );
}

export default FilterListEvents;