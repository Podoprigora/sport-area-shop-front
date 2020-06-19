import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';

import LoginForm from './LoginForm';

const LoginWindow = (props) => {
    const { isOpenWindow, openWindow, closeWindow } = useWindowManager();

    const handleClose = useEventCallback((ev) => {
        closeWindow('LoginWindow');
    });

    const handleSignUpClick = useEventCallback(() => {
        handleClose();
        openWindow('RegisterWindow');
    });

    const handleForgotPasswordClick = useEventCallback(() => {
        handleClose();
        openWindow('ForgotPasswordWindow');
    });

    const open = isOpenWindow('LoginWindow');

    return (
        <Window
            open={open}
            centered
            draggable
            disableEscapeKeyDown
            maxWidth={480}
            onClose={handleClose}
        >
            <WindowHeader title="Sign In to SportArea" onClose={handleClose} />
            <WindowBody painted>
                <LoginForm
                    onSingUp={handleSignUpClick}
                    onForgotPassword={handleForgotPasswordClick}
                />
            </WindowBody>
        </Window>
    );
};

LoginWindow.propTypes = {};

export default memo(LoginWindow);
