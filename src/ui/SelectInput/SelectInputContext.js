import { createContext, useContext } from 'react';

const SelectInputContext = createContext();
const useSelectInputContext = () => useContext(SelectInputContext);

export { SelectInputContext, useSelectInputContext };
