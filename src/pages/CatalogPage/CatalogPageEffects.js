import { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { useMountedRef, useUrlSearchParams } from '@ui/utils';
import { useAsyncError } from '@ui/ErrorBoundary';
import ProductsService from '@services/ProductsService';

import { useCatalogPageState, useCatalogPageSelectors, useCatalogPageActions } from './context';

const parseUrlSearchParams = (params = {}) => {
    const paramsKeys = Object.keys(params);

    return paramsKeys.reduce((result, key) => {
        let value = params[key];

        if (typeof value === 'string' && value.indexOf(',') !== -1) {
            value = value.split(',');
        }
        return { ...result, [key]: value };
    }, {});
};

const CatalogPageEffects = (props) => {
    const { children } = props;

    const throwAsyncError = useAsyncError();
    const state = useCatalogPageState();
    const {
        loading,
        itemsPerPage,
        selectedPage,
        sortBy,
        selectedFilters,
        shouldReloadItems
    } = useCatalogPageSelectors(state);
    const { requestItems, receiveItems, toggleLoading } = useCatalogPageActions();

    // Route params
    const { category, subCategory = null, subCategoryItem = null } = useParams();
    const history = useHistory();

    // Route search params
    const { pathname: routePathName, search } = useLocation();
    const urlSearchParams = useUrlSearchParams(search);
    const urlSearchParamsRef = useRef(null);
    urlSearchParamsRef.current = urlSearchParams;

    const isMountedRef = useMountedRef();

    const historyPush = useCallback(
        (params = {}) => {
            const newSearchParams = new URLSearchParams('');
            const currentSearchParams = new URLSearchParams(urlSearchParamsRef.current || '');

            const paramsKeys = Object.keys(params);

            paramsKeys.forEach((key) => {
                let value = params[key];

                if (value instanceof Array) {
                    value = value.join(',');
                }

                if (value) {
                    newSearchParams.append(key, params[key]);
                }
            });

            const newSearchParamsString = newSearchParams.toString();

            if (newSearchParamsString !== currentSearchParams.toString()) {
                history.push(`${routePathName}?${newSearchParamsString}`);
            }
        },
        [history, routePathName]
    );

    useEffect(() => {
        (async () => {
            try {
                requestItems();

                const promises = [
                    ProductsService.fetchAll(itemsPerPage, false),
                    ProductsService.fetchFilters()
                ];

                const [productData, filters] = await Promise.all(promises);
                const { items, total } = productData;

                if (isMountedRef.current) {
                    receiveItems({
                        items,
                        total,
                        filters,
                        ...(urlSearchParamsRef.current &&
                            parseUrlSearchParams(urlSearchParamsRef.current))
                    });
                }
            } catch (e) {
                toggleLoading(false);
                throwAsyncError(e);
            }
        })();
    }, [
        category,
        subCategory,
        subCategoryItem,
        itemsPerPage,
        isMountedRef,
        requestItems,
        receiveItems,
        toggleLoading,
        throwAsyncError
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                requestItems();

                const generageRandomId = selectedPage > 0;
                const { items, total } = await ProductsService.fetchAll(
                    itemsPerPage,
                    generageRandomId
                );

                if (isMountedRef.current) {
                    receiveItems({
                        items,
                        total
                    });
                }
            } catch (e) {
                toggleLoading(false);
                throwAsyncError(e);
            }
        };

        if (shouldReloadItems) {
            fetchData();
        }
    }, [
        shouldReloadItems,
        itemsPerPage,
        selectedPage,
        isMountedRef,
        receiveItems,
        requestItems,
        toggleLoading,
        throwAsyncError
    ]);

    useEffect(() => {
        if (loading) {
            historyPush({ sort: sortBy, page: selectedPage, ...selectedFilters });
        }
    }, [sortBy, selectedPage, selectedFilters, loading, historyPush]);

    return children;
};

CatalogPageEffects.propTypes = {
    children: PropTypes.node.isRequired
};

export default CatalogPageEffects;
