import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useEventCallback from '@ui/hooks/useEventCallback';
import useMountedRef from '@ui/hooks/useMountedRef';
import ButtonMenu from '@ui/ButtonMenu';
import Menu from '@ui/Menu';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import Divider from '@ui/Divider';
import useNotification from '@ui/Notification';

import UserIcon from '@ui/svg-icons/feather/UserIcon';
import ShoppingBagIcon from '@ui/svg-icons/feather/ShoppingBagIcon';
import HeartIcon from '@ui/svg-icons/feather/HeartIcon';
import CreditCardIcon from '@ui/svg-icons/feather/CreditCardIcon';
import KeyIcon from '@ui/svg-icons/feather/KeyIcon';
import LogOutIcon from '@ui/svg-icons/feather/LogOutIcon';

import { authSelector, useIdentityActions } from '@store/identity';
import useScreenMask from '@contexts/ScreenMaskContext';

import HeaderUserAuthActions from './HeaderUserAuthActions';

const HeaderUser = () => {
    const auth = useSelector(authSelector);

    const { showAlert } = useNotification();
    const { asyncLogout } = useIdentityActions();
    const { toggleMask } = useScreenMask();
    const isMountedRef = useMountedRef();

    const handleSignOutClick = useEventCallback(async (ev) => {
        if (asyncLogout) {
            try {
                toggleMask(true);
                await asyncLogout(true);
            } catch (e) {
                showAlert({
                    type: 'error',
                    frame: true,
                    message: 'Server error occurred!'
                });
            } finally {
                if (isMountedRef.current) {
                    toggleMask(false);
                }
            }
        }
    });

    if (!auth) {
        return <HeaderUserAuthActions />;
    }

    return (
        <ButtonMenu transparent primary arrow truncate icon={UserIcon} text="Demo Customer">
            <Menu width={220}>
                <ListItem button disabled>
                    <ListItemIcon>
                        <UserIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Account Information</ListItemText>
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon>
                        <ShoppingBagIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Orders</ListItemText>
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon>
                        <HeartIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Wish List</ListItemText>
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon>
                        <CreditCardIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Payment Methods</ListItemText>
                </ListItem>
                <ListItem button disabled>
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
