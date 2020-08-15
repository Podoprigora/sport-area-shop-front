import React, { useEffect, useMemo, useReducer, useCallback, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import useUrlSearchParams from '@ui/hooks/useUrlSearchParams';
import useEventCallback from '@ui/hooks/useEventCallback';
import useMountedRef from '@ui/hooks/useMountedRef';
import ProductsService from '@services/ProductsService';
import { CatalogPageStateContext, CatalogPageActionsContext } from './CatalogPageContext';
import useCatalogPageSelectors from './catalogPageSelectors';
import {
    catalogPageReducer,
    catalogPageDefaultState,
    REQUEST_INITIAL_ITEMS,
    RECEIVE_INITIAL_ITEMS,
    TOGGLE_ITITIAL_LOADING,
    REQUEST_ITEMS,
    RECEIVE_ITEMS,
    TOGGLE_LOADING,
    SELECT_PAGE,
    LOADING_MORE,
    SELECT_SORT_BY
} from './catalogPageReducers';

const CatalogPageProvider = (props) => {
    const { children } = props;

    const [state, dispatch] = useReducer(catalogPageReducer, catalogPageDefaultState);
    const { itemsPerPage, isLastPage, selectedPage, sortBy } = useCatalogPageSelectors(state);

    const isMountedRef = useMountedRef();

    // Route params
    const { category, subCategory = null, subCategoryItem = null } = useParams();
    const history = useHistory();

    // Route search params
    const { pathname: routePathName, search } = useLocation();
    const urlSearchParams = useUrlSearchParams(search);
    const urlSearchParamsRef = useRef(null);
    urlSearchParamsRef.current = urlSearchParams;

    const loadingItems = useCallback(
        async (params) => {
            try {
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

    const historyPush = useEventCallback((params) => {
        const { page, sort } = params;
        const queryParams = new URLSearchParams(urlSearchParamsRef.current || '');
        const initQueryParams = new URLSearchParams(urlSearchParamsRef.current || '');

        if (page) {
            if (queryParams.has('page')) {
                if (page > 1) {
                    queryParams.set('page', page);
                } else {
                    queryParams.delete('page');
                }
            } else if (page > 1) {
                queryParams.append('page', page);
            }
        }

        if (sort) {
            if (queryParams.has('sort')) {
                queryParams.set('sort', sort);
            } else {
                queryParams.append('sort', sort);
            }
        }

        const searchString = queryParams.toString();

        if (searchString.length && searchString !== initQueryParams.toString()) {
            history.push(`${routePathName}?${searchString}`);
        }
    });

    const handleChangePage = useCallback(
        (page) => {
            dispatch({ type: SELECT_PAGE, payload: { page } });
            loadingItems({ page });
        },
        [loadingItems]
    );

    const handleLoadingMore = useCallback(() => {
        if (!isLastPage) {
            dispatch({ type: LOADING_MORE });
            loadingItems();
        }
    }, [isLastPage, loadingItems]);

    const handleChangeSort = useCallback(
        (value) => {
            dispatch({ type: SELECT_SORT_BY, payload: { value } });
            loadingItems({ sort: value });
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
                            total,
                            ...(urlSearchParamsRef.current && urlSearchParamsRef.current)
                        }
                    });
                }
            } catch (e) {
                console.log(e);
                dispatch({ type: TOGGLE_ITITIAL_LOADING, payload: { toggle: false } });
            }
        })();
    }, [isMountedRef, itemsPerPage, category, subCategory, subCategoryItem]);

    useEffect(() => {
        historyPush({ sort: sortBy, page: selectedPage });
    }, [sortBy, selectedPage, historyPush]);

    const contextActionsValue = useMemo(
        () => ({
            onChangePage: handleChangePage,
            onLoadingMore: handleLoadingMore,
            onChangeSort: handleChangeSort
        }),
        [handleChangePage, handleChangeSort, handleLoadingMore]
    );

    // Logging
    console.groupCollapsed('CatalogPageContext');
    console.log({ state });
    console.log({ selectors: useCatalogPageSelectors(state) });
    console.groupEnd();

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
