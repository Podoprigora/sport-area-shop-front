import React from 'react';
import PropTypes from 'prop-types';
import WindowManagerProvider from '@ui/WindowManager';
import { ScreenMaskProvider } from './ScreenMaskContext';

const AppContext = (props) => {
    const { children, ...other } = props;

    return (
        <WindowManagerProvider>
            <ScreenMaskProvider>{children}</ScreenMaskProvider>
        </WindowManagerProvider>
    );
};

AppContext.propTypes = {
    children: PropTypes.node
};

export default AppContext;
