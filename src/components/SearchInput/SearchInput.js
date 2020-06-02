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
import useEventCallback from '@components/hooks/useEventCallback';

const SearchInput = React.forwardRef(function SearchInput(props, ref) {
    const {
        children,
        height,
        maxHeight = 250,
        onOpen = () => {},
        onClose = () => {},
        ...other
    } = props;

    const [open, setOpen] = useState(false);
    const [popperStyle, setPopperStyle] = useState({});
    const anchorRef = useRef(null);
    const inputRef = useRef(null);
    const handleAnchorRef = useForkRef(anchorRef, ref);
    const listItemsRef = useRef(null);
    const listScrollbarRef = useRef(null);
    const { referenceRef, popperRef, popperState, popperInstance } = usePopper();

    // Handlers

    const handleOpen = useEventCallback((ev) => {
        if (open) {
            return;
        }

        setOpen(true);
        onOpen(ev);
    });

    const handleClose = useEventCallback((ev) => {
        if (!open) {
            return;
        }

        setOpen(false);
        onClose(ev);
    });

    const handleClickAway = useEventCallback((ev) => {
        handleClose(ev);
    });

    const handleClick = useEventCallback((ev) => {
        handleOpen(ev);
        inputRef.current.focus();
    });

    const handleKeyDown = useEventCallback((ev) => {
        switch (ev.key) {
            case 'Escape':
                handleClose(ev);
                break;
            case 'ArrowDown':
                ev.preventDefault();
                handleOpen(ev);
                break;
            case 'ArrowUp':
                ev.preventDefault();
                handleOpen(ev);
                break;
            default:
                break;
        }
    });

    const handleMouseDown = useCallback((ev) => {
        ev.preventDefault();
    }, []);

    const handlePopperMouseDown = useCallback((ev) => {
        ev.preventDefault();
    }, []);

    const handleInputKeyDown = useCallback((ev) => {
        switch (ev.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                ev.preventDefault();
                break;
            default:
                break;
        }
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

            setPopperStyle((prevStyle) => {
                return { ...prevStyle, width };
            });
        }
    }, []);

    // Render

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
                    type="search"
                    ref={inputRef}
                    onKeyDown={handleInputKeyDown}
                    prependAdornment={() => <SearchIcon size="medium" />}
                />
                {open && (
                    <Portal>
                        <div
                            role="presentation"
                            className="popper menu"
                            style={popperStyle}
                            ref={popperRef}
                            onMouseDown={handlePopperMouseDown}
                        >
                            <List
                                {...((height || maxHeight) && { autoHeight: false })}
                                {...(maxHeight && {
                                    scrollbarProps: { autoHeight: true, autoHeightMax: maxHeight }
                                })}
                                scrollbarRef={listScrollbarRef}
                            >
                                <div ref={listItemsRef}>
                                    {!children && (
                                        <ListItem>
                                            <ListItemText>No options</ListItemText>
                                        </ListItem>
                                    )}
                                    {children}
                                </div>
                            </List>
                        </div>
                    </Portal>
                )}
            </div>
        </ClickAwayListener>
    );
});

SearchInput.propTypes = {
    children: PropTypes.node,
    height: PropTypes.number,
    maxHeight: PropTypes.number,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

export default SearchInput;
