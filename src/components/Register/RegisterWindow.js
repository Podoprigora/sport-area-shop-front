import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Window from '@ui/Window';
import WindowHeader from '@ui/Window/WindowHeader';
import WindowBody from '@ui/Window/WindowBody';
import RegisterForm from './RegisterForm';

const RegisterWindow = (props) => {
    const handleClose = useCallback((ev) => {}, []);

    return (
        <Window open centered maxWidth={560}>
            <WindowHeader title="Sign Up for SportArea" onClose={handleClose} />
            <WindowBody painted>
                <RegisterForm />
            </WindowBody>
        </Window>
    );
};

RegisterWindow.propTypes = {};

export default RegisterWindow;
