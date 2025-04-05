import { useState } from "react";

export const useHandleNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleNotification = (message: string) => {
    setShowNotification(true);
    setNotificationMessage(message);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage("");
    }, 3000);
  };

  return { handleNotification, showNotification, notificationMessage };
};
