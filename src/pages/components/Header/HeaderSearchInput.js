import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import debounce from 'lodash/debounce';

import Autocomplete from '@components/Autocomplete';
import Input from '@components/Input';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import { ListItem, ListItemText, ListItemIcon, ListItemAction } from '@components/List';
import HistoryRestoreIcon from '@svg-icons/material/HistoryRestoreIcon';
import useLocalStorage from '@components/hooks/useLocalStorage';
import IconButton from '@components/IconButton';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import QuickSearchService from '@services/QuickSearchService';
import useMountedRef from '@components/hooks/useMountedRef';

const defaultQueriesHistory = ['jeans', 'shirt'];

const getItemText = ({ title }) => title;

const filterItems = (items, value) => {
    const query = value.trim().toLowerCase();

    return items.filter((item) => {
        let itemText = getItemText(item);
        itemText = itemText.toLowerCase();

        return itemText.indexOf(query) !== -1;
    });
};

const HeaderSearchInput = (props) => {
    const { queryMinLength = 3, historyMaxLength = 5 } = props;

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [queriesHistory, setQueriesHistory] = useLocalStorage('queriesHistory', []);

    const mountedRef = useMountedRef();
    const forcedOpenRef = useRef(false);
    const queryRef = useRef(query);

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
        [setQueriesHistory, historyMaxLength]
    );

    const handleInputChange = useCallback((ev) => {
        setQuery(ev.target.value);
    }, []);

    const handleSelect = useCallback((value = null) => {
        console.log({ value });
        setOpen(false);
    }, []);

    const handleInputKeyDown = useCallback(
        (ev) => {
            if (ev.key === 'Enter' && query.length >= queryMinLength) {
                handleSelect(query);
                addToQueriesHistory(query);
            }
        },
        [query, queryMinLength, handleSelect, addToQueriesHistory]
    );

    const handleItemClick = useCallback(
        (ev, value) => {
            if (value) {
                handleSelect(value.title);
            }
        },
        [handleSelect]
    );

    const handleFilterItems = useCallback(
        (items) => {
            if (query.length >= queryMinLength) {
                return filterItems(items, query);
            }
            return items;
        },
        [query, queryMinLength]
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
    }, [open, query, queryMinLength, queriesHistoryData, requestData]);

    useEffect(() => {
        handleData();
    }, [handleData]);

    return (
        <Autocomplete
            open={open}
            loading={loading}
            data={data}
            inputValue={query}
            filterItems={handleFilterItems}
            className="header__search-input"
            fullWidth
            openButton={false}
            loadingText={null}
            emptyText={null}
            getItemSelected={() => false}
            getItemText={({ title }) => title}
            renderInput={() => {
                return (
                    <Input
                        placeholder="What are you looking for?"
                        prependAdornment={() => <SearchIcon size="medium" />}
                    />
                );
            }}
            renderItem={({ title, history = false, cleanable = false }, { index }) => {
                const matches = match(title, query);
                const parts = parse(title, matches);

                let highlightedText = title;

                if (!history && parts && parts.length > 0) {
                    highlightedText = parts.map((part, partIndex) => {
                        return (
                            <span
                                key={partIndex}
                                style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                                {part.text}
                            </span>
                        );
                    });
                }

                return (
                    <ListItem>
                        <ListItemIcon>
                            {history ? (
                                <HistoryRestoreIcon size="medium" />
                            ) : (
                                <SearchIcon size="medium" />
                            )}
                        </ListItemIcon>
                        <ListItemText flex>{highlightedText}</ListItemText>
                        {history && cleanable && (
                            <ListItemAction tabIndex="-1">
                                <IconButton
                                    size="small"
                                    onClick={handleDeleteQueryHistoryItem(index)}
                                >
                                    <ClearCloseIcon />
                                </IconButton>
                            </ListItemAction>
                        )}
                    </ListItem>
                );
            }}
            onOpen={handleOpen}
            onClose={handleClose}
            onInputChange={handleInputChange}
            onInputKeyDown={handleInputKeyDown}
            onItemClick={handleItemClick}
        />
    );
};

HeaderSearchInput.propTypes = {
    queryMinLength: PropTypes.number,
    historyMaxLength: PropTypes.number
};

export default HeaderSearchInput;
