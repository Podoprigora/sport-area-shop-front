import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@components/Autocomplete';
import Input from '@components/Input';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import { ListItem, ListItemText, ListItemIcon } from '@components/List';
import HistoryRestoreIcon from '@svg-icons/material/HistoryRestoreIcon';

const defaultQueriesHistory = [
    { title: 'jeans', history: true },
    { title: 'shirt', history: true },
    { title: 'vans', history: true },
    { title: 'Rell', history: true }
];

const searchResult = [
    {
        title: 'Naketano shirt damen'
    },
    {
        title: 'quick silver baysic pocket t-shirt men'
    },
    {
        title: "O'neill Tee shirt"
    },
    {
        title: 'vans shirt'
    },
    {
        title: "O'Neill cordon t shirt"
    },
    {
        title: 'element blazin t-shirt'
    },
    {
        title: 'Element Blazin - T-shirt for Men - Blue'
    },
    {
        title: 'Adidas men shirts'
    },
    {
        title: 'Kid boys vans shirt'
    },
    {
        title: 'Squandering Our Lives T-shirt'
    },
    {
        title: 'Rell jeans'
    },
    {
        title: 'Men Streetwear jeans Tapered jeans'
    },
    {
        title: 'jeans Streetwear Destroyed jeans'
    },
    {
        title: 'damen streetwear jeans denim dungarees'
    },
    {
        title: 'Women Streetwear jeans Loose Fit jeans'
    },
    {
        title: 'Herren Streetwear jeans Tapered jeans'
    },
    {
        title: 'Kids Streetwear jeans'
    },
    {
        title: 'Men Streetwear jeans Bootcut jeans'
    },
    {
        title: 'Herren Streetwear jeans Destroyed jeans'
    },
    {
        title: 'Damen Streetwear jeans Slim Fit jeans'
    }
];

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
    const { queryLength = 3 } = props;

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    const isHistoryData = useMemo(() => {
        if (data && data.length > 0) {
            return (data[0] || {}).history === true;
        }
        return false;
    }, [data]);

    const handleInputChange = useCallback((ev) => {
        let value = ev.target.value;
        if (value) {
            value = value.trim();
            setQuery(value);
        }
    }, []);

    const handleSelect = useCallback((value = null) => {
        console.log({ value });
    }, []);

    const handleInputKeyDown = useCallback(
        (ev) => {
            if (query.length >= queryLength) {
                handleSelect(query);
            }
        },
        [query, queryLength, handleSelect]
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
            if (query.length >= queryLength) {
                return filterItems(items, query);
            }
            return items;
        },
        [query, queryLength]
    );

    useEffect(() => {
        if (query.length >= queryLength) {
            setData(searchResult);
        } else {
            setData(defaultQueriesHistory);
        }
    }, [query, queryLength]);

    return (
        <Autocomplete
            data={data}
            inputValue={query}
            filterItems={handleFilterItems}
            className="header__search-input"
            fullWidth
            openButton={false}
            getItemSelected={() => false}
            getItemText={({ title }) => title}
            defaultHighlightedIndex={isHistoryData ? -1 : 0}
            renderInput={(inputProps) => {
                return (
                    <Input
                        placeholder="What are you looking for?"
                        prependAdornment={() => <SearchIcon size="medium" />}
                    />
                );
            }}
            renderItem={({ title, history = false }) => {
                return (
                    <ListItem>
                        <ListItemIcon>
                            {history ? (
                                <HistoryRestoreIcon size="medium" />
                            ) : (
                                <SearchIcon size="medium" />
                            )}
                        </ListItemIcon>
                        <ListItemText>{title}</ListItemText>
                    </ListItem>
                );
            }}
            onInputChange={handleInputChange}
            onInputKeyDown={handleInputKeyDown}
            onItemClick={handleItemClick}
        />
    );
};

HeaderSearchInput.propTypes = {
    queryLength: PropTypes.number
};

export default HeaderSearchInput;
