import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import CellList from '@ui/CellList';
import useSelectedState from '@ui/hooks/useSelectedState';
import data from '@remote/json/sizes.json';

import CatalogFiltersSizesListItem from './CatalogFiltersSizesListItem';

const CatalogFiltersSizesList = (props) => {
    const [selectedItems, setSelectedItems] = useSelectedState([]);

    const handleItemClick = useCallback(
        (item) => {
            const { id } = item;

            setSelectedItems(id);
        },
        [setSelectedItems]
    );

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

CatalogFiltersSizesList.propTypes = {};

export default CatalogFiltersSizesList;
