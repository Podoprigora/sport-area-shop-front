import React from 'react';
import IconButton from '@ui/IconButton';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';

const HeaderActions = () => {
    return (
        <div className="header__actions">
            <IconButton primary size="large">
                <HeartIcon />
            </IconButton>
            <IconButton primary size="large">
                <ShoppingCartIcon />
            </IconButton>
        </div>
    );
};

export default HeaderActions;
