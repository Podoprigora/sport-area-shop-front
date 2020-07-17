import React, { useCallback, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import Mask, { MaskProgress } from '@ui/Mask';
import LinearProgress from '@ui/LinearProgress';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';
import useMountedRef from '@ui/hooks/useMountedRef';

import { useIdentityActions } from '@store/identity';

import LoginForm from './LoginForm';

const LoginWindow = (props) => {
    const [mask, setMask] = useState(false);
    const isMountedRef = useMountedRef();
    const { isOpenWindow, getWindowParams, openWindow, closeWindow } = useWindowManager();
    const { onAsyncLogin } = useIdentityActions();

    const open = isOpenWindow('LoginWindow');
    const { resetPasswordAlert = false, registrationAlert = false } =
        getWindowParams('LoginWindow') || {};

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

    const handleSubmit = useCallback(
        async (values) => {
            try {
                setMask(true);

                await onAsyncLogin(values);

                if (isMountedRef.current) {
                    setMask(false);
                    handleClose();
                }
            } catch (e) {
                if (isMountedRef.current) {
                    setMask(false);
                }

                if (typeof e === 'object') {
                    throw e;
                } else {
                    console.error(e);
                }
            }
        },
        [isMountedRef, handleClose, onAsyncLogin]
    );

    return (
        <Window
            open={open}
            centered
            draggable
            maxWidth={480}
            disableEscapeKeyDown={mask}
            disableBackdropClick={mask}
            onClose={handleClose}
        >
            <Mask open={mask}>
                <MaskProgress position="top" primary>
                    <LinearProgress />
                </MaskProgress>
            </Mask>

            <WindowHeader title="Sign In to SportArea" onClose={handleClose} />
            <WindowBody painted>
                <LoginForm
                    resetPasswordAlert={resetPasswordAlert}
                    registrationAlert={registrationAlert}
                    onSubmit={handleSubmit}
                    onSingUp={handleSignUpClick}
                    onForgotPassword={handleForgotPasswordClick}
                />
            </WindowBody>
        </Window>
    );
};

LoginWindow.propTypes = {};

export default memo(LoginWindow);
