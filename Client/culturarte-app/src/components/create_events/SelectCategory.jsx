import React from "react";
import { useState, useEffect } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

import { getAllCategories } from "../../services/Category";
const token = localStorage.getItem("token");

function SelectCategory({ selectCategories}) {
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Seleccionar categoria');

    useEffect(() => {
      getAllCategories(token)
        .then((data) => {
          setAllCategories(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }, []);

    const handleMenuClick = (event) => {
      const selectedCategoryName = allCategories.find(
        (category) => category.categoryId === event.key
      )?.name;
      setSelectedCategory(selectedCategoryName || "Seleccionar patrocinador");
      selectCategories(selectedCategoryName);
    };
    
    const menu = (
      <Menu onClick={handleMenuClick}>
        {allCategories.map((category) => (
          <Menu.Item key={category.categoryId}>{category.name}</Menu.Item>
        ))}
      </Menu>
    );
    
    return (
      <div className="mb-3">
      <Dropdown overlay={menu}>
        <Button style={{ width: '14vw', height: '4vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedCategory}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
    );
}


export default SelectCategory