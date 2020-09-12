import React, { memo } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@ui/IconButton';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import { useSelector } from 'react-redux';

import { numOfFavoritesSelector } from '@store/favorites';
import Badge from '@ui/Badge';

const HeaderFavoritesAction = (props) => {
    const badgeValue = useSelector(numOfFavoritesSelector);

    return (
        <Badge value={badgeValue}>
            <IconButton primary size="large">
                <HeartIcon />
            </IconButton>
        </Badge>
    );
};

export default memo(HeaderFavoritesAction);
