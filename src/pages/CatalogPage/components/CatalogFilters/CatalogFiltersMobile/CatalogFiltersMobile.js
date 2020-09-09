import React, { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';

import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageActions
} from '@pages/CatalogPage/context';
import CatalogFiltersMobileWindow from './CatalogFiltersMobileWindow';
import getCatalogFiltersComponentById from '../getCatalogFiltersComponentById';

const CatalogFiltersMobile = (props) => {
    const catalogPageState = useCatalogPageState();
    const { filtersItems, selectedFilters } = useCatalogPageSelectors(catalogPageState);
    const { onChangeFilters } = useCatalogPageActions();

    const { isOpenWindow, closeWindow } = useWindowManager();
    const openWindow = isOpenWindow('CatalogFiltersMobileWindow');

    const [selectedFiltersState, setSelectedFiltersState] = useState({});

    const handleWindowClose = useEventCallback(() => {
        closeWindow('CatalogFiltersMobileWindow');
    });

    const handleResetAll = useEventCallback(() => {
        setSelectedFiltersState({});
    });

    const handleAccept = useCallback(() => {
        onChangeFilters(selectedFiltersState, false);
        handleWindowClose();
    }, [handleWindowClose, onChangeFilters, selectedFiltersState]);

    const handleChange = useEventCallback((id, selected) => {
        setSelectedFiltersState((prevState) => ({ ...prevState, [id]: selected }));
    }, []);

    useEffect(() => {
        if (!openWindow) {
            return () => {
                setSelectedFiltersState(selectedFilters);
            };
        }

        return undefined;
    }, [openWindow, selectedFilters]);

    const items = filtersItems.map((item) => {
        const { id } = item;
        const Component = getCatalogFiltersComponentById(id);
        const selected = selectedFiltersState[id];

        if (!Component) {
            return null;
        }

        return <Component key={id} {...item} selected={selected} mobile onChange={handleChange} />;
    });

    const disabledResetAllButton = Object.keys(selectedFiltersState).length === 0;

    return (
        <CatalogFiltersMobileWindow
            open={openWindow}
            disabledResetAllButton={disabledResetAllButton}
            onClose={handleWindowClose}
            onResetAll={handleResetAll}
            onAccept={handleAccept}
        >
            {items}
        </CatalogFiltersMobileWindow>
    );
};

CatalogFiltersMobile.propTypes = {};

export default CatalogFiltersMobile;
