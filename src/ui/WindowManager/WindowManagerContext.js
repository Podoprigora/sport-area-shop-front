import React, { useContext, createContext } from 'react';

const WindowManagerContext = createContext();

const useWindowManager = () => useContext(WindowManagerContext);

export { WindowManagerContext, useWindowManager };
