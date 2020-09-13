import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import IconButton from '@ui/IconButton';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import Badge from '@ui/Badge';

import { authSelector } from '@store/identity';
import { numOfFavoritesSelector } from '@store/favorites';

const HeaderFavoritesAction = (props) => {
    const num = useSelector(numOfFavoritesSelector);
    const isAuth = useSelector(authSelector);

    const badgeValue = num && isAuth ? num : undefined;

    return (
        <IconButton primary size="large">
            <Badge value={badgeValue}>
                <HeartIcon />
            </Badge>
        </IconButton>
    );
};

export default memo(HeaderFavoritesAction);
