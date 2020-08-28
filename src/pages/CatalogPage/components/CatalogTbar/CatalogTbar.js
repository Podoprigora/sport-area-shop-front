import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import Hidden from '@ui/Hidden';
import Button from '@ui/Button';
import FilterIcon from '@svg-icons/feather/FilterIcon';
import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageActions
} from '@pages/CatalogPage/context';
import CatalogSortBySelect from './CatalogSortBySelect';

const CatalogTbar = (props) => {
    const state = useCatalogPageState();
    const { sortBy } = useCatalogPageSelectors(state);
    const { onChangeSort } = useCatalogPageActions();

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
        <div className="catalog-page__tbar">
            <Hidden lgUp>
                <Button primary centered icon={FilterIcon}>
                    Filters
                </Button>
            </Hidden>
            <CatalogSortBySelect value={sortBy} onChange={handleSortChange} />
        </div>
    );
};

export default memo(CatalogTbar);
