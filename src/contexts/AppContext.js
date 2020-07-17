import React from 'react';
import PropTypes from 'prop-types';
import WindowManagerProvider from '@ui/WindowManager';
import { NotificationProvider } from '@ui/Notification';
import { ScreenMaskProvider } from './ScreenMaskContext';

const AppContext = (props) => {
    const { children } = props;

    return (
        <NotificationProvider>
            <WindowManagerProvider>
                <ScreenMaskProvider>{children}</ScreenMaskProvider>
            </WindowManagerProvider>
        </NotificationProvider>
    );
};

AppContext.propTypes = {
    children: PropTypes.node
};

export default AppContext;
