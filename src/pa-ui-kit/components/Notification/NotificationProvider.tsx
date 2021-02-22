import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';

import { createCtx, useControlled } from '../utils';
import { PickPropType } from '../utils/types';

import { NotificationList, NotificationListPosition } from './NotificationList';
import { NotificationItemProps } from './NotificationItem';

type ShowAlertProps = Omit<NotificationItemProps, keyof React.ComponentProps<'div'>> & {
    position?: NotificationListPosition;
};

export type NotificationContextValue = {
    showAlert: (props: ShowAlertProps) => void;
    hideAlert: (id?: PickPropType<NotificationItemProps, 'id'>) => void;
};

export interface NotificationProviderProps {
    children?: React.ReactNode;
    position?: NotificationListPosition;
    maxStackSize?: number;
}

const NotificationContext = createCtx<NotificationContextValue>();
export const useNotification = NotificationContext.useContext;

export const NotificationProvider = (props: NotificationProviderProps) => {
    const { children, position: defaultPositionProp = 'top-center', maxStackSize = 4 } = props;
    const [position, setPosition] = useControlled(undefined, defaultPositionProp);

    const [items, setItems] = useState<NotificationItemProps[]>([]);
    const [entering, setEntering] = useState(false);

    const isBottomPositionRef = useRef(position?.indexOf('bottom') !== -1);

    const handleShowAlert = useCallback(
        (alertProps: ShowAlertProps) => {
            if (!(alertProps instanceof Object)) {
                console.error(
                    `Function showAlert should takes a valid params e.g., {type: "warning, message: "Error message!"}`
                );
                return;
            }

            const { position: alertPosition, ...otherAlertProps } = alertProps;
            const id = new Date().getTime();

            if (alertPosition) {
                setPosition(alertPosition);
            }

            setItems((prevState) => {
                const newState = [{ ...otherAlertProps, id }, ...prevState];

                if (isBottomPositionRef.current) {
                    return newState.reverse();
                }

                return newState;
            });
        },
        [setPosition]
    );

    const handleHideAlert = useCallback((id?: number) => {
        setItems((prevState) => {
            const lastItem = isBottomPositionRef.current
                ? prevState[0]
                : prevState[prevState.length - 1];

            const deletedId = id ?? lastItem.id;
            const newState = prevState.filter((item) => item.id !== deletedId);

            return newState;
        });
    }, []);

    const handleTransitionEnter = useCallback(() => {
        setEntering(true);
    }, []);

    const handleTransitionEntered = useCallback(() => {
        setEntering(false);
    }, []);

    useEffect(() => {
        if (entering) {
            return () => {
                if (items.length > maxStackSize) {
                    handleHideAlert();
                }
            };
        }

        return undefined;
    }, [entering, items, maxStackSize, handleHideAlert]);

    const contextValue = useMemo(
        () => ({
            showAlert: handleShowAlert,
            hideAlert: handleHideAlert
        }),
        [handleShowAlert, handleHideAlert]
    );

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            <NotificationList
                items={items}
                position={position}
                onTransitionEnter={handleTransitionEnter}
                onTransitionEntered={handleTransitionEntered}
            />
        </NotificationContext.Provider>
    );
};
