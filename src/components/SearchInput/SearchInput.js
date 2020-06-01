import React, { useRef, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SearchIcon from '@svg-icons/feather/SearchIcon';
import useForkRef from '@components/hooks/useForkRef';
import { usePopper } from '@components/Popper';
import Input from '@components/Input';
import Portal from '@components/Portal';
import ClickAwayListener from '@components/ClickAwayListener';
import List, { ListItem, ListItemText } from '@components/List';

const SearchInput = React.forwardRef(function SearchInput(props, ref) {
    const { children, ...other } = props;

    const [open, setOpen] = useState(false);
    const [menuStyle, setMenuStyle] = useState({});
    const anchorRef = useRef(null);
    const inputRef = useRef(null);
    const handleAnchorRef = useForkRef(anchorRef, ref);
    const { referenceRef, popperRef, popperState, popperInstance } = usePopper();

    // Handlers

    const handleMenuClose = useCallback((ev) => {
        // console.log(ev.composedPath());

        setOpen(false);
    }, []);

    const handleClickAway = useCallback((ev) => {
        setOpen(false);
    }, []);

    const handleClick = useCallback((ev) => {
        // console.log('click');
    }, []);

    const handleKeyDown = useCallback(
        (ev) => {
            switch (ev.key) {
                case 'Escape':
                    handleMenuClose(ev);
                    break;
                case 'ArrowDown':
                    setOpen(true);
                    break;
                case 'ArrowUp':
                    setOpen(true);
                    break;
                default:
                    break;
            }
        },
        [handleMenuClose]
    );

    const handleMouseDown = useCallback((ev) => {
        ev.preventDefault();

        setOpen(true);
        inputRef.current.focus();
    }, []);

    // Effects

    useEffect(() => {
        if (anchorRef.current) {
            referenceRef(anchorRef.current);
        }
    }, [referenceRef]);

    useEffect(() => {
        if (anchorRef.current) {
            const width = anchorRef.current.clientWidth;

            setMenuStyle((prevStyle) => {
                return { ...prevStyle, width };
            });
        }
    }, []);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div
                role="presentation"
                className={classNames('search-input')}
                ref={handleAnchorRef}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onKeyDown={handleKeyDown}
            >
                <Input
                    {...other}
                    ref={inputRef}
                    prependAdornment={() => <SearchIcon size="medium" />}
                />
                {open && (
                    <Portal>
                        <div
                            role="presentation"
                            className="popper menu"
                            style={menuStyle}
                            ref={popperRef}
                        >
                            <List>
                                {!children && (
                                    <ListItem>
                                        <ListItemText>No options</ListItemText>
                                    </ListItem>
                                )}
                                {children}
                            </List>
                        </div>
                    </Portal>
                )}
            </div>
        </ClickAwayListener>
    );
});

SearchInput.propTypes = {
    children: PropTypes.node
};

export default SearchInput;
