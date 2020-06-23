import React, { useReducer, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button/Button';
import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';

const defaultState = {
    selected: [],
    open: false,
    autoFocusItem: false
};

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case 'CLICK':
            return {
                ...state,
                open: !state.open,
                autoFocusItem: false
            };
        case 'KEY_DOWN':
            return {
                ...state,
                open: !state.open,
                autoFocusItem: true
            };
        case 'CLOSE':
            return {
                ...state,
                open: false
            };
        case 'SELECT': {
            return {
                ...state,
                open: false,
                selected: [payload]
            };
        }
        case 'MULTISELECT': {
            const newSelected = [...state.selected];
            const existedIndex = newSelected.indexOf(payload);

            if (existedIndex !== -1) {
                newSelected.splice(existedIndex, 1);
            } else {
                newSelected.push(payload);
            }

            return {
                ...state,
                selected: newSelected
            };
        }
        default:
            return state;
    }
};

const ButtonMenu = React.forwardRef(function ButtonMenu(props, ref) {
    const { children, text = '', onClick, onKeyDown, ...other } = props;

    const [state, dispatch] = useReducer(reducer, defaultState);

    const buttonRef = useRef(null);
    const handleRef = useForkRef(buttonRef, ref);

    const handleButtonClick = useEventCallback((ev) => {
        dispatch({ type: 'CLICK' });

        if (onClick) {
            onClick(ev);
        }
    });

    const handleButtonKeyDown = useEventCallback((ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            dispatch({ type: 'KEY_DOWN' });
        }

        if (onKeyDown) {
            onKeyDown(ev);
        }
    });

    const handleMenuClose = useCallback((ev) => {
        dispatch({ type: 'CLOSE' });
    }, []);

    const handleMenuItemClick = useCallback((ev, index) => {
        dispatch({ type: 'SELECT', payload: index });
    }, []);

    // TODO: Implement selection functionality
    const { open, autoFocusItem, selected } = state;

    const menuElement =
        children &&
        React.cloneElement(children, {
            open,
            autoFocusItem,
            anchorRef: buttonRef,
            onClose: handleMenuClose,
            onItemClick: handleMenuItemClick
        });

    return (
        <>
            <Button
                {...other}
                ref={handleRef}
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
            >
                {text}
            </Button>
            {menuElement}
        </>
    );
});

ButtonMenu.propTypes = {
    children: PropTypes.element,
    text: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
};

export default ButtonMenu;
