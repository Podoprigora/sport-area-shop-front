import { createContext, useContext } from 'react';

const ProductPageContext = createContext();
const useProductPageState = () => useContext(ProductPageContext);

const ProductPageActionsContext = createContext();
const useProductPageActions = () => useContext(ProductPageActionsContext);

export {
    ProductPageContext,
    ProductPageActionsContext,
    useProductPageState,
    useProductPageActions
};
