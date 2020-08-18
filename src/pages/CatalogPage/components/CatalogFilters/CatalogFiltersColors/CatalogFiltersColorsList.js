import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import List, { ListItemIcon, ListItemText, ListItem } from '@ui/List';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';

import data from '@remote/json/colors.json';

import CatalogFiltersColorsListItem from './CatalogFiltersColorsListItem';
import CatalogFiltersListItemToggle from '../components/CatalogFiltersListItemToggle/CatalogFiltersListItemToggle';

const CatalogFiltersColorsList = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemClick = useCallback((item) => {
        const { id } = item;

        setSelectedItems((prevState) => {
            if (prevState.indexOf(id) !== -1) {
                return prevState.filter((selectedItem) => selectedItem !== id);
            }

            return [...prevState, id];
        });
    }, []);

    const items = data.map((item) => {
        const { id } = item;
        const selected = selectedItems.indexOf(id) !== -1;

        return (
            <CatalogFiltersColorsListItem
                key={id}
                {...item}
                selected={selected}
                onClick={handleItemClick}
            />
        );
    });

    return (
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
    );
};

CatalogFiltersColorsList.propTypes = {};

export default CatalogFiltersColorsList;
