import React from 'react';

import IconButton from '@ui/IconButton';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import HeaderFavoritesAction from './HeaderFavoritesAction';

const HeaderActions = () => {
    return (
        <div className="header__actions">
            <HeaderFavoritesAction />
            <IconButton primary size="large">
                <ShoppingCartIcon />
            </IconButton>
        </div>
    );
};

export default HeaderActions;
