import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import CellList from '@ui/CellList';
import data from '@remote/json/sizes.json';

import CatalogFiltersSizesListItem from './CatalogFiltersSizesListItem';

const CatalogFiltersBrandsList = (props) => {
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
            <CatalogFiltersSizesListItem
                key={id}
                {...item}
                selected={selected}
                onClick={handleItemClick}
            />
        );
    });

    return <CellList className="catalog-page-filters-panel__cell-list">{items}</CellList>;
};

CatalogFiltersBrandsList.propTypes = {};

export default CatalogFiltersBrandsList;
