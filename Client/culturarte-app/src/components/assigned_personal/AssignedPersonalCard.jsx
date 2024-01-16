import React from 'react';
import { useState, useEffect } from 'react';

import { getUserByEmail } from "../../services/Auth";
import { removeUserFromEvent } from "../../services/UserToEvent";
import { getUsersByEvent } from "../../services/UserToEvent";

import spaceimg from '../../assets/espacioimg.png';
import SelectEmployee from '../SelectEmployee';
import { Collapse } from 'antd';
import { getImageById } from '../../services/Image';

const { Panel } = Collapse;


const AssignedPersonalCard = ({ eventId, title, date, hour, place, image }) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [encargados, setEncargados] = useState([]);

  const [imageURL, setImageURL] = useState("");

  const getUsers = async () => {
    try {
      const fetchedUsers = await getUsersByEvent(eventId, localStorage.getItem('token'));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    getImageById(image)
      .then((data) => {
        setImageURL(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    getUsers();
  }, [users]);

  const handleCollapseChange = () => {
    setShow(!show);
  };

  const handleUserRemoved = (userId) => {
    const updatedEncargados = encargados.filter((user) => user.userId !== userId);
    setEncargados(updatedEncargados);
  };

  return (
    <div className="bg-white w-11/12 p-6 rounded-lg  mb-5">
      <div className='flex items-start bg-white p-6 rounded-md mx-8 border-gray-200 border-2 shadow-md'>
        <img alt='Event logo' src={imageURL} className='w-48 h-48 object-contain align-self-start' />
        <div className="flex flex-col gap-1 ml-4">
          <p className="text-base font-montserrat">Título: {title}</p>
          <p className="text-base font-montserrat">Fecha: {date}</p>
          <p className="text-base font-montserrat">Hora: {hour}</p>
          <p className="text-base font-montserrat">Lugar: {place}</p>
        </div>            
        <SelectEmployee eventId={eventId} setUsers2={setUsers}/>
      </div>
      <div class="mx-8 font-montserrat">
        <Collapse onChange={handleCollapseChange}>
          <Panel header="Encargados" key="2">
            <div className="mt-1">
              <h3 className="text-lg font-bold font-montserrat">Encargados:</h3>
              <div className="mt-4">
                <ul className="list-disc pl-5">
                  {users.map((user) => (
                    <PersonCard
                      key={user.userId}
                      id={user.userId}
                      name={user.username}
                      eventId={eventId}
                      onUserRemoved={handleUserRemoved}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

const PersonCard = ({ id, name, eventId, onUserRemoved }) => {
  const token = localStorage.getItem('token')

  const removeUser = async () => {
    try {
      await removeUserFromEvent(id, eventId, token);
      onUserRemoved(id);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <li className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <span className="inline-block w-3 h-3 bg-black rounded-full mr-3"></span>
        <p className="text-sm font-montserrat">{name}</p>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="bg-red-700 text-white text-sm px-5 py-1 rounded font-montserrat"
          onClick={removeUser}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default AssignedPersonalCard;
