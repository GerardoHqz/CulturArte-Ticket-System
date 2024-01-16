import React, { useState, useEffect } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

import { GetAllEvents } from "../../services/Event"; 
const token = localStorage.getItem("token"); 

function SelectEvent({ selectEvents }) {
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('Seleccionar evento');

  useEffect(() => {
    GetAllEvents(token).then((data) => {
        setAllEvents(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleMenuClick = (event) => {
    const selectedEventTitle = allEvents.find(
      (e) => e.eventId === event.key
    )?.title;
    const selectedEventId = allEvents.find(
      (e) => e.eventId === event.key
    )?.eventId;
    setSelectedEvent(selectedEventTitle || "Seleccionar evento");
    selectEvents(selectedEventId);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {allEvents.map((event) => (
        <Menu.Item key={event.eventId}>{event.title}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="mb-3">
      <Dropdown overlay={menu}>
        <Button style={{ width: '14vw', height: '4vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedEvent}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default SelectEvent;