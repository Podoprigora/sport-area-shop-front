import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import { ProductPageActionsContext, ProductPageContext } from './ProductPageContext';
import {
    productPageDefaultState,
    productPageReducer,
    RECEIVE_PRODUCT,
    REQUEST_PRODUCT,
    TOGGLE_LOADING
} from './productPageReducers';
import ProductPageContextLog from './ProductPageContextLog';

const ProductPageProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(productPageReducer, productPageDefaultState);

    const toggleLoading = useEventCallback((toggle = false) => {
        dispatch({ type: TOGGLE_LOADING, payload: { toggle } });
    });

    const requestProduct = useEventCallback(() => {
        dispatch({ type: REQUEST_PRODUCT });
    });

    const receiveProduct = useEventCallback((response = {}) => {
        dispatch({ type: RECEIVE_PRODUCT, payload: response });
    });

    const actions = useMemo(() => {
        return {
            toggleLoading,
            requestProduct,
            receiveProduct
        };
    }, [toggleLoading, requestProduct, receiveProduct]);

    return (
        <ProductPageContext.Provider value={state}>
            <ProductPageActionsContext.Provider value={actions}>
                <ProductPageContextLog />
                {children}
            </ProductPageActionsContext.Provider>
        </ProductPageContext.Provider>
    );
};

ProductPageProvider.propTypes = {
    children: PropTypes.node
};

export default ProductPageProvider;
