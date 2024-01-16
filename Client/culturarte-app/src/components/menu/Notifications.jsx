import React, { useState } from "react";
import {
  IoIosNotificationsOutline,
  IoIosNotifications,
} from "react-icons/io";
import icono from "../../assets/perfil.png";

function Notifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      image: icono,
      message: "Titulo notificacion 1",
      time: "14/05/2023",
      read: false,
    },
    {
      id: 2,
      image: icono,
      message: "Titulo notificacion 2",
      time: "05/05/2023",
      read: false,
    },
    {
      id: 3,
      image: icono,
      message: "Titulo largo para notificacion 3",
      time: "30/04/2023",
      read: true,
    },
    {
      id: 4,
      image: icono,
      message: "Titulo notificacion 2",
      time: "28/04/2023",
      read: false,
    },
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const showNotificationIcon = () => {
    if (showNotifications) {
      return <IoIosNotifications size={38} />;
    } else {
      return <IoIosNotificationsOutline size={38} />;
    }
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, read: true };
      }
      return notification;
    });

    setNotifications(updatedNotifications);
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="relative">
      {/* notification icon */}
      <div
        className="flex items-center mr-2 text-black hover:text-gray-700 cursor-pointer"
        onClick={toggleNotifications}
      >
        {showNotificationIcon()}
      </div>

      {/* amount of notifications*/}
      {unreadCount > 0 && (
        <div className="absolute z-20 top-0 right-2 bg-red-500 text-white text-center rounded-full text-xs w-5 h-5">
          {unreadCount}
        </div>
      )}

      {/* notifications */}
      {showNotifications && (
        <div className="absolute z-20 right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow max-sm:w-56">
          <div className="px-4 py-2 font-semibold">Notificaciones</div>
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative px-4 py-2 hover:bg-gray-100 flex transition-all ease-in-out duration-300 ${
                  !notification.read ? "bg-gray-200" : ""
                }`}
                onMouseEnter={() => {
                  if (!notification.read) {
                    setNotifications((prevNotifications) => {
                      return prevNotifications.map((prevNotification) => {
                        if (prevNotification.id === notification.id) {
                          return {
                            ...prevNotification,
                            hoverText: "Marcar como leído",
                          };
                        }
                        return prevNotification;
                      });
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (!notification.read) {
                    setNotifications((prevNotifications) => {
                      return prevNotifications.map((prevNotification) => {
                        if (prevNotification.id === notification.id) {
                          const { hoverText, ...rest } = prevNotification;
                          return rest;
                        }
                        return prevNotification;
                      });
                    });
                  }
                }}
                onClick={() => {
                  if (!notification.read) {
                    markAsRead(notification.id);
                  }
                }}
              >
                <img
                  src={notification.image}
                  alt="imagen notificacion"
                  className="w-12 pr-3"
                />

                <div className="w-full truncate">
                  <h3 className="text-sm overflow-hidden overflow-ellipsis">
                    {notification.message}
                  </h3>
                  <p className="text-xs text-gray-500 overflow-hidden overflow-ellipsis">
                    {notification.time}
                  </p>
                  {!notification.read && notification.hoverText && (
                    <p
                      className="absolute z-30 text-xs text-gray-500 bottom-1 right-1 cursor-pointer"
                      style={{ backgroundColor: "white" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#f8f8f8";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {notification.hoverText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-2">
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={toggleNotifications}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
