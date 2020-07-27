import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@ui/IconButton';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import FavoriteIcon from '@svg-icons/material/FavoriteIcon';

const ProductActionAddToFavorite = (props) => {
    const { selected, onClick } = props;

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
            <IconButton size="large" onClick={handleClick}>
                {selected ? <FavoriteIcon /> : <FavoriteOutlineIcon />}
            </IconButton>
        </div>
    );
};

ProductActionAddToFavorite.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default ProductActionAddToFavorite;
