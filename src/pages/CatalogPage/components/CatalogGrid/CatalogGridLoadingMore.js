import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import RotateCwIcon from '@svg-icons/feather/RotateCwIcon';
import CircularProgress from '@ui/CircularProgress';
import Button from '@ui/Button';

const CatalogGridLoadingMore = (props) => {
    const { loading, onClick } = props;

    const handleClick = useCallback(
        (ev) => {
            if (onClick) {
                onClick(ev);
            }
        },
        [onClick]
    );

    const handleMouseDown = useCallback((ev) => {
        ev.preventDefault();
    }, []);

    return (
        <div className="catalog-grid__load-more">
            <Button
                primary
                transparent
                icon={RotateCwIcon}
                loadingComponent={<CircularProgress size="medium" />}
                loading={loading}
                iconSize="xlarge"
                onClick={handleClick}
                onMouseDown={handleMouseDown}
            >
                Load more products
            </Button>
        </div>
    );
};

CatalogGridLoadingMore.propTypes = {
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(CatalogGridLoadingMore);
