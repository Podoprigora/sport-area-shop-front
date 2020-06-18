import React, { useContext } from 'react';

const WindowContext = React.createContext();

const useWindowContext = () => useContext(WindowContext);

export { WindowContext, useWindowContext };
