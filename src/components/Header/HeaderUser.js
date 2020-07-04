import React from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import ButtonMenu from '@ui/ButtonMenu';
import Menu from '@ui/Menu';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import Divider from '@ui/Divider';

import UserIcon from '@svg-icons/feather/UserIcon';
import ShoppingBagIcon from '@svg-icons/feather/ShoppingBagIcon';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import CreditCardIcon from '@svg-icons/feather/CreditCardIcon';
import KeyIcon from '@svg-icons/feather/KeyIcon';
import LogOutIcon from '@svg-icons/feather/LogOutIcon';

import HeaderUserAuthActions from './HeaderUserAuthActions';

const auth = false;

const HeaderUser = (props) => {
    const handleSignOutClick = useEventCallback((ev) => {
        console.log('sign out ...');
    });

    if (!auth) {
        return <HeaderUserAuthActions />;
    }

    return (
        <ButtonMenu transparent primary arrow icon={UserIcon} text="Demo Customer">
            <Menu width={220}>
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
    );
};

export default HeaderUser;
