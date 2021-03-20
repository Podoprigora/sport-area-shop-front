import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { IconButton } from '@ui/IconButton';
import { ShoppingCartIcon } from '@ui/svg-icons/feather';
import { useEventCallback } from '@ui/utils';
import { Badge } from '@ui/Badge';
import { useWindowManager } from '@ui/WindowManager';
import { numOfCartItemsSelector } from '@store/cart';

const HeaderCartAction = () => {
    const numOfCartItems = useSelector(numOfCartItemsSelector);
    const { openWindow } = useWindowManager();

    const handleClick = useEventCallback(() => {
        openWindow('CartWindow');
    });

    const badgeValue = numOfCartItems > 0 ? numOfCartItems : 0;

    return useMemo(() => {
        return (
            <IconButton primary size="large" onClick={handleClick}>
                <Badge value={badgeValue}>
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        );
    }, [badgeValue, handleClick]);
};

export default HeaderCartAction;
