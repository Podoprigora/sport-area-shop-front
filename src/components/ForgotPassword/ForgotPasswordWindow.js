import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { useWindowManager } from '@ui/WindowManager';
import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import useEventCallback from '@ui/hooks/useEventCallback';
import WindowBody from '@ui/Window/WindowBody';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordWindow = (props) => {
    const { isOpenWindow, openWindow, closeWindow } = useWindowManager();

    const handleClose = useEventCallback((ev) => {
        closeWindow('ForgotPasswordWindow');
    });

    const handleSignInClick = useEventCallback(() => {
        handleClose();
        openWindow('LoginWindow');
    });

    const open = isOpenWindow('ForgotPasswordWindow');

    return (
        <Window open={open} centered maxWidth={480} onClose={handleClose}>
            <WindowHeader title="Forgot Password" onClose={handleClose} />
            <WindowBody painted>
                <ForgotPasswordForm onSignIn={handleSignInClick} />
            </WindowBody>
        </Window>
    );
};

ForgotPasswordWindow.propTypes = {};

export default memo(ForgotPasswordWindow);
