import { createContext, useContext } from 'react';

export const StickyContext = createContext();
export const useSticky = () => useContext(StickyContext);
