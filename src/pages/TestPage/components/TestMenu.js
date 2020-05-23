import React, { useRef, useCallback, useState, useReducer } from 'react';
import Button from '@components/Button';
import Menu from '@components/Menu';
import { ListItemText, ListItem } from '@components/List';
import Divider from '@components/Divider';

const defaultState = {
    items: [],
    selected: [0, 4, 5],
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
        default:
            return state;
    }
};

const TestMenu = () => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const buttonRef = useRef(null);

    const handleButtonClick = useCallback((ev) => {
        dispatch({ type: 'CLICK' });
    }, []);

    const handleButtonKeyDown = useCallback((ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            dispatch({ type: 'KEY_DOWN' });
        }
    }, []);

    const handleMenuClose = useCallback((ev) => {
        dispatch({ type: 'CLOSE' });
    }, []);

    const handleMenuItemClick = useCallback((ev, index) => {
        dispatch({ type: 'SELECT', payload: index });
    }, []);

    const { open, autoFocusItem, selected } = state;

    const isItemSelected = (index) => {
        return selected.indexOf(index) !== -1;
    };

    return (
        <div>
            <Button
                primary
                ref={buttonRef}
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
            >
                Simple menu
            </Button>
            <Menu
                open={open}
                autoFocusItem={autoFocusItem}
                anchorRef={buttonRef}
                width={300}
                height={250}
                onClose={handleMenuClose}
                onItemClick={handleMenuItemClick}
            >
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
            </Menu>
        </div>
    );
};

export default TestMenu;
