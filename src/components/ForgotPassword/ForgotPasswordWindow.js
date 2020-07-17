import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import useMountedRef from '@ui/hooks/useMountedRef';
import { useWindowManager } from '@ui/WindowManager';
import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import useEventCallback from '@ui/hooks/useEventCallback';
import WindowBody from '@ui/Window/WindowBody';
import Mask, { MaskProgress } from '@ui/Mask';
import LinearProgress from '@ui/LinearProgress';
import UserService from '@services/UserService';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordWindow = (props) => {
    const [mask, setMask] = useState(false);
    const { isOpenWindow, openWindow, closeWindow } = useWindowManager();
    const isMountedRef = useMountedRef();

    const handleClose = useEventCallback(() => {
        closeWindow('ForgotPasswordWindow');
    });

    const handleSignIn = useEventCallback((params = null) => {
        handleClose();
        openWindow('LoginWindow', params);
    });
    const handleSignInClick = useEventCallback((ev) => {
        handleSignIn();
    });

    const handleFormSubmit = useCallback(
        async (values) => {
            try {
                setMask(true);

                await UserService.resetPassword(values);

                if (isMountedRef.current) {
                    handleSignIn({
                        resetPasswordAlert: true
                    });
                }
            } catch (e) {
                if (typeof e === 'object') {
                    throw e;
                }

                console.error(e);
            } finally {
                if (isMountedRef.current) {
                    setMask(false);
                }
            }
        },
        [isMountedRef, handleSignIn]
    );

    const open = isOpenWindow('ForgotPasswordWindow');

    return (
        <Window
            open={open}
            centered
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
            <WindowHeader title="Forgot Password" onClose={handleClose} />
            <WindowBody painted>
                <ForgotPasswordForm onSignIn={handleSignInClick} onFormSubmit={handleFormSubmit} />
            </WindowBody>
        </Window>
    );
};

ForgotPasswordWindow.propTypes = {};

export default memo(ForgotPasswordWindow);
