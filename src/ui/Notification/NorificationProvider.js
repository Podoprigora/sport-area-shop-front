import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useControlled from '@ui/hooks/useControlled';
import { NotificationContext } from './NorificationContext';
import NotificationList from './NotificationList';

const NotificationProvider = (props) => {
    const { children, position: defaultPositionProp = 'top-center', maxStackSize = 4 } = props;
    const [position, setPosition] = useControlled(null, defaultPositionProp);

    const [items, setItems] = useState([]);
    const [entering, setEntering] = useState(false);

    const isBottomPositionRef = useRef(position.indexOf('bottom') !== -1);

    const handleShowAlert = useCallback(
        (alertProps = {}) => {
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

    const handleHideAlert = useCallback((id) => {
        setItems((prevState) => {
            const lastItem = isBottomPositionRef.current
                ? prevState[0]
                : prevState[prevState.length - 1];

            const deletedId = id ?? lastItem?.id;

            const newState = prevState.filter((item) => item?.id !== deletedId);

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

NotificationProvider.propTypes = {
    children: PropTypes.node,
    position: PropTypes.string,
    maxStackSize: PropTypes.number
};

export default NotificationProvider;
