import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import List from '@ui/List';
import data from '@remote/json/colors.json';

import CatalogFiltersColorsListItem from './CatalogFiltersColorsListItem';

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
            maxHeight={350}
            scrollbarProps={{ enableVerticalTrack: true }}
        >
            {items}
        </List>
    );
};

CatalogFiltersColorsList.propTypes = {};

export default CatalogFiltersColorsList;
