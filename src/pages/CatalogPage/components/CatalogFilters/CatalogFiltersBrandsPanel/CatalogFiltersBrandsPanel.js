import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';

import CatalogFiltersBrandsList from './CatalogFiltersBrandsList';
import CatalogFiltersExpandedPanel from '../components/CatalogFiltersExpandedPanel';

const CatalogFiltersBrandsPanel = (props) => {
    const { id, title, items = [], selected: selectedProp = [], onChange } = props;
    let selected = selectedProp;

    if (selected && typeof selected === 'string') {
        selected = [selected];
    }

    const handleChange = useEventCallback((ev, selectedValues) => {
        if (onChange) {
            onChange(id, selectedValues);
        }
    });

    const handleResetClick = useEventCallback((ev) => {
        ev.stopPropagation();

        handleChange(ev, undefined);
    });

    if (items.length === 0) {
        return null;
    }

    return (
        <CatalogFiltersExpandedPanel
            title={title}
            resetButton={selected.length > 0}
            onResetClick={handleResetClick}
        >
            <CatalogFiltersBrandsList items={items} selected={selected} onChange={handleChange} />
        </CatalogFiltersExpandedPanel>
    );
};

CatalogFiltersBrandsPanel.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    items: PropTypes.array,
    selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onChange: PropTypes.func
};

export default memo(CatalogFiltersBrandsPanel);
