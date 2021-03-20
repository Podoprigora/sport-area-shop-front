import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@ui/IconButton';
import { CircularProgress } from '@ui/CircularProgress';
import { FavoriteIcon, FavoriteOutlineIcon } from '@ui/svg-icons/material';

const ProductActionAddToWishlistView = (props) => {
    const { selected, loading, onClick } = props;

    const handleClick = useCallback(
        (ev) => {
            if (onClick) {
                onClick(ev);
            }
        },
        [onClick]
    );

    return (
        <div className="product__action product__action--favorite">
            {loading ? (
                <CircularProgress primary size="small" />
            ) : (
                <IconButton size="large" onClick={handleClick}>
                    {selected ? <FavoriteIcon /> : <FavoriteOutlineIcon />}
                </IconButton>
            )}
        </div>
    );
};

ProductActionAddToWishlistView.propTypes = {
    selected: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(ProductActionAddToWishlistView);
