import React from 'react';
import PropTypes from 'prop-types';
import Alert, { AlertActions, AlertTitle } from '@ui/Alert';
import Button from '@ui/Button';
import useEventCallback from '@ui/hooks/useEventCallback';
import { useHistory, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
    const location = useLocation();
    const history = useHistory();

    const handleReturnToMainPage = useEventCallback((ev) => {
        history.push('/');
    });

    const message = `Invalid path: ${location?.pathname}`;

    return (
        <Alert type="warning" frame>
            <AlertTitle>Page not found</AlertTitle>
            {message}
            <AlertActions>
                <Button transparent onClick={handleReturnToMainPage}>
                    Return to main page
                </Button>
            </AlertActions>
        </Alert>
    );
};

export default NotFoundPage;
