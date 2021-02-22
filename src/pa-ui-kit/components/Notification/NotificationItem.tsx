import React, { useCallback, useEffect, useRef } from 'react';

import { IconButton } from '../IconButton';
import { Alert, AlertProps } from '../Alert';
import { ClearCloseIcon } from '../svg-icons/material';

import { useNotification } from './NotificationProvider';

export interface NotificationItemProps extends Omit<AlertProps, 'id'> {
    id: number;
    message?: string;
    closable?: boolean;
    autoClose?: boolean;
    autoCloseDelay?: number;
    /**
     * Render custom `Alert` content.
     * Important: don't use `Alert` inside, it's already created!
     */
    render?: (props: NotificationItemProps) => React.ReactNode;
}

export const NotificationItem = (props: NotificationItemProps) => {
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

    const timerRef = useRef<number>();
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
                timerRef.current = undefined;
            };
        }

        return undefined;
    }, [autoClose, autoCloseDelay, handleClose]);

    let actionContent: React.ReactNode = null;

    if (closable) {
        actionContent = (
            <IconButton size="medium" onClick={handleClose}>
                <ClearCloseIcon />
            </IconButton>
        );
    }

    if (render) {
        const alertContent = render({ ...props });

        if (React.isValidElement(alertContent)) {
            return React.createElement(
                Alert,
                {
                    type,
                    action: actionContent,
                    className: 'notification__item',
                    ...other
                },
                alertContent
            );
        }
        return null;
    }

    return (
        <Alert type={type} action={actionContent} className="notification__item" {...other}>
            {message}
        </Alert>
    );
};
