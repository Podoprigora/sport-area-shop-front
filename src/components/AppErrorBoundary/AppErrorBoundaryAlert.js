import React from 'react';
import PropTypes from 'prop-types';

import { Alert, AlertActions, AlertTitle } from '@ui/Alert';
import { useEventCallback } from '@ui/utils';
import { Button } from '@ui/Button';
import Main from '@components/Main';

const AppErrorBoundaryAlert = (props) => {
    const { error, title = "Some error occured, we're fixing that soon!", main, ...other } = props;

    const handleReload = useEventCallback(() => {
        if (window.location) {
            window.location.reload();
        }
    });

    const errorValue = error?.toString ? error.toString() : error;

    const alertElement = (
        <Alert type="error" frame {...other}>
            {title && <AlertTitle>{title}</AlertTitle>}
            {errorValue}
            <AlertActions>
                <Button transparent centered onClick={handleReload}>
                    Try to reload
                </Button>
            </AlertActions>
        </Alert>
    );

    if (main) {
        return <Main className="u-padding-10">{alertElement}</Main>;
    }

    return alertElement;
};

AppErrorBoundaryAlert.propTypes = {
    title: PropTypes.string,
    error: PropTypes.any,
    main: PropTypes.bool
};

export default AppErrorBoundaryAlert;
