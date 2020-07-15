const { createContext, useContext } = require('react');

const NotificationContext = createContext();

const useNotification = () => useContext(NotificationContext);

export default useNotification;
export { NotificationContext };
