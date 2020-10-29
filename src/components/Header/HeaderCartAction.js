import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@ui/IconButton';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import useEventCallback from '@ui/hooks/useEventCallback';
import { numOfCartItemsSelector } from '@store/cart';
import Badge from '@ui/Badge';
import Tooltip from '@ui/Tooltip';

const HeaderCartAction = (props) => {
    const numOfCartItems = useSelector(numOfCartItemsSelector);

    const handleClick = useEventCallback(() => {
        console.log('cart btn click');
    });

    const badgeValue = numOfCartItems > 0 ? numOfCartItems : 0;
    const tooltipTitle = !numOfCartItems ? 'Your cart is empty' : '';

    return useMemo(() => {
        return (
            <Tooltip title={tooltipTitle}>
                <IconButton primary size="large" onClick={handleClick}>
                    <Badge value={badgeValue}>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
        );
    }, [badgeValue, tooltipTitle, handleClick]);
};

export default HeaderCartAction;
