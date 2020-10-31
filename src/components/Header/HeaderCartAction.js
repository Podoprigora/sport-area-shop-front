import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@ui/IconButton';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import useEventCallback from '@ui/hooks/useEventCallback';
import { numOfCartItemsSelector } from '@store/cart';
import Badge from '@ui/Badge';
import Tooltip from '@ui/Tooltip';
import { useWindowManager } from '@ui/WindowManager';

const HeaderCartAction = (props) => {
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
