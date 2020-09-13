import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import IconButton from '@ui/IconButton';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import Badge from '@ui/Badge';
import Tooltip from '@ui/Tooltip';
import { useWindowManager } from '@ui/WindowManager';

import { authSelector } from '@store/identity';
import { numOfWishlistItemsSelector } from '@store/wishlist';
import { useHistory, useRouteMatch } from 'react-router-dom';

const HeaderWishlistAction = (props) => {
    const num = useSelector(numOfWishlistItemsSelector);
    const isAuth = useSelector(authSelector);

    const { openWindow } = useWindowManager();
    const { path: basePath } = useRouteMatch();
    const history = useHistory();

    const badgeValue = num && isAuth ? num : undefined;
    const tooltipTitle = !(num && isAuth) ? 'Your wish list is empty' : undefined;

    const handleClick = useCallback(
        (ev) => {
            if (!isAuth) {
                openWindow('LoginWindow');
            } else {
                history.push(`${basePath}wishlist`);
            }
        },
        [isAuth, openWindow, history, basePath]
    );

    return (
        <Tooltip title={tooltipTitle} disableFocusListener>
            <IconButton primary size="large" onClick={handleClick}>
                <Badge value={badgeValue}>
                    <HeartIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default memo(HeaderWishlistAction);
