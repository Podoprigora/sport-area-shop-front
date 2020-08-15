import { createContext, useContext } from 'react';

export const ExpandedPanelContext = createContext();
export const useExpandedPanel = () => useContext(ExpandedPanelContext);
