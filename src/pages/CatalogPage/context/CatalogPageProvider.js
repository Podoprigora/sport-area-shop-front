import React, { useEffect, useState, useMemo, useReducer, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import useEventCallback from '@ui/hooks/useEventCallback';
import useMountedRef from '@ui/hooks/useMountedRef';
import ProductsService from '@services/ProductsService';
import { CatalogPageStateContext, CatalogPageActionsContext } from './CatalogPageContext';

import {
    catalogPageReducer,
    catalogPageDefaultState,
    REQUEST_INITIAL_ITEMS,
    RECEIVE_INITIAL_ITEMS,
    TOGGLE_ITITIAL_LOADING,
    REQUEST_ITEMS,
    RECEIVE_ITEMS,
    TOGGLE_LOADING
} from './catalogPageReducers';
import useCatalogPageSelectors from './catalogPageSelectors';

const CatalogPageProvider = (props) => {
    const { children } = props;

    const [state, dispatch] = useReducer(catalogPageReducer, catalogPageDefaultState);
    const { itemsPerPage } = useCatalogPageSelectors(state);

    const isMountedRef = useMountedRef();

    // Route params
    const { category, subCategory = null, subCategoryItem = null } = useParams();

    const loadingItems = useCallback(
        async (params) => {
            try {
                dispatch({ type: REQUEST_ITEMS });
                const { items, total } = await ProductsService.fetchAll(itemsPerPage);

                if (isMountedRef.current) {
                    dispatch({
                        type: RECEIVE_ITEMS,
                        payload: {
                            items,
                            total,
                            ...params
                        }
                    });
                }
            } catch (e) {
                console.log(e);
                dispatch({ type: TOGGLE_LOADING, payload: { toggle: false } });
            }
        },
        [isMountedRef, itemsPerPage]
    );

    const handleChangePage = useCallback(
        (page) => {
            loadingItems({ page });
        },
        [loadingItems]
    );

    useEffect(() => {
        (async () => {
            try {
                dispatch({ type: REQUEST_INITIAL_ITEMS });
                const { items, total } = await ProductsService.fetchAll(itemsPerPage);

                if (isMountedRef.current) {
                    dispatch({
                        type: RECEIVE_INITIAL_ITEMS,
                        payload: {
                            items,
                            total
                        }
                    });
                }
            } catch (e) {
                console.log(e);
                dispatch({ type: TOGGLE_ITITIAL_LOADING, payload: { toggle: false } });
            }
        })();
    }, [isMountedRef, itemsPerPage, category, subCategory, subCategoryItem]);

    const contextActionsValue = useMemo(
        () => ({
            onChangePage: handleChangePage
        }),
        [handleChangePage]
    );

    console.log(state);

    return (
        <CatalogPageStateContext.Provider value={state}>
            <CatalogPageActionsContext.Provider value={contextActionsValue}>
                {children}
            </CatalogPageActionsContext.Provider>
        </CatalogPageStateContext.Provider>
    );
};

CatalogPageProvider.propTypes = {
    children: PropTypes.node
};

export { CatalogPageProvider };
