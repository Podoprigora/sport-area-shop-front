import React from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import useNotification from '@ui/Notification';
import { AlertTitle, AlertActions } from '@ui/Alert';

const TestNotification = (props) => {
    const { showAlert, hideAlert } = useNotification();

    const handleShowAlert = (ev) => {
        showAlert({
            type: 'success',
            autoClose: false,
            frame: true,
            render: (renderProps) => {
                const { id: alertId } = renderProps;

                return (
                    <>
                        {/* <AlertTitle>Success</AlertTitle> */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quasi
                        quibusdam possimus eos eum reiciendis unde veniam, commodi distinctio autem
                        sit nulla quidem ea minima non dolorem. Fugit, placeat voluptate.
                        <AlertActions>
                            <Button transparent onClick={() => hideAlert(alertId)}>
                                Learn More
                            </Button>
                        </AlertActions>
                    </>
                );
            }
        });
    };

    return (
        <div>
            <Button primary onClick={handleShowAlert}>
                Show Alert
            </Button>
        </div>
    );
};

export default TestNotification;
