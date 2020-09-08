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

    const handleRequestItems = useCallback(() => {
        dispatch({ type: REQUEST_ITEMS });
    }, []);

    const handleReceiveItems = useCallback((payload) => {
        dispatch({ type: RECEIVE_ITEMS, payload });
    }, []);

    const handleToggleLoading = useCallback((toggle = false) => {
        dispatch({ type: TOGGLE_LOADING, payload: { toggle } });
    }, []);

    const handleChangePage = useCallback((page) => {
        dispatch({ type: SELECT_PAGE, payload: { page } });
    }, []);

    const handleLoadingMore = useCallback(() => {
        if (!isLastPage) {
            dispatch({ type: LOADING_MORE });
        }
    }, [isLastPage]);

    const handleChangeSort = useCallback((value) => {
        dispatch({ type: SELECT_SORT_BY, payload: { value } });
    }, []);

    const handleChangeFilters = useCallback((selected, merge = true) => {
        dispatch({ type: CHANGE_SELECTED_FILTERS, payload: { selected, merge } });
    }, []);

    // Render

    const contextActionsValue = useMemo(
        () => ({
            onChangePage: handleChangePage,
            onLoadingMore: handleLoadingMore,
            onChangeSort: handleChangeSort,
            onChangeFilters: handleChangeFilters,
            onToggleLoading: handleToggleLoading,
            onRequestItems: handleRequestItems,
            onReceiveItems: handleReceiveItems
        }),
        [
            handleChangePage,
            handleLoadingMore,
            handleChangeSort,
            handleChangeFilters,
            handleToggleLoading,
            handleRequestItems,
            handleReceiveItems
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
