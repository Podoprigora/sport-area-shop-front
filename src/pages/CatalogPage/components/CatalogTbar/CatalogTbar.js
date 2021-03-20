import React, { useCallback, memo } from 'react';

import { useEventCallback } from '@ui/utils';
import { useWindowManager } from '@ui/WindowManager';
import { Hidden } from '@ui/Hidden';
import { Button } from '@ui/Button';
import { FilterIcon } from '@ui/svg-icons/feather';
import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageActions
} from '@pages/CatalogPage/context';
import CatalogSortByDropdown from './CatalogSortByDropdown';

const CatalogTbar = () => {
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
                style={{ minWidth: '18rem', marginLeft: 'auto' }}
                onChange={handleSortChange}
            />
        </div>
    );
};

export default memo(CatalogTbar);
