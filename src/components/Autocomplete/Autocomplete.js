import React, { useRef, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import useForkRef from '@components/hooks/useForkRef';
import { usePopper } from '@components/Popper';
import Portal from '@components/Portal';
import ClickAwayListener from '@components/ClickAwayListener';
import List, { ListItem, ListItemText } from '@components/List';
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

const defaultFilterItems = (items, { inputValue = '', getItemText = getDefaultItemText }) => {
    const query = inputValue.trim().toLowerCase();

    return items.filter((item) => {
        let itemText = getItemText(item);
        itemText = itemText.toLowerCase();

        return itemText.indexOf(query) !== -1;
    });
};

const defaultHighlightedIndex = -1;

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
    const {
        renderInput,
        renderItem,
        getItemText: getItemTextProp = getDefaultItemText,
        getItemSelected = getDefaultItemSelected,
        filterItems = defaultFilterItems,
        data = [],
        emptyText = 'No options',
        open: openProp,
        value: valueProp,
        defaultValue,
        inputValue: inputValueProp,
        listProps = {
            maxHeight: 250
        },
        listPlacement = 'bottom-start',
        onOpen = () => {},
        onClose = () => {},
        onChange = () => {},
        onBlur = () => {},
        onInputChange = () => {},
        ...other
    } = props;

    const [popperStyle, setPopperStyle] = useState({});
    const [highlightedIndex, setHeighlightedIndex] = useState(defaultHighlightedIndex);
    const [open, setOpen] = useControlled(openProp, false);
    const [value, setValue] = useControlled(valueProp, defaultValue);
    const [inputValue, setInputValue] = useControlled(inputValueProp, '');
    const [listItemsNode, setListItemsNode] = useState(null);
    const [listScrollbarNode, setListScrollbarNode] = useState(null);
    const [exited, setExited] = useState(true);

    const anchorRef = useRef(null);
    const inputRef = useRef(null);
    const handleAnchorRef = useForkRef(anchorRef, ref);
    const { referenceRef, popperRef, popperState, popperInstance } = usePopper({
        placement: listPlacement
    });

    const getItemText = getValidItemText(getItemTextProp);
    const inputValueIsSelectedValue = !!value && inputValue === getItemText(value);
    const filteredItems = filterItems(data, {
        inputValue: inputValueIsSelectedValue ? '' : inputValue,
        getItemText
    });

    // Handlers

    const handleHighlightIndex = useEventCallback((index = null) => {
        if (index !== highlightedIndex) {
            setHeighlightedIndex(typeof index === 'number' ? index : defaultHighlightedIndex);
        }

        // Scrolling item into view
        if (listScrollbarNode && listScrollbarNode.scrollHeight > listScrollbarNode.clientWidth) {
            const highlightedItemNode = listScrollbarNode.querySelector(`[data-index='${index}']`);

            if (highlightedItemNode) {
                highlightedItemNode.scrollIntoView({ block: 'nearest' });
            } else {
                listScrollbarNode.scrollTop = 0;
            }
        }
    });

    const updateHighlightedIndex = useEventCallback((offset = 1) => {
        const itemsLenght = filteredItems.length;
        let newIndex = defaultHighlightedIndex;

        if (!open) {
            return;
        }

        if (offset === 1) {
            newIndex = (highlightedIndex + offset) % itemsLenght;
        } else {
            newIndex = highlightedIndex > 0 ? highlightedIndex + offset : itemsLenght - 1;
        }

        // Validate index
        if (listItemsNode) {
            let nextElement = listItemsNode.querySelector(`[data-index='${newIndex}']`);

            while (nextElement) {
                if (
                    nextElement.getAttribute('role') !== 'button' ||
                    nextElement.getAttribute('aria-disabled') === 'true'
                ) {
                    nextElement =
                        offset === 1
                            ? nextElement.nextElementSibling
                            : nextElement.previousElementSibling;

                    newIndex = offset === 1 ? newIndex + 1 : newIndex - 1;
                } else {
                    break;
                }
            }

            if (nextElement) {
                handleHighlightIndex(newIndex);
            }
        }
    });

    const resetHighlightedIndex = useEventCallback(() => {
        let selectedIndex = defaultHighlightedIndex;

        if (!open) {
            return;
        }

        if (value) {
            selectedIndex = filteredItems.findIndex((item) => getItemSelected(value, item));
        }

        handleHighlightIndex(selectedIndex);
    });

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

    const handlePopperMouseDown = useCallback((ev) => {
        ev.preventDefault();
    }, []);

    const handleInputMouseDown = useEventCallback((ev) => {
        handleOpen(ev);
    });

    const handleInputKeyDown = useEventCallback((ev) => {
        switch (ev.key) {
            case 'Escape':
                handleClose(ev);
                break;
            case 'ArrowDown':
                ev.preventDefault();

                handleOpen(ev);
                updateHighlightedIndex(1);
                break;
            case 'ArrowUp':
                ev.preventDefault();

                handleOpen(ev);
                updateHighlightedIndex(-1);
                break;
            case 'Enter':
                ev.preventDefault();

                if (open && highlightedIndex !== defaultHighlightedIndex) {
                    const newValue = filteredItems[highlightedIndex];
                    setNewValue(ev, newValue);
                }
                break;
            default:
                break;
        }
    });

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

    const handleTransitionEnter = useCallback((ev) => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback((ev) => {
        setExited(true);
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

    useEffect(() => {
        resetHighlightedIndex();
    }, [open, inputValue, listScrollbarNode, resetHighlightedIndex]);

    // Render

    if (!renderInput) {
        return null;
    }

    const inputElement = React.cloneElement(renderInput(other), {
        ...other,
        value: inputValue,
        defaultValue,
        ref: inputRef,
        onMouseDown: handleInputMouseDown,
        onKeyDown: handleInputKeyDown,
        onChange: handleInputChange,
        onBlur: handleInputBlur
    });

    const items = filteredItems.map((item, index) => {
        const selected = !!value && getItemSelected(value, item);
        const highlighted = index === highlightedIndex;

        const itemProps = {
            key: index,
            button: true,
            selected,
            highlighted,
            'data-index': index,
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

    const placement = popperState.placement || listPlacement;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div role="presentation" className={classNames('search-input')} ref={handleAnchorRef}>
                {inputElement}
                {(open || !exited) && (
                    <Portal>
                        <div
                            role="presentation"
                            className="popper"
                            style={popperStyle}
                            ref={popperRef}
                            onMouseDown={handlePopperMouseDown}
                        >
                            <CSSTransition
                                in={open && !!popperInstance}
                                classNames="menu"
                                timeout={300}
                                onEnter={handleTransitionEnter}
                                onExited={handleTransitionExited}
                            >
                                <List
                                    {...listProps}
                                    className={classNames('menu', listProps.className, {
                                        [`u-placement-${placement}`]: placement
                                    })}
                                    scrollbarRef={setListScrollbarNode}
                                >
                                    <div className="u-overflow-hidden" ref={setListItemsNode}>
                                        {noItems}
                                        {items}
                                    </div>
                                </List>
                            </CSSTransition>
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
    listPlacement: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onInputChange: PropTypes.func
};

export default Autocomplete;
