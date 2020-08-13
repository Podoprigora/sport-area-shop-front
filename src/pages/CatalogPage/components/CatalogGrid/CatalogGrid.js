import React, { memo, useCallback, useEffect, useState } from 'react';
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
import CatalogGridLoadingMore from './CatalogGridLoadingMore';

const CatalogGrid = (props) => {
    const catalogPageState = useCatalogPageState();
    const {
        products,
        initialLoading,
        loading,
        itemsPerPage,
        pagesCount,
        selectedPages,
        isLastPage
    } = useCatalogPageSelectors(catalogPageState);
    const { onChangePage, onLoadingMore } = useCatalogPageAcitions();
    const { toggleMask } = useScreenMask();
    const [loadingMoreLoading, setLoadingMoreLoading] = useState(false);

    const handlePageChange = useCallback(
        (page) => {
            if (onChangePage) {
                document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
                onChangePage(page);
            }
        },
        [onChangePage]
    );

    const handleLoadingMoreClick = useCallback(() => {
        setLoadingMoreLoading(true);
        onLoadingMore();
    }, [onLoadingMore]);

    useEffect(() => {
        if (loading && loadingMoreLoading) {
            return () => {
                setLoadingMoreLoading(false);
            };
        }

        return undefined;
    }, [loading, loadingMoreLoading]);

    useEffect(() => {
        toggleMask(loading);
    }, [loading, toggleMask]);

    return (
        <div className="catalog-grid">
            <CatalogGridTbar />
            <CatalogGridBody
                items={products}
                loading={initialLoading}
                itemsPerPage={itemsPerPage}
            />
            {!initialLoading && pagesCount > 0 && !isLastPage && (
                <CatalogGridLoadingMore
                    loading={loadingMoreLoading}
                    onClick={handleLoadingMoreClick}
                />
            )}
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
