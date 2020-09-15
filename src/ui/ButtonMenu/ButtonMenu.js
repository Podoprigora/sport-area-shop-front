import React, { useReducer, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@ui/Button/Button';
import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';

const defaultState = {
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
        default:
            return state;
    }
};

const ButtonMenu = React.forwardRef(function ButtonMenu(props, ref) {
    const { children, text = '', className, onClick, onKeyDown, onItemClick, ...other } = props;

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

    const handleItemClick = useEventCallback((ev) => {
        dispatch({ type: 'CLOSE' });

        if (onItemClick) {
            onItemClick(ev);
        }
    });

    const handleMenuClose = useCallback((ev) => {
        dispatch({ type: 'CLOSE' });
    }, []);

    const { open, autoFocusItem } = state;

    const menuElement =
        children &&
        React.cloneElement(children, {
            open,
            autoFocusItem,
            anchorRef: buttonRef,
            onItemClick: handleItemClick,
            onClose: handleMenuClose
        });

    return (
        <>
            <Button
                {...other}
                className={classNames(className, {
                    'btn--focus-visible': open
                })}
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
    className: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onItemClick: PropTypes.func
};

export default ButtonMenu;
