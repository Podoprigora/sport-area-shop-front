import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
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
import InputIconButton from '@components/Input/InputIconButton';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import CircularProgress from '@components/CircularProgress';

const getValidItemText = (getItemText) => (item) => {
    let text = getItemText(item);
    text = typeof text === 'string' ? text : '';

    return text;
};

const getDefaultValue = (item) => item;

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

const defaultListProps = {
    maxHeight: 250,
    placement: 'bottom-start'
};

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
    const {
        renderInput,
        renderItem,
        getValue = getDefaultValue,
        getItemText: getItemTextProp = getDefaultItemText,
        getItemSelected = getDefaultItemSelected,
        filterItems = defaultFilterItems,
        data = [],
        emptyText = 'No options',
        loadingText = 'Loading ...',
        open: openProp,
        loading = false,
        name,
        value: valueProp,
        defaultValue,
        inputValue: inputValueProp,
        listProps: listPropsProp,
        defaultHighlightedIndex = -1,
        openOnFocus = false,
        openButton = true,
        resetButton = true,
        fullWidth = false,
        className,
        style,
        onOpen = () => {},
        onClose = () => {},
        onChange = () => {},
        onFocus = () => {},
        onBlur = () => {},
        onInputChange = () => {},
        onInputKeyDown = () => {},
        onItemClick = () => {},
        ...other
    } = props;

    const { placement: listPlacement, width: listWidth, ...listProps } = {
        ...defaultListProps,
        ...listPropsProp
    };

    const [popperStyle, setPopperStyle] = useState({});
    const [highlightedIndex, setHeighlightedIndex] = useState(defaultHighlightedIndex);
    const [open, setOpen] = useControlled(openProp, false);
    const [value, setValue] = useControlled(valueProp, defaultValue);
    const [inputValue, setInputValue] = useControlled(inputValueProp, '');
    const [listItemsNode, setListItemsNode] = useState(null);
    const [listScrollbarNode, setListScrollbarNode] = useState(null);
    const [exited, setExited] = useState(true);

    const selectedInputValueRef = useRef(inputValueProp);
    const hadBlurRecently = useRef(false);
    const hadBlurRecentlyTimeout = useRef(null);
    const anchorRef = useRef(null);
    const inputRef = useRef(null);
    const handleAnchorRef = useForkRef(anchorRef, ref);
    const { referenceRef, popperRef, popperState, popperInstance } = usePopper({
        placement: listPlacement
    });

    const getItemText = useMemo(() => getValidItemText(getItemTextProp), [getItemTextProp]);

    const inputValueIsSelectedValue = useMemo(() => {
        return (
            open &&
            !!value &&
            ((typeof value === 'string' && inputValue === selectedInputValueRef.current) ||
                inputValue === getItemText(value))
        );
    }, [value, open, inputValue, getItemText]);

    const filteredItems = useMemo(() => {
        return filterItems(data, {
            inputValue: inputValueIsSelectedValue ? '' : inputValue,
            getItemText
        });
    }, [filterItems, data, inputValueIsSelectedValue, inputValue, getItemText]);

    // Handlers

    const handleHighlightIndex = useEventCallback((index = null) => {
        if (index !== highlightedIndex) {
            setHeighlightedIndex(typeof index === 'number' ? index : defaultHighlightedIndex);
        }

        // Scrolling item into view
        if (listScrollbarNode && listScrollbarNode.scrollHeight > listScrollbarNode.clientHeight) {
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

        if (selectedIndex === -1 && selectedIndex !== defaultHighlightedIndex) {
            selectedIndex = defaultHighlightedIndex;
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

        defineEventTarget(ev, { name, value: newValue ? getValue(newValue) : '' });
        onChange(ev);
    });

    const handleInputValue = useEventCallback((ev, newValue) => {
        const inputNewValue = newValue ? getItemText(newValue) : '';

        setInputValue(inputNewValue);
        selectedInputValueRef.current = inputNewValue;

        defineEventTarget(ev, { value: inputNewValue });
        onInputChange(ev);
    });

    const setNewValue = useEventCallback((ev, newValue) => {
        // Sequence of calls is matter!
        handleInputValue(ev, newValue);
        handleValue(ev, newValue);
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

                if (open && highlightedIndex !== -1) {
                    const newValue = filteredItems[highlightedIndex];
                    setNewValue(ev, newValue);
                    handleClose(ev);
                }
                break;
            default:
                break;
        }

        onInputKeyDown(ev);
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

    const handleInputFocus = useEventCallback((ev) => {
        if (openOnFocus && !hadBlurRecently.current) {
            handleOpen(ev);
        }

        defineEventTarget(ev, { name, value });
        onFocus(ev);
    });

    const handleInputBlur = useEventCallback((ev) => {
        hadBlurRecently.current = true;

        clearTimeout(hadBlurRecentlyTimeout.current);

        hadBlurRecentlyTimeout.current = null;
        hadBlurRecentlyTimeout.current = setTimeout(() => {
            hadBlurRecently.current = false;
        }, 100);

        handleClose(ev);

        defineEventTarget(ev, { name, value });
        onBlur(ev);
    });

    const handleItemClick = useCallback(
        (index) => (ev) => {
            const newValue = filteredItems[index];

            setNewValue(ev, newValue);
            handleClose(ev);
            onItemClick(ev, newValue);
        },
        [filteredItems, setNewValue, handleClose, onItemClick]
    );

    const handleTransitionEnter = useCallback((ev) => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback((ev) => {
        setExited(true);
    }, []);

    const handleChevronButtonClick = useEventCallback((ev) => {
        ev.preventDefault();

        inputRef.current.focus();

        if (open) {
            handleClose(ev);
        } else {
            handleOpen(ev);
        }
    });

    const handleResetButtonClick = useEventCallback((ev) => {
        ev.preventDefault();

        setNewValue(ev, '');
        inputRef.current.focus();
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
                return { ...prevStyle, width: listWidth || width };
            });
        }
    }, [listWidth]);

    useEffect(() => {
        resetHighlightedIndex();
    }, [filteredItems, listScrollbarNode, resetHighlightedIndex, defaultHighlightedIndex]);

    // Render

    const items = useMemo(() => {
        return (
            !loading &&
            filteredItems.map((item, index) => {
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
            })
        );
    }, [
        filteredItems,
        getItemSelected,
        getItemText,
        handleItemClick,
        highlightedIndex,
        loading,
        renderItem,
        value
    ]);

    const noItems = (!items || items.length === 0) && (
        <ListItem disabled>
            <ListItemText>{(loading && loadingText) || emptyText}</ListItemText>
        </ListItem>
    );

    if (!renderInput) {
        return null;
    }

    const inputElement = React.cloneElement(renderInput(other), {
        ...other,
        value: inputValue,
        defaultValue,
        fullWidth,
        ref: inputRef,
        onMouseDown: handleInputMouseDown,
        onKeyDown: handleInputKeyDown,
        onChange: handleInputChange,
        onFocus: handleInputFocus,
        onBlur: handleInputBlur,
        ...((resetButton || openButton || loading) && {
            appendAdornment: () => {
                return (
                    <>
                        {loading && <CircularProgress preset="small" />}
                        {resetButton && !loading && inputValue.length > 0 && (
                            <InputIconButton tabIndex="-1" onClick={handleResetButtonClick}>
                                <ClearCloseIcon />
                            </InputIconButton>
                        )}
                        {openButton && !loading && (
                            <InputIconButton tabIndex="-1" onClick={handleChevronButtonClick}>
                                {open ? (
                                    <KeyboardArrowUpIcon size="medium" />
                                ) : (
                                    <KeyboardArrowDownIcon size="medium" />
                                )}
                            </InputIconButton>
                        )}
                    </>
                );
            }
        })
    });

    const placement = popperState.placment || listPlacement;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div
                role="presentation"
                className={classNames('autocomplete-input', className, {
                    'autocomplete-input--full-width': fullWidth
                })}
                style={style}
                ref={handleAnchorRef}
            >
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
    getValue: PropTypes.func,
    getItemText: PropTypes.func,
    getItemSelected: PropTypes.func,
    filterItems: PropTypes.func,
    data: PropTypes.array,
    emptyText: PropTypes.string,
    inputValue: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    open: PropTypes.bool,
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
    listProps: PropTypes.object,
    defaultHighlightedIndex: PropTypes.number,
    resetButton: PropTypes.bool,
    openButton: PropTypes.bool,
    openOnFocus: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    onInputChange: PropTypes.func,
    onItemClick: PropTypes.func
};

export default Autocomplete;
