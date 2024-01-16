import React from "react";
import { useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space} from 'antd';


function FilterListEvents() {
    const [option, setOption] = useState('');

    const handleMenuClick = (e) => {
        items.forEach(item => {
            if(item.key === e.key)
            setOption(item.label)
        });
    
      };
    
    const items = [
        {
          label: 'Nombre de Empleado',
          key: '1',
        },
        {
          label: 'Email',
          key: '2',
        },
      ];
    
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };
    
    return (
        <div>
            <Dropdown menu={menuProps}>
                <Button style={{width:'14vw', height:'4vh', display:'flex',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', borderRadius:'0.2rem'}}>
                  {option}
                        <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    );
}


export default FilterListEvents;