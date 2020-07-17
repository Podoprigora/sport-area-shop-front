import React, { useCallback, useMemo, memo, useState } from 'react';
import PropTypes from 'prop-types';

import useMountedRef from '@ui/hooks/useMountedRef';
import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';
import Mask, { MaskProgress } from '@ui/Mask';
import LinearProgress from '@ui/LinearProgress';

import UserService from '@services/UserService';
import RegisterForm from './RegisterForm';

const RegisterWindow = (props) => {
    const [mask, setMask] = useState(false);

    const isMountedRef = useMountedRef();
    const { isOpenWindow, openWindow, closeWindow } = useWindowManager();

    const open = isOpenWindow('RegisterWindow');

    const handleClose = useEventCallback((ev) => {
        closeWindow('RegisterWindow');
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

                await UserService.register(values);

                if (isMountedRef.current) {
                    handleSignIn({ registrationAlert: true });
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

    return (
        <Window
            open={open}
            centered
            maxWidth={560}
            disableEscapeKeyDown={mask}
            disableBackdropClick={mask}
            onClose={handleClose}
        >
            <Mask open={mask}>
                <MaskProgress position="top" primary>
                    <LinearProgress />
                </MaskProgress>
            </Mask>

            <WindowHeader title="Sign Up for SportArea" onClose={handleClose} />
            <WindowBody painted>
                <RegisterForm onSignIn={handleSignInClick} onFormSubmit={handleFormSubmit} />
            </WindowBody>
        </Window>
    );
};

export default memo(RegisterWindow);
