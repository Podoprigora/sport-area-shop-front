import React, { useMemo, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useCatalogPageSelectors } from './catalogPageSelectors';
import { CatalogPageStateContext, CatalogPageActionsContext } from './CatalogPageContext';

import {
    catalogPageReducer,
    catalogPageDefaultState,
    REQUEST_ITEMS,
    RECEIVE_ITEMS,
    TOGGLE_LOADING,
    SELECT_PAGE,
    LOADING_MORE,
    SELECT_SORT_BY,
    CHANGE_SELECTED_FILTERS
} from './catalogPageReducers';
import { CatalogPageContextLog } from './CatalogPageContextLog';

const CatalogPageProvider = (props) => {
    const { children } = props;

    const [state, dispatch] = useReducer(catalogPageReducer, catalogPageDefaultState);

    const { isLastPage } = useCatalogPageSelectors(state);

    // Handlers

    const requestItems = useCallback(() => {
        dispatch({ type: REQUEST_ITEMS });
    }, []);

    const receiveItems = useCallback((payload) => {
        dispatch({ type: RECEIVE_ITEMS, payload });
    }, []);

    const toggleLoading = useCallback((toggle = false) => {
        dispatch({ type: TOGGLE_LOADING, payload: { toggle } });
    }, []);

    const changePage = useCallback((page) => {
        dispatch({ type: SELECT_PAGE, payload: { page } });
    }, []);

    const loadingMore = useCallback(() => {
        if (!isLastPage) {
            dispatch({ type: LOADING_MORE });
        }
    }, [isLastPage]);

    const changeSort = useCallback((value) => {
        dispatch({ type: SELECT_SORT_BY, payload: { value } });
    }, []);

    const changeFilters = useCallback((selected, merge = true) => {
        dispatch({ type: CHANGE_SELECTED_FILTERS, payload: { selected, merge } });
    }, []);

    // Render

    const contextActionsValue = useMemo(
        () => ({
            changePage,
            loadingMore,
            changeSort,
            changeFilters,
            toggleLoading,
            requestItems,
            receiveItems
        }),
        [
            changeFilters,
            changePage,
            changeSort,
            loadingMore,
            receiveItems,
            requestItems,
            toggleLoading
        ]
    );

    return (
        <CatalogPageStateContext.Provider value={state}>
            <CatalogPageActionsContext.Provider value={contextActionsValue}>
                <CatalogPageContextLog />
                {children}
            </CatalogPageActionsContext.Provider>
        </CatalogPageStateContext.Provider>
    );
};

CatalogPageProvider.propTypes = {
    children: PropTypes.node
};

export { CatalogPageProvider };
