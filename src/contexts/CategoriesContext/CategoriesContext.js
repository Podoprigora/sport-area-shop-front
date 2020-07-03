import { createContext, useContext } from 'react';

const CategoriesStateContext = createContext();
const CategoriesActionsContext = createContext();

const useCategoriesState = () => useContext(CategoriesStateContext);
const useCategoriesAction = () => useContext(CategoriesActionsContext);

export {
    CategoriesStateContext,
    CategoriesActionsContext,
    useCategoriesAction,
    useCategoriesState
};
