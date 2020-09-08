import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';

import CatalogFiltersPriceRangeForm from './CatalogFiltersPriceRangeForm';
import CatalogFiltersExpandedPanel from '../components/CatalogFiltersExpandedPanel';

const CatalogFiltersPriceRangePanel = (props) => {
    const { id, title, range, selected = [], onChange } = props;

    const handleChange = useEventCallback((ev, values) => {
        if (onChange) {
            onChange(id, values);
        }
    });

    const handleResetClick = useEventCallback((ev) => {
        ev.stopPropagation();

        handleChange(ev, []);
    });

    return (
        <CatalogFiltersExpandedPanel
            title={title}
            resetButton={selected.length > 0}
            onResetClick={handleResetClick}
        >
            <CatalogFiltersPriceRangeForm
                range={range}
                selected={selected}
                onChange={handleChange}
            />
        </CatalogFiltersExpandedPanel>
    );
};

CatalogFiltersPriceRangePanel.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    range: PropTypes.array,
    selected: PropTypes.array,
    onChange: PropTypes.func
};

export default CatalogFiltersPriceRangePanel;