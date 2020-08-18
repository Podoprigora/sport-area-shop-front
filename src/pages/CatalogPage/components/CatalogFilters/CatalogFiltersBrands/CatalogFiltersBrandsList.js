import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import List, { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import data from '@remote/json/brands.json';

import CatalogFiltersBrandsListItem from './CatalogFiltersBrandsListItem';
import CatalogFiltersBrandsSearch from './CatalogFiltersBrandsSearch';
import CatalogFiltersListItemToggle from '../components/CatalogFiltersListItemToggle/CatalogFiltersListItemToggle';

const CatalogFiltersBrandsList = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleItemClick = useCallback((item) => {
        const { name } = item;

        setSelectedItems((prevState) => {
            if (prevState.indexOf(name) !== -1) {
                return prevState.filter((selectedItem) => selectedItem !== name);
            }

            return [...prevState, name];
        });
    }, []);

    const handleSearchChange = useCallback(
        debounce((value = '') => {
            setSearchValue(String(value).toLowerCase());
        }, 600),
        []
    );

    const filteredItems = useMemo(() => {
        return data.filter((item) => {
            const { title } = item;

            return searchValue ? title.toLowerCase().indexOf(searchValue) !== -1 : true;
        });
    }, [searchValue]);

    const items = filteredItems.map((item) => {
        const { name } = item;
        const selected = selectedItems.indexOf(name) !== -1;

        return (
            <CatalogFiltersBrandsListItem
                key={name}
                {...item}
                selected={selected}
                onClick={handleItemClick}
            />
        );
    });

    return (
        <>
            <CatalogFiltersBrandsSearch onChange={handleSearchChange} />
            <List
                className="catalog-page-filters-panel__list"
                minLength={8}
                renderItemToggle={(renderProps) => {
                    return <CatalogFiltersListItemToggle {...renderProps} />;
                }}
                // maxHeight={350}
                // scrollbarProps={{ enableVerticalTrack: true }}
            >
                {items}
            </List>
        </>
    );
};

CatalogFiltersBrandsList.propTypes = {};

export default CatalogFiltersBrandsList;
