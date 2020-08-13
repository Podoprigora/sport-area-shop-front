import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import Hidden from '@ui/Hidden';
import Button from '@ui/Button';
import FilterIcon from '@svg-icons/feather/FilterIcon';
import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageAcitions
} from '@pages/CatalogPage/context';
import CatalogGridSortBySelect from './CatalogGridSortBySelect';

const CatalogGridTbar = (props) => {
    const state = useCatalogPageState();
    const { sortBy } = useCatalogPageSelectors(state);
    const { onChangeSort } = useCatalogPageAcitions();

    const handleSortChange = useCallback(
        (ev) => {
            if (onChangeSort) {
                const value = ev.target.value;
                onChangeSort(value);
            }
        },
        [onChangeSort]
    );

    return (
        <div className="catalog-grid__tbar">
            <Hidden lgUp>
                <Button primary centered icon={FilterIcon}>
                    Filters
                </Button>
            </Hidden>
            <CatalogGridSortBySelect value={sortBy} onChange={handleSortChange} />
        </div>
    );
};

export default memo(CatalogGridTbar);
