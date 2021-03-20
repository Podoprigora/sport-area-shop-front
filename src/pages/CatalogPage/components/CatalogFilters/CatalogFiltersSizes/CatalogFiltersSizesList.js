import React from 'react';
import PropTypes from 'prop-types';

import { useEventCallback } from '@ui/utils';
import { CellList } from '@ui/CellList';
import FiltersList from '@components/FiltersList/FiltersList';

import CatalogFiltersSizesListItem from './CatalogFiltersSizesListItem';

const getItemTitle = (item = {}) => item.name;

const renderItem = (item) => {
    return <CatalogFiltersSizesListItem {...item} />;
};

const CatalogFiltersSizesList = (props) => {
    const { items, selected, onChange } = props;

    const handleChange = useEventCallback((ev, selectedItems) => {
        if (onChange) {
            onChange(ev, selectedItems);
        }
    });

    return (
        <FiltersList
            component={CellList}
            className="catalog-page-filters-panel__cell-list"
            quickSearch={false}
            getItemTitle={getItemTitle}
            items={items}
            selected={selected}
            renderItem={renderItem}
            onChange={handleChange}
        />
    );
};

CatalogFiltersSizesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string
        })
    ),
    selected: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func
};

export default CatalogFiltersSizesList;
