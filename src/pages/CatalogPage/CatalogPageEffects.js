import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import useUrlSearchParams from '@ui/hooks/useUrlSearchParams';
import useMountedRef from '@ui/hooks/useMountedRef';
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

    const state = useCatalogPageState();
    const {
        loading,
        itemsPerPage,
        selectedPage,
        sortBy,
        selectedFilters,
        shouldReloadItems
    } = useCatalogPageSelectors(state);
    const { onRequestItems, onReceiveItems, onToggleLoading } = useCatalogPageActions();

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
        (params) => {
            const { page, sort, filters = {} } = params;
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

            const filtersKeys = Object.keys(filters);

            if (filtersKeys.length > 0) {
                for (let k = 0; k < filtersKeys.length; k += 1) {
                    const filterId = filtersKeys[k];
                    let filterValue = filters[filterId];

                    if (filterValue instanceof Array) {
                        filterValue = filterValue.join(',');
                    }

                    if (queryParams.has(filterId)) {
                        if (filterValue) {
                            queryParams.set(filterId, filterValue);
                        } else {
                            queryParams.delete(filterId);
                        }
                    } else if (filterValue) {
                        queryParams.append(filterId, filterValue);
                    }
                }
            }

            const searchString = queryParams.toString();

            if (searchString.length && searchString !== initQueryParams.toString()) {
                history.push(`${routePathName}?${searchString}`);
            }
        },
        [history, routePathName]
    );

    useEffect(() => {
        (async () => {
            try {
                onRequestItems();

                const promises = [
                    ProductsService.fetchAll(itemsPerPage),
                    ProductsService.fetchFilters()
                ];

                const [productData, filters] = await Promise.all(promises);
                const { items, total } = productData;

                if (isMountedRef.current) {
                    onReceiveItems({
                        items,
                        total,
                        filters,
                        ...(urlSearchParamsRef.current &&
                            parseUrlSearchParams(urlSearchParamsRef.current))
                    });
                }
            } catch (e) {
                console.log(e);
                onToggleLoading(false);
            }
        })();
    }, [
        category,
        subCategory,
        subCategoryItem,
        itemsPerPage,
        isMountedRef,
        onRequestItems,
        onReceiveItems,
        onToggleLoading
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                onRequestItems();

                const { items, total } = await ProductsService.fetchAll(itemsPerPage);

                if (isMountedRef.current) {
                    onReceiveItems({
                        items,
                        total
                    });
                }
            } catch (e) {
                console.log(e);
                onToggleLoading(false);
            }
        };

        if (shouldReloadItems) {
            fetchData();
        }
    }, [
        shouldReloadItems,
        itemsPerPage,
        isMountedRef,
        onReceiveItems,
        onRequestItems,
        onToggleLoading
    ]);

    useEffect(() => {
        if (loading) {
            historyPush({ sort: sortBy, page: selectedPage, filters: selectedFilters });
        }
    }, [sortBy, selectedPage, selectedFilters, loading, historyPush]);

    return children;
};

CatalogPageEffects.propTypes = {
    children: PropTypes.node.isRequired
};

export default CatalogPageEffects;
