import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NotificationContext } from './NorificationContext';
import NotificationList from './NotificationList';

const NotificationProvider = (props) => {
    const { children, position = 'top-center', maxStackSize = 4 } = props;

    const [items, setItems] = useState([]);
    const [entering, setEntering] = useState(false);

    const isBottomPositionRef = useRef(position.indexOf('bottom') !== -1);

    const handleShowAlert = useCallback((alertProps) => {
        const id = new Date().getTime();

        setItems((prevState) => {
            const newState = [{ ...alertProps, id }, ...prevState];

            if (isBottomPositionRef.current) {
                return newState.reverse();
            }

            return newState;
        });
    }, []);

    const handleHideAlert = useCallback((id = 0) => {
        setItems((prevState) => {
            const lastItem = isBottomPositionRef.current
                ? prevState[0]
                : prevState[prevState.length - 1];

            const deletedId = id || (lastItem || {}).id;

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

NotificationProvider.propTypes = {
    children: PropTypes.node,
    position: PropTypes.string,
    maxStackSize: PropTypes.number
};

export default NotificationProvider;
