import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import { usePopper, UsePopperProps } from '../Popper';
import { useMergedRefs, useEventCallback, defineEventTarget, useControlled } from '../utils';
import { Portal } from '../Portal';
import { ClickAwayListener } from '../ClickAwayListener';
import { List, ListItem, ListItemText, ListProps } from '../List';
import { MenuItem } from '../Menu';
import { InputIconButton, InputProps } from '../Input';
import { CircularProgress } from '../CircularProgress';
import { KeyboardArrowUpIcon, KeyboardArrowDownIcon, ClearCloseIcon } from '../svg-icons/material';

type DataItem = string | Record<string, unknown> | undefined | null;

type DefaultListProps = {
    placement?: UsePopperProps['placement'];
    maxHeight?: number;
    width?: number;
};

type ListScrollbarRef = Required<Pick<ListProps, 'scrollbarRef'>>['scrollbarRef'];

type ExtendedProps = Omit<InputProps, 'component' | 'appendAdornment'>;

export interface AutocompleteProps extends ExtendedProps {
    renderInput(): React.ReactElement;
    renderItem?(item: DataItem, options: { index: number }): React.ReactElement;
    getValue?(item: DataItem): string;
    getItemText?(item: DataItem): string;
    getItemSelected?(item: DataItem, value: DataItem): boolean;
    filterItems?(): DataItem[];

    data?: DataItem[];
    value?: string;
    defaultValue?: string;
    inputValue?: string;
    emptyText?: string;
    open?: boolean;
    loading?: boolean;
    loadingText?: string;
    listProps?: DefaultListProps & ListProps;
    defaultHighlightedIndex?: number;
    resetButton?: boolean;
    openButton?: boolean;
    openOnFocus?: boolean;

    onOpen?: () => void;
    onClose?: () => void;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
    onInputKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
    onInputChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onItemClick?: (ev: React.MouseEvent<HTMLInputElement>, value: DataItem) => void;
}

const getDefaultValue = (item: DataItem) => item;

const getDefaultItemText = (item: DataItem) => (typeof item === 'string' ? item : '');

const getDefaultItemSelected = (item: DataItem, value: DataItem) => value === item;

const defaultFilterItems = (
    items: DataItem[],
    { inputValue = '', getItemText = getDefaultItemText }
): DataItem[] => {
    const query = inputValue.trim().toLowerCase();

    return items.filter((item) => {
        let itemText = getItemText(item);
        itemText = itemText.toLowerCase();

        return itemText.indexOf(query) !== -1;
    });
};

const defaultListProps = {
    maxHeight: 250,
    placement: 'bottom-start',
    width: undefined
} as DefaultListProps;

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
    function Autocomplete(props, forwardedRef) {
        const {
            renderInput,
            renderItem,
            getValue = getDefaultValue,
            getItemText = getDefaultItemText,
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
            onOpen,
            onClose,
            onChange,
            onFocus,
            onBlur,
            onInputChange,
            onInputKeyDown,
            onItemClick,
            ...other
        } = props;

        const { placement: listPlacement, width: listWidth, ...listProps } = {
            ...defaultListProps,
            ...listPropsProp
        };

        const [popperStyle, setPopperStyle] = useState<React.CSSProperties>({});
        const [highlightedIndex, setHeighlightedIndex] = useState(defaultHighlightedIndex);
        const [open, setOpen] = useControlled(openProp, false);
        const [value, setValue] = useControlled<DataItem>(valueProp, defaultValue);
        const [inputValue, setInputValue] = useControlled(inputValueProp, '');
        const [listItemsNode, setListItemsNode] = useState<HTMLDivElement | null>(null);
        // const [listScrollbarNode, setListScrollbarNode] = useState<ListScrollbarRef | null>(null);
        const listScrollbarRef: ListScrollbarRef = useRef(null);
        const [exited, setExited] = useState(true);

        const selectedInputValueRef = useRef(inputValueProp);
        const hadBlurRecently = useRef(false);
        const hadBlurRecentlyTimeout = useRef<number>();
        const anchorRef = useRef<HTMLDivElement | null>(null);
        const inputRef = useRef<HTMLInputElement | null>(null);
        const handleAnchorRef = useMergedRefs(anchorRef, forwardedRef);
        const { referenceRef, popperRef, popperInstance } = usePopper({
            placement: listPlacement
        });

        const inputValueIsSelectedValue = useMemo(() => {
            return (
                open &&
                !!value &&
                (inputValue === selectedInputValueRef.current || inputValue === getItemText(value))
            );
        }, [value, open, inputValue, getItemText]);

        const filteredItems = useMemo(() => {
            return filterItems(data, {
                inputValue: inputValueIsSelectedValue ? '' : inputValue,
                getItemText
            });
        }, [filterItems, data, inputValueIsSelectedValue, inputValue, getItemText]);

        // Handlers

        const handleHighlightIndex = useEventCallback((index: number | null = null) => {
            if (index !== highlightedIndex) {
                setHeighlightedIndex(typeof index === 'number' ? index : defaultHighlightedIndex);
            }

            // Scrolling item into view
            if (
                listScrollbarRef.current &&
                listScrollbarRef.current.getScrollHeight() >
                    listScrollbarRef.current.getClientHeight()
            ) {
                const highlightedItemNode = listItemsNode?.querySelector(`[data-index='${index}']`);

                if (highlightedItemNode) {
                    highlightedItemNode.scrollIntoView({ block: 'nearest' });
                } else {
                    listScrollbarRef.current.scrollTop(0);
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
                selectedIndex = filteredItems.findIndex((item) => getItemSelected(item, value));
            }

            if (selectedIndex === -1 && selectedIndex !== defaultHighlightedIndex) {
                selectedIndex = defaultHighlightedIndex;
            }

            handleHighlightIndex(selectedIndex);
        });

        const handleOpen = useEventCallback(() => {
            if (open) {
                return;
            }

            setOpen(true);

            if (onOpen) {
                onOpen();
            }
        });

        const handleClose = useEventCallback(() => {
            if (!open) {
                return;
            }

            setOpen(false);

            if (onClose) {
                onClose();
            }
        });

        const handleValue = useEventCallback(
            (ev: React.ChangeEvent<HTMLInputElement>, newValue: DataItem) => {
                setValue(newValue);

                if (onChange) {
                    defineEventTarget(ev, { name, value: newValue ? getValue(newValue) : '' });
                    onChange(ev);
                }
            }
        );

        const handleInputValue = useEventCallback(
            (ev: React.ChangeEvent<HTMLInputElement>, newValue: DataItem) => {
                const inputNewValue = newValue ? getItemText(newValue) : '';

                setInputValue(inputNewValue);
                selectedInputValueRef.current = inputNewValue;

                if (onInputChange) {
                    defineEventTarget(ev, { value: inputNewValue });
                    onInputChange(ev);
                }
            }
        );

        const setNewValue = useEventCallback((ev: React.SyntheticEvent, newValue: DataItem) => {
            // Sequence of calls is matter!
            handleInputValue(ev as React.ChangeEvent<HTMLInputElement>, newValue);
            handleValue(ev as React.ChangeEvent<HTMLInputElement>, newValue);
        });

        const handleClickAway = useEventCallback(() => {
            handleClose();
        });

        const handlePopperMouseDown = useCallback((ev: React.SyntheticEvent) => {
            ev.preventDefault();
        }, []);

        const handleInputMouseDown = useEventCallback(() => {
            handleOpen();
        });

        const handleInputKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
            switch (ev.key) {
                case 'Escape':
                    handleClose();
                    break;
                case 'ArrowDown':
                    ev.preventDefault();

                    handleOpen();
                    updateHighlightedIndex(1);
                    break;
                case 'ArrowUp':
                    ev.preventDefault();

                    handleOpen();
                    updateHighlightedIndex(-1);
                    break;
                case 'Enter':
                    ev.preventDefault();

                    if (open && highlightedIndex !== -1) {
                        const newValue = filteredItems[highlightedIndex];
                        setNewValue(ev, newValue);
                        handleClose();
                    }
                    break;
                default:
                    break;
            }

            if (onInputKeyDown) {
                onInputKeyDown(ev);
            }
        });

        const handleInputChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = ev.target.value;

            if (newValue !== inputValue) {
                setInputValue(newValue);

                if (onInputChange) {
                    onInputChange(ev);
                }
            }

            if (newValue === '') {
                handleValue(ev, null);
            }

            handleOpen();
        });

        const handleInputFocus = useEventCallback((ev: React.FocusEvent<HTMLInputElement>) => {
            if (openOnFocus && !hadBlurRecently.current) {
                handleOpen();
            }

            if (onFocus) {
                defineEventTarget(ev, { name, value });
                onFocus(ev);
            }
        });

        const handleInputBlur = useEventCallback((ev: React.FocusEvent<HTMLInputElement>) => {
            hadBlurRecently.current = true;

            clearTimeout(hadBlurRecentlyTimeout.current);

            hadBlurRecentlyTimeout.current = undefined;
            hadBlurRecentlyTimeout.current = setTimeout(() => {
                hadBlurRecently.current = false;
            }, 100);

            handleClose();

            if (onBlur) {
                defineEventTarget(ev, { name, value });
                onBlur(ev);
            }
        });

        const handleItemClick = useCallback(
            (index: number) => (ev: React.MouseEvent<HTMLInputElement>) => {
                const newValue = filteredItems[index];

                setNewValue(ev, newValue);
                handleClose();

                if (onItemClick) {
                    onItemClick(ev, newValue);
                }
            },
            [filteredItems, handleClose, onItemClick, setNewValue]
        );

        const handleTransitionEnter = useCallback(() => {
            setExited(false);
        }, []);

        const handleTransitionExited = useCallback(() => {
            setExited(true);
        }, []);

        const handleChevronButtonClick = useEventCallback((ev: React.MouseEvent) => {
            ev.preventDefault();

            if (inputRef.current) {
                inputRef.current.focus();
            }

            if (open) {
                handleClose();
            } else {
                handleOpen();
            }
        });

        const handleResetButtonClick = useEventCallback((ev: React.MouseEvent) => {
            ev.preventDefault();

            setNewValue(ev, '');

            if (inputRef.current) {
                inputRef.current.focus();
            }
        });

        // Effects

        useEffect(() => {
            if (anchorRef.current) {
                referenceRef(anchorRef.current);
            }
        }, [referenceRef]);

        useEffect(() => {
            function updatePopperStyle() {
                if (anchorRef.current && open) {
                    const width = anchorRef.current.clientWidth;

                    setPopperStyle((prevStyle) => {
                        return { ...prevStyle, width: listWidth || width };
                    });
                }
            }

            updatePopperStyle();

            if (listWidth) {
                return undefined;
            }

            const throttledCallback = throttle(updatePopperStyle, 166);

            window.addEventListener('resize', throttledCallback, false);

            return () => {
                window.removeEventListener('resize', throttledCallback, false);
            };
        }, [open, listWidth]);

        useEffect(() => {
            resetHighlightedIndex();
        }, [filteredItems, resetHighlightedIndex, defaultHighlightedIndex]);

        // Render

        const items = useMemo(() => {
            return filteredItems.map((item, index) => {
                const selected = !!value && getItemSelected(item, value);
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
                    <MenuItem {...itemProps} key={index}>
                        {itemText}
                    </MenuItem>
                );
            });
        }, [
            filteredItems,
            getItemSelected,
            getItemText,
            handleItemClick,
            highlightedIndex,
            renderItem,
            value
        ]);

        if (!renderInput) {
            return null;
        }

        const inputElement = React.cloneElement(renderInput(), {
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
                            {loading && <CircularProgress size="small" />}
                            {resetButton && !loading && inputValue && inputValue.length > 0 && (
                                <InputIconButton tabIndex={-1} onClick={handleResetButtonClick}>
                                    <ClearCloseIcon />
                                </InputIconButton>
                            )}
                            {openButton && !loading && (
                                <InputIconButton tabIndex={-1} onClick={handleChevronButtonClick}>
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

        const popperState = popperInstance && popperInstance.state;
        const placement = (popperState && popperState.placement) || listPlacement;

        const hasItems = items && items.length > 0;

        const noItems = (emptyText || (loading && loadingText)) && !hasItems && (
            <ListItem disabled>
                <ListItemText>{(loading && loadingText) || emptyText}</ListItemText>
            </ListItem>
        );

        const showPopper = open && (hasItems || !!noItems);

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
                    {(showPopper || !exited) && (
                        <Portal>
                            <div
                                role="presentation"
                                className="popper"
                                style={popperStyle}
                                ref={popperRef}
                                onMouseDown={handlePopperMouseDown}
                            >
                                <CSSTransition
                                    in={showPopper && !!popperInstance}
                                    classNames="menu"
                                    timeout={250}
                                    onEnter={handleTransitionEnter}
                                    onExited={handleTransitionExited}
                                >
                                    <List
                                        {...listProps}
                                        className={classNames('menu', listProps.className, {
                                            [`u-placement-${placement}`]: placement
                                        })}
                                        scrollbarRef={listScrollbarRef}
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
    }
);
