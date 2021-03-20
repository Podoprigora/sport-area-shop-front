import React, { useCallback, memo, useState } from 'react';

import { useMountedRef, useMediaQuery, useEventCallback } from '@ui/utils';
import { Window, WindowBody, WindowHeader, WindowLoadingMask } from '@ui/Window';
import { useWindowManager } from '@ui/WindowManager';

import UserService from '@services/UserService';
import RegisterForm from './RegisterForm';

const RegisterWindow = () => {
    const [mask, setMask] = useState(false);

    const isMountedRef = useMountedRef();
    const { isOpenWindow, openWindow, closeWindow } = useWindowManager();
    const fullScreen = useMediaQuery('(max-width: 576px)');

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
                if (isMountedRef.current && typeof e === 'object') {
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

    const open = isOpenWindow('RegisterWindow');

    return (
        <Window
            open={open}
            fullScreen={fullScreen}
            centered
            maxWidth={560}
            disableEscapeKeyDown={mask}
            disableBackdropClick={mask}
            onClose={handleClose}
        >
            <WindowLoadingMask open={mask} />
            <WindowHeader title="Sign Up for SportArea" onClose={handleClose} />
            <WindowBody painted>
                <RegisterForm onSignIn={handleSignInClick} onFormSubmit={handleFormSubmit} />
            </WindowBody>
        </Window>
    );
};

export default memo(RegisterWindow);
