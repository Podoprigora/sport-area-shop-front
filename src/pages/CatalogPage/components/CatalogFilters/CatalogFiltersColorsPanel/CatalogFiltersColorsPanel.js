import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';

import CatalogFiltersColorsList from './CatalogFiltersColorsList';
import CatalogFiltersExpandedPanel from '../components/CatalogFiltersExpandedPanel';

const CatalogFiltersColorsPanel = (props) => {
    const { id, title, items = [], selected: selectedProp = [], onChange } = props;
    let selected = selectedProp;

    if (typeof selected === 'string') {
        selected = [selected];
    }

    const handleChange = useEventCallback((ev, selectedValues) => {
        if (onChange) {
            onChange(id, selectedValues);
        }
    });

    const handleResetClick = useEventCallback((ev) => {
        ev.stopPropagation();

        handleChange(ev, []);
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
            <CatalogFiltersColorsList items={items} selected={selected} onChange={handleChange} />
        </CatalogFiltersExpandedPanel>
    );
};

CatalogFiltersColorsPanel.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    items: PropTypes.array,
    selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onChange: PropTypes.func
};

export default memo(CatalogFiltersColorsPanel);
