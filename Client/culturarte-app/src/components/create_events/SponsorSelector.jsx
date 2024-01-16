import React from 'react';
import { useState } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';
import "../../assets/TimePicker.css"

const items = [
  {
    key: '1',
    label: "Coca Cola"
  },
  {
    key: '2',
    label:"Pepsi"
  },
  {
    key: '3',
    label: "USAID"
  },
  {
    key: '4',
    label: 'Grupo Roble',
  },
  {
    key: '5',
    label: 'Avianca',
  },
];

function SponsorSelector() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e.key);
    items.forEach(item =>{
      if(item.key == e.key)
        setSelectedCategory(item.label)
    })
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  
  return (
    <div class="w-full">
    <Space wrap direction='vertical' style={{width:'100%'}}>
    <Dropdown menu={menuProps} class="w-screen">
      <Button style={{width:'100%', textAlign:'left'}}>
        <Space>
          {selectedCategory ? <p>{selectedCategory}</p>  : <p class="text-gray-400">Seleccionar patrocinador</p>}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    
  </Space>
  </div>
  );
}

export default SponsorSelector;
