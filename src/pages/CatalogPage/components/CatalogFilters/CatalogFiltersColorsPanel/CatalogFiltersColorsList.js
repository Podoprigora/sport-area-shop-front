import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import FiltersList from '@components/FiltersList/FiltersList';

const getItemTitle = (item = {}) => item.name;

const CatalogFiltersColorsList = (props) => {
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

CatalogFiltersColorsList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string
        })
    ),
    selected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    onChange: PropTypes.func
};

export default CatalogFiltersColorsList;
