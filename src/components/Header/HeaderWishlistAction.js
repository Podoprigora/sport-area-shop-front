import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { IconButton } from '@ui/IconButton';
import { Badge } from '@ui/Badge';
import { Tooltip } from '@ui/Tooltip';
import { useWindowManager } from '@ui/WindowManager';
import { HeartIcon } from '@ui/svg-icons/feather';
import { useEventCallback } from '@ui/utils';

import { authSelector } from '@store/identity';
import { numOfWishlistItemsSelector } from '@store/wishlist';

const HeaderWishlistAction = () => {
    const num = useSelector(numOfWishlistItemsSelector);
    const isAuth = useSelector(authSelector);

    const { openWindow } = useWindowManager();
    const { path: basePath } = useRouteMatch();
    const history = useHistory();

    const badgeValue = num && isAuth ? num : undefined;
    const tooltipTitle = !(num && isAuth) ? 'Your wish list is empty' : undefined;

    const handleClick = useEventCallback((ev) => {
        if (!isAuth) {
            openWindow('LoginWindow');
        } else {
            history.push(`${basePath}wishlist`);
        }
    });

    return useMemo(() => {
        return (
            <Tooltip title={tooltipTitle} disableFocusListener>
                <IconButton primary size="large" onClick={handleClick}>
                    <Badge value={badgeValue}>
                        <HeartIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
        );
    }, [badgeValue, handleClick, tooltipTitle]);
};

export default memo(HeaderWishlistAction);
