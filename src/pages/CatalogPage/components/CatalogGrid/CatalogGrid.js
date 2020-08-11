import React, { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import useScreenMask from '@contexts/ScreenMaskContext';
import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageAcitions
} from '@pages/CatalogPage/context';

import CatalogGridBody from './CatalogGridBody';
import CatalogGridTbar from './CatalogGridTbar';
import CatalogGridPagination from './CatalogGridPagination';
import CatalogGridLoadMore from './CatalogGridLoadMore';

const CatalogGrid = (props) => {
    const catalogPageState = useCatalogPageState();
    const {
        products,
        initialLoading,
        loading,
        itemsPerPage,
        pagesCount,
        selectedPages
    } = useCatalogPageSelectors(catalogPageState);
    const { onChangePage } = useCatalogPageAcitions();
    const { toggleMask, isMaskShown } = useScreenMask();

    const handlePageChange = useCallback(
        (page) => {
            if (onChangePage) {
                document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
                onChangePage(page);
            }
        },
        [onChangePage]
    );

    useEffect(() => {
        toggleMask(loading);
    }, [loading, toggleMask, isMaskShown]);

    return (
        <div className="catalog-grid">
            <CatalogGridTbar />
            <CatalogGridBody
                items={products}
                loading={initialLoading}
                itemsPerPage={itemsPerPage}
            />
            {!initialLoading && pagesCount > 0 && <CatalogGridLoadMore />}
            {!initialLoading && (
                <CatalogGridPagination
                    selected={selectedPages}
                    count={pagesCount}
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
};

CatalogGrid.propTypes = {
    loading: PropTypes.bool
};

export default memo(CatalogGrid);
