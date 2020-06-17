import React, { useState, useRef, useMemo, useCallback, useEffect, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';

import useLocalStorage from '@components/hooks/useLocalStorage';
import useMountedRef from '@components/hooks/useMountedRef';
import QuickSearchService from '@services/QuickSearchService';
import HeaderSearchInput from './HeaderSearchInput';

const queryMinLength = 3;
const historyMaxLength = 5;
const localStorageKey = 'queriesHistory';
const searchParamName = 'q';
const searchRoutePath = '/search';

const defaultQueriesHistory = ['jeans', 'shirt'];

const HeaderSearch = React.forwardRef(function HeaderSearch(props, ref) {
    const routerHistory = useHistory();
    const routerLocation = useLocation();

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [queriesHistory, setQueriesHistory] = useLocalStorage(localStorageKey, []);

    const mountedRef = useMountedRef();
    const forcedOpenRef = useRef(false);
    const queryRef = useRef(query);
    const selectedQueryRef = useRef(false);

    const queriesHistoryData = useMemo(() => {
        const historyData =
            queriesHistory && queriesHistory.length > 0 ? queriesHistory : defaultQueriesHistory;

        return historyData.map((item) => ({
            title: item,
            history: true,
            cleanable: queriesHistory && queriesHistory.length > 0
        }));
    }, [queriesHistory]);

    const addToQueriesHistory = useCallback(
        (newQuery) => {
            setQueriesHistory((prevState = []) => {
                const history = prevState.filter((item) => item !== newQuery);

                if (history.length >= historyMaxLength) {
                    history.pop();
                }

                return [newQuery, ...history];
            });
        },
        [setQueriesHistory]
    );

    const handleInputChange = useCallback((ev) => {
        setQuery(ev.target.value);
    }, []);

    const handleSelect = useCallback(
        (value = null) => {
            routerHistory.push(`${searchRoutePath}/?${searchParamName}=${value}`);

            setOpen(false);
        },
        [routerHistory]
    );

    const handleInputKeyDown = useCallback(
        (ev) => {
            if (selectedQueryRef.current) {
                selectedQueryRef.current = false;
                return;
            }

            if (ev.key === 'Enter' && query.length >= queryMinLength) {
                handleSelect(query);
                addToQueriesHistory(query);
            }
        },
        [query, handleSelect, addToQueriesHistory]
    );

    const handleItemClick = useCallback(
        (ev, value) => {
            if (value) {
                handleSelect(value.title);
            }
        },
        [handleSelect]
    );

    const handleChange = useCallback(
        (ev) => {
            const { title } = ev.target.value || {};

            if (title && title.trim().length > 0) {
                handleSelect(title);
                selectedQueryRef.current = true;
            }
        },
        [handleSelect]
    );

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback((ev) => {
        if (!forcedOpenRef.current) {
            setOpen(false);
        }
        forcedOpenRef.current = false;
    }, []);

    const handleDeleteQueryHistoryItem = useCallback(
        (deletedIndex) => (ev) => {
            ev.stopPropagation();
            ev.preventDefault();

            forcedOpenRef.current = true;

            setQueriesHistory((prevState) => {
                const newHistory = prevState.filter((_, index) => index !== deletedIndex);
                return newHistory;
            });
        },
        [setQueriesHistory]
    );

    const requestData = useCallback(
        debounce(async (q) => {
            setLoading(true);
            try {
                const response = await QuickSearchService.fetch(q);

                if (
                    response &&
                    mountedRef.current &&
                    queryRef.current &&
                    queryRef.current.length >= queryMinLength
                ) {
                    setData(response);
                }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 300),
        []
    );

    const handleData = useCallback(() => {
        if (open) {
            queryRef.current = query;

            if (query && query.length >= queryMinLength) {
                requestData(query);
            } else {
                setData(queriesHistoryData);
            }
        }
    }, [open, query, queriesHistoryData, requestData]);

    useEffect(() => {
        handleData();
    }, [handleData]);

    useEffect(() => {
        const searchParam = new URLSearchParams(routerLocation.search);
        const queryParam = searchParam.get(searchParamName) || '';

        setQuery((prevQuery) => {
            return prevQuery !== queryParam ? queryParam : prevQuery;
        });
    }, [routerLocation]);

    return (
        <div className="header__search">
            <HeaderSearchInput
                query={query}
                queryMinLength={queryMinLength}
                open={open}
                data={data}
                loading={loading}
                onOpen={handleOpen}
                onClose={handleClose}
                onChange={handleChange}
                onInputChange={handleInputChange}
                onInputKeyDown={handleInputKeyDown}
                onDeleteHistoryItem={handleDeleteQueryHistoryItem}
                onItemClick={handleItemClick}
                ref={ref}
            />
        </div>
    );
});

export default memo(HeaderSearch);
