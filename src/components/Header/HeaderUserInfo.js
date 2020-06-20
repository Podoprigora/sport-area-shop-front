import React, { memo, useCallback } from 'react';

import Link from '@ui/Link';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';
import ButtonMenu from '@ui/ButtonMenu';
import { ListItem, ListItemText, ListItemIcon } from '@ui/List';
import Menu from '@ui/Menu';
import Divider from '@ui/Divider';

import UserPlusIcon from '@svg-icons/feather/UserPlusIcon';
import LoginIcon from '@svg-icons/feather/LoginIcon';
import UserIcon from '@svg-icons/feather/UserIcon';
import ShoppingBagIcon from '@svg-icons/feather/ShoppingBagIcon';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import CreditCardIcon from '@svg-icons/feather/CreditCardIcon';
import KeyIcon from '@svg-icons/feather/KeyIcon';
import LogOutIcon from '@svg-icons/feather/LogOutIcon';

const auth = true;

const HeaderUserInfo = () => {
    const { openWindow } = useWindowManager();

    const handleLoginClick = useEventCallback((ev) => {
        openWindow('LoginWindow');
    });

    const handleRegisterClick = useEventCallback((ev) => {
        openWindow('RegisterWindow');
    });

    const handleSignOutClick = useEventCallback((ev) => {
        console.log('sign out ...');
    });

    if (auth) {
        return (
            <div className="header__user-info">
                <ButtonMenu transparent primary arrow icon={UserIcon} text="Demo Customer">
                    <Menu modal={false} width={220}>
                        <ListItem button>
                            <ListItemIcon>
                                <UserIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Account Information</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ShoppingBagIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Orders</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <HeartIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Wish List</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <CreditCardIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Payment Methods</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <KeyIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Chage Password</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleSignOutClick}>
                            <ListItemIcon>
                                <LogOutIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Sign Out</ListItemText>
                        </ListItem>
                    </Menu>
                </ButtonMenu>
            </div>
        );
    }

    return (
        <div className="header__user-info">
            <Link
                primary
                className="header__link"
                icon={LoginIcon}
                iconAlign="left"
                onClick={handleLoginClick}
            >
                Sign In
            </Link>
            <Link
                primary
                className="header__link"
                icon={UserPlusIcon}
                onClick={handleRegisterClick}
            >
                Sing Up
            </Link>
        </div>
    );
};

export default memo(HeaderUserInfo);
