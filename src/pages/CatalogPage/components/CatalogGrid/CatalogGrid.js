import React, { memo, useCallback, useEffect, useState } from 'react';

import useScreenMask from '@contexts/ScreenMaskContext';
import {
    useCatalogPageState,
    useCatalogPageSelectors,
    useCatalogPageActions
} from '@pages/CatalogPage/context';

import CatalogGridBody from './CatalogGridBody';
import CatalogGridPagination from './CatalogGridPagination';
import CatalogGridLoadingMore from './CatalogGridLoadingMore';

const CatalogGrid = () => {
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

    const { changePage, loadingMore } = useCatalogPageActions();
    const { toggleMask } = useScreenMask();
    const [loadingMoreLoading, setLoadingMoreLoading] = useState(false);

    const handlePageChange = useCallback(
        (ev, page) => {
            if (changePage) {
                changePage(page);
            }
        },
        [changePage]
    );

    const handleLoadingMoreClick = useCallback(() => {
        setLoadingMoreLoading(true);
        loadingMore();
    }, [loadingMore]);

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

    useEffect(() => {
        if (loading && !loadingMoreLoading) {
            return () => {
                document.documentElement.scrollTo({
                    top: 0
                });
            };
        }
        return undefined;
    }, [loading, loadingMoreLoading]);

    return (
        <div className="catalog-grid">
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

export default memo(CatalogGrid);
