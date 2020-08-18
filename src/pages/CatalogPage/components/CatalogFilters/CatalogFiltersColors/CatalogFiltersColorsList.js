import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import List from '@ui/List';
import useSelectedState from '@ui/hooks/useSelectedState';

import data from '@remote/json/colors.json';

import CatalogFiltersColorsListItem from './CatalogFiltersColorsListItem';
import CatalogFiltersListItemToggle from '../components/CatalogFiltersListItemToggle/CatalogFiltersListItemToggle';

const CatalogFiltersColorsList = (props) => {
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
        >
            {items}
        </List>
    );
};

CatalogFiltersColorsList.propTypes = {};

export default CatalogFiltersColorsList;
