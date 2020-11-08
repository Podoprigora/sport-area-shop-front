import React, { useCallback, memo, useState } from 'react';

import useMediaQuery from '@ui/hooks/useMediaQuery';
import useEventCallback from '@ui/hooks/useEventCallback';
import useMountedRef from '@ui/hooks/useMountedRef';
import Alert, { AlertTitle } from '@ui/Alert';
import Window, { WindowLoadingMask } from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import { useWindowManager } from '@ui/WindowManager';

import { useIdentityActions } from '@store/identity';

import LoginForm from './LoginForm';

const LoginWindow = () => {
    const [mask, setMask] = useState(false);
    const isMountedRef = useMountedRef();
    const { isOpenWindow, getWindowParams, openWindow, closeWindow } = useWindowManager();
    const { asyncLogin } = useIdentityActions();
    const fullScreen = useMediaQuery('(max-width: 576px)');

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

                await asyncLogin(values);

                if (isMountedRef.current) {
                    setMask(false);
                    handleClose();
                }
            } catch (e) {
                if (isMountedRef.current && typeof e === 'object') {
                    throw e;
                }
            } finally {
                if (isMountedRef.current) {
                    setMask(false);
                }
            }
        },
        [isMountedRef, handleClose, asyncLogin]
    );

    const open = isOpenWindow('LoginWindow');

    return (
        <Window
            open={open}
            centered
            draggable={!fullScreen}
            fullScreen={fullScreen}
            maxWidth={480}
            disableEscapeKeyDown={mask}
            disableBackdropClick={mask}
            onClose={handleClose}
        >
            <WindowLoadingMask open={mask} />
            <WindowHeader title="Sign In to SportArea" onClose={handleClose} />
            <WindowBody painted>
                {resetPasswordAlert && (
                    <Alert type="success">
                        We&apos;ve sent a new password to your email, please use it to sing in.
                    </Alert>
                )}
                {registrationAlert && (
                    <Alert type="success">
                        <AlertTitle>Registration completed successfully.</AlertTitle>
                        Please use your email and password to sign in.
                    </Alert>
                )}

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
