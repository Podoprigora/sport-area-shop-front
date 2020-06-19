import React, { useCallback, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import Mask, { MaskProgress } from '@ui/Mask';
import CircularProgress from '@ui/CircularProgress';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';

import LoginForm from './LoginForm';

const LoginWindow = (props) => {
    const [mask, setMask] = useState(false);
    const { isOpenWindow, openWindow, closeWindow } = useWindowManager();

    const open = isOpenWindow('LoginWindow');

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

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setMask(true);
            }, 250);
        }

        return () => {
            setMask(false);
        };

        // setTimeout(() => {
        //     setMask(false);
        // }, 3000);
    }, [open]);

    return (
        <Window
            open={open}
            centered
            draggable
            disableEscapeKeyDown
            maxWidth={480}
            onClose={handleClose}
        >
            <Mask open={mask}>
                <MaskProgress>
                    <CircularProgress primary preset="large" />
                </MaskProgress>
            </Mask>

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
