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
import CatalogSortBySelect from './CatalogSortBySelect';

const CatalogTbar = (props) => {
    const state = useCatalogPageState();
    const { sortBy } = useCatalogPageSelectors(state);
    const { onChangeSort } = useCatalogPageActions();
    const { openWindow } = useWindowManager();

    const handleSortChange = useCallback(
        (ev, value) => {
            if (onChangeSort) {
                onChangeSort(value);
            }
        },
        [onChangeSort]
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
            <CatalogSortBySelect
                value={sortBy}
                className="u-margin-l-auto"
                onChange={handleSortChange}
            />
        </div>
    );
};

export default memo(CatalogTbar);
