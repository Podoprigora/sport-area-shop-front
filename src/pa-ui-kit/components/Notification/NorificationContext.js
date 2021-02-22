import { createContext, useContext } from 'react';

const NotificationContext = createContext();

const useNotification = () => useContext(NotificationContext);

export default useNotification;
export { NotificationContext };
