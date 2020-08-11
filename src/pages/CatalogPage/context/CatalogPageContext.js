import { createContext, useContext } from 'react';

const CatalogPageStateContext = createContext();
const useCatalogPageState = () => useContext(CatalogPageStateContext);

const CatalogPageActionsContext = createContext();
const useCatalogPageAcitions = () => useContext(CatalogPageActionsContext);

export {
    CatalogPageStateContext,
    CatalogPageActionsContext,
    useCatalogPageState,
    useCatalogPageAcitions
};
