import React from 'react';
import PropTypes from 'prop-types';

import { Alert, AlertActions, AlertTitle } from '@ui/Alert';
import { Button } from '@ui/Button';
import { useEventCallback } from '@ui/utils';

const defaultTitle = 'We could not fetch data!';

const FetchDataErrorAlert = (props) => {
    const { error, title = defaultTitle, onReload, ...other } = props;

    const handleReload = useEventCallback((ev) => {
        if (onReload) {
            onReload(ev);
        }
    });

    if (!error) {
        return null;
    }

    return (
        <Alert type="error" {...other}>
            <AlertTitle>{title}</AlertTitle>
            {error}
            {onReload && (
                <AlertActions>
                    <Button transparent onClick={handleReload}>
                        Try to re-fetch
                    </Button>
                </AlertActions>
            )}
        </Alert>
    );
};

FetchDataErrorAlert.propTypes = {
    title: PropTypes.string,
    error: PropTypes.string,
    onReload: PropTypes.func
};

export default FetchDataErrorAlert;
