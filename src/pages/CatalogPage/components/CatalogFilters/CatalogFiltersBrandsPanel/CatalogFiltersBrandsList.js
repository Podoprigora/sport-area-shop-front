import React from 'react';
import PropTypes from 'prop-types';

import { useEventCallback } from '@ui/utils';

import FiltersList from '@components/FiltersList/FiltersList';

const getItemTitle = (item = {}) => item.title;

const CatalogFiltersBrandsList = (props) => {
    const { items, selected = [], onChange } = props;

    const handleChange = useEventCallback((ev, selectedItems) => {
        if (onChange) {
            onChange(ev, selectedItems);
        }
    });

    return (
        <FiltersList
            className="catalog-page-filters-panel__list"
            quickSearch
            getItemTitle={getItemTitle}
            items={items}
            selected={selected}
            minLength={8}
            defaultExpanded={selected.length > 0}
            onChange={handleChange}
        />
    );
};

CatalogFiltersBrandsList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string
        })
    ),
    selected: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func
};

export default CatalogFiltersBrandsList;
