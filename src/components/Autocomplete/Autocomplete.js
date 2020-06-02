import React, { useRef, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useForkRef from '@components/hooks/useForkRef';
import { usePopper } from '@components/Popper';
import Portal from '@components/Portal';
import ClickAwayListener from '@components/ClickAwayListener';
import List, { ListItem, ListItemText, ListItemIcon } from '@components/List';
import useEventCallback from '@components/hooks/useEventCallback';
import useControlled from '@components/hooks/useControlled';
import defineEventTarget from '@components/utils/defineEventTarget';

const getValidItemText = (getItemText) => (item) => {
    let text = getItemText(item);
    text = typeof text === 'string' ? text : '';

    return text;
};

const getDefaultItemText = (item) => (typeof item === 'string' ? item : '');

const getDefaultItemSelected = (value, item) => value === item;

const createFilter = () => {
    return (items, { inputValue = '', getItemText = getDefaultItemText }) => {
        const query = inputValue.trim().toLowerCase();

        return items.filter((item) => {
            let itemText = getItemText(item);
            itemText = itemText.toLowerCase();

            return itemText.indexOf(query) !== -1;
        });
    };
};

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
    const {
        renderInput,
        renderItem,
        getItemText: getItemTextProp = getDefaultItemText,
        getItemSelected = getDefaultItemSelected,
        filterItems = createFilter(),
        data = [],
        emptyText = 'No options',
        open: openProp,
        value: valueProp,
        defaultValue,
        inputValue: inputValueProp,
        listProps = {
            maxHeight: 250
        },
        onOpen = () => {},
        onClose = () => {},
        onChange = () => {},
        onBlur = () => {},
        onInputChange = () => {},
        ...other
    } = props;

    const [popperStyle, setPopperStyle] = useState({});
    const [open, setOpen] = useControlled(openProp, false);
    const [value, setValue] = useControlled(valueProp, defaultValue);
    const [inputValue, setInputValue] = useControlled(inputValueProp, '');

    const anchorRef = useRef(null);
    const inputRef = useRef(null);
    const handleAnchorRef = useForkRef(anchorRef, ref);
    const listItemsRef = useRef(null);
    const listScrollbarRef = useRef(null);
    const { referenceRef, popperRef, popperState, popperInstance } = usePopper();

    const getItemText = getValidItemText(getItemTextProp);
    const inputValueIsSelectedValue = !!value && inputValue === getItemText(value);
    const filteredItems = filterItems(data, {
        inputValue: inputValueIsSelectedValue ? '' : inputValue,
        getItemText
    });

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

    const handleValue = useEventCallback((ev, newValue) => {
        setValue(newValue);
        defineEventTarget(ev, { value: newValue });
        onChange(ev);
    });

    const handleInputValue = useEventCallback((ev, newValue) => {
        const inputNewValue = getItemText(newValue);

        setInputValue(inputNewValue);

        defineEventTarget(ev, { value: inputNewValue });
        onInputChange(ev);
    });

    const setNewValue = useEventCallback((ev, newValue) => {
        handleValue(ev, newValue);
        handleInputValue(ev, newValue);
        handleClose(ev);
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

    const handleInputChange = useEventCallback((ev) => {
        const newValue = ev.target.value;

        if (newValue !== inputValue) {
            setInputValue(newValue);
            onInputChange(ev);
        }

        if (newValue === '') {
            handleValue(ev, null);
        }

        handleOpen(ev);
    });

    const handleInputBlur = useEventCallback((ev) => {
        onBlur(ev);
        handleClose(ev);
    });

    const handleItemClick = useEventCallback((index) => (ev) => {
        const newValue = filteredItems[index];

        setNewValue(ev, newValue);
    });

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

    if (!renderInput) {
        return null;
    }

    const inputElement = React.cloneElement(renderInput(other), {
        ...other,
        value: inputValue,
        defaultValue,
        ref: inputRef,
        onKeyDown: handleInputKeyDown,
        onChange: handleInputChange,
        onBlur: handleInputBlur
    });

    const items = filteredItems.map((item, index) => {
        const selected = !!value && getItemSelected(value, item);

        const itemProps = {
            key: index,
            button: true,
            selected,
            onClick: handleItemClick(index)
        };

        if (renderItem) {
            return React.cloneElement(renderItem(item, { index }), itemProps);
        }

        const itemText = getItemText(item);

        return (
            <ListItem {...itemProps}>
                <ListItemText>{itemText}</ListItemText>
            </ListItem>
        );
    });

    const noItems = items.length === 0 && (
        <ListItem disabled>
            <ListItemText>{emptyText}</ListItemText>
        </ListItem>
    );

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div
                role="presentation"
                className={classNames('search-input')}
                ref={handleAnchorRef}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            >
                {inputElement}
                {open && (
                    <Portal>
                        <div
                            role="presentation"
                            className="popper menu"
                            style={popperStyle}
                            ref={popperRef}
                            onMouseDown={handlePopperMouseDown}
                        >
                            <List {...listProps} scrollbarRef={listScrollbarRef}>
                                <div ref={listItemsRef}>
                                    {noItems}
                                    {items}
                                </div>
                            </List>
                        </div>
                    </Portal>
                )}
            </div>
        </ClickAwayListener>
    );
});

Autocomplete.propTypes = {
    renderInput: PropTypes.func.isRequired,
    renderItem: PropTypes.func,
    getItemText: PropTypes.func,
    getItemSelected: PropTypes.func,
    filterItems: PropTypes.func,
    data: PropTypes.array,
    emptyText: PropTypes.string,
    inputValue: PropTypes.any,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    open: PropTypes.bool,
    listProps: PropTypes.object,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onInputChange: PropTypes.func
};

export default Autocomplete;
