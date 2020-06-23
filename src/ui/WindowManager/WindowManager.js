import React, { useMemo, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';

import { WindowManagerContext } from './WindowManagerContext';

const windowReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'OPEN': {
            const newState = state.filter((item) => item !== payload);
            return [...newState, payload];
        }
        case 'CLOSE': {
            return state.filter((item) => item !== payload);
        }
        default:
            return state;
    }
};

const WindowManager = (props) => {
    const { children } = props;

    const [state, dispatch] = useReducer(windowReducer, []);

    const handleOpen = useCallback((key) => {
        dispatch({ type: 'OPEN', payload: key });
    }, []);

    const handleClose = useCallback((key) => {
        dispatch({ type: 'CLOSE', payload: key });
    }, []);

    const handleIsOpen = useCallback(
        (key) => {
            return (
                state.findIndex(
                    (item) => String(item).toLocaleLowerCase() === String(key).toLocaleLowerCase()
                ) !== -1
            );
        },
        [state]
    );

    const contextValue = useMemo(
        () => ({
            isOpenWindow: handleIsOpen,
            openWindow: handleOpen,
            closeWindow: handleClose
        }),
        [handleClose, handleIsOpen, handleOpen]
    );

    return (
        <WindowManagerContext.Provider value={contextValue}>
            {children}
        </WindowManagerContext.Provider>
    );
};

WindowManager.propTypes = {
    children: PropTypes.node
};

export default WindowManager;
