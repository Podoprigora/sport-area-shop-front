import { useContext, createContext } from 'react';

const CategoryMenuContext = createContext();

const useCategoryMenu = () => useContext(CategoryMenuContext);

export { CategoryMenuContext, useCategoryMenu };
