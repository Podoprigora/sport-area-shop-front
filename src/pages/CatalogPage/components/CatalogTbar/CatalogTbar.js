import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import { useWindowManager } from '@ui/WindowManager';
import Hidden from '@ui/Hidden';
import Button from '@ui/Button';
import FilterIcon from '@svg-icons/feather/FilterIcon';
import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageActions
} from '@pages/CatalogPage/context';
import CatalogSortByDropdown from './CatalogSortByDropdown';

const CatalogTbar = (props) => {
    const state = useCatalogPageState();
    const { sortBy } = useCatalogPageSelectors(state);
    const { changeSort } = useCatalogPageActions();
    const { openWindow } = useWindowManager();

    const handleSortChange = useCallback(
        (ev, value) => {
            if (changeSort) {
                changeSort(value);
            }
        },
        [changeSort]
    );

    const handleFiltersClick = useEventCallback(() => {
        openWindow('CatalogFiltersMobileWindow');
    });

    return (
        <div className="catalog-page__tbar tbar">
            <Hidden lgUp>
                <Button plain centered icon={FilterIcon} onClick={handleFiltersClick}>
                    Filters
                </Button>
            </Hidden>
            <CatalogSortByDropdown
                value={sortBy}
                className="u-margin-l-auto"
                onChange={handleSortChange}
            />
        </div>
    );
};

export default memo(CatalogTbar);
