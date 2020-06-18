import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import Heading from '@ui/Heading';
import Link from '@ui/Link';
// import LoginIcon from '@svg-icons/feather/LoginIcon';

import LoginForm from './LoginForm';

const LoginWindow = (props) => {
    const handleClose = useCallback((ev) => {}, []);

    return (
        <Window open centered draggable maxWidth={480}>
            <WindowHeader title="Sign in to SportArea" onClose={handleClose} />
            <WindowBody painted>
                <LoginForm />
            </WindowBody>
        </Window>
    );
};

LoginWindow.propTypes = {};

export default LoginWindow;
