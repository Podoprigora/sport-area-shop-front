import React, { useCallback, useMemo, memo, useState } from 'react';
import PropTypes from 'prop-types';

import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';
import Mask, { MaskProgress } from '@ui/Mask';
import LinearProgress from '@ui/LinearProgress';
import CircularProgress from '@ui/CircularProgress';

import RegisterForm from './RegisterForm';

const RegisterWindow = (props) => {
    const [mask, setMask] = useState(false);

    const { isOpenWindow, openWindow, closeWindow } = useWindowManager();

    const handleClose = useEventCallback((ev) => {
        closeWindow('RegisterWindow');
    });

    const handleSignIn = useEventCallback((ev) => {
        handleClose();
        openWindow('LoginWindow');
    });

    const open = isOpenWindow('RegisterWindow');

    return (
        <Window open={open} centered maxWidth={560} onClose={handleClose}>
            <Mask open={mask}>
                <MaskProgress position="center" primary title="Please wait ...">
                    <CircularProgress preset="large" />
                    {/* <LinearProgress /> */}
                </MaskProgress>
            </Mask>

            <WindowHeader title="Sign Up for SportArea" onClose={handleClose} />
            <WindowBody painted>
                <RegisterForm onSignIn={handleSignIn} />
            </WindowBody>
        </Window>
    );
};

RegisterWindow.propTypes = {};

export default memo(RegisterWindow);
