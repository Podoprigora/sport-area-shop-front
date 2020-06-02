import React, { useRef, useCallback, useState, useReducer } from 'react';
import Button from '@components/Button';
import Menu from '@components/Menu';
import { ListItemText, ListItem } from '@components/List';
import Divider from '@components/Divider';

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
        // dispatch({ type: 'MULTISELECT', payload: index });
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
                modal={false}
                width={300}
                listProps={{ maxHeight: 250 }}
                onClose={handleMenuClose}
                onItemClick={handleMenuItemClick}
            >
                <ListItem button disabled selected={isItemSelected(0)}>
                    <ListItemText>
                        Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet
                        consectetur
                    </ListItemText>
                </ListItem>
                <ListItem button selected={isItemSelected(1)}>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button disabled selected={isItemSelected(2)}>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button selected={isItemSelected(3)}>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button selected={isItemSelected(4)}>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button selected={isItemSelected(5)}>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <Divider />
                <ListItem button selected={isItemSelected(7)}>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
                <ListItem button selected={isItemSelected(8)}>
                    <ListItemText>Lorem ipsum dolor sit amet consectetur</ListItemText>
                </ListItem>
            </Menu>
        </div>
    );
};

export default TestMenu;
