import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Alert from '@ui/Alert';
import IconButton from '@ui/IconButton';
import ClearCloseIcon from '@ui/svg-icons/material/ClearCloseIcon';

import useNotification from './NorificationContext';

const NotificationItem = (props) => {
    const {
        type,
        id,
        closable = true,
        message,
        autoClose = false,
        autoCloseDelay = 10000,
        render,
        ...other
    } = props;

    const timerRef = useRef(null);
    const { hideAlert } = useNotification();

    const handleClose = useCallback(() => {
        if (hideAlert) {
            hideAlert(id);
        }
    }, [hideAlert, id]);

    useEffect(() => {
        if (autoClose) {
            timerRef.current = setTimeout(() => {
                handleClose();
            }, autoCloseDelay);

            return () => {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            };
        }

        return undefined;
    }, [autoClose, autoCloseDelay, handleClose]);

    let actionContent = null;

    if (closable) {
        actionContent = (
            <IconButton size="medium" onClick={handleClose}>
                <ClearCloseIcon />
            </IconButton>
        );
    }

    if (render) {
        const alertElement = render({ ...props });

        if (React.isValidElement(alertElement)) {
            return React.cloneElement(alertElement, {
                action: actionContent,
                className: 'notification__item'
            });
        }
        return null;
    }

    return (
        <Alert type={type} action={actionContent} className="notification__item" {...other}>
            {message}
        </Alert>
    );
};

NotificationItem.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    closable: PropTypes.bool,
    message: PropTypes.string,
    autoClose: PropTypes.bool,
    autoCloseDelay: PropTypes.number,
    render: PropTypes.func
};

export default NotificationItem;
