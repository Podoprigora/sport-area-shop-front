import React, { useCallback, useMemo, memo, useState } from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '@ui/hooks/useMediaQuery';
import useMountedRef from '@ui/hooks/useMountedRef';
import Window, { WindowLoadingMask } from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';

import UserService from '@services/UserService';
import RegisterForm from './RegisterForm';

const RegisterWindow = (props) => {
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
