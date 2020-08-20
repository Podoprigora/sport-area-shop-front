import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useForkRef from '@ui/hooks/useForkRef';
import useEventCallback from '@ui/hooks/useEventCallback';
import isEmptyString from '@ui/utils/isEmptyString';
import useControlled from '@ui/hooks/useControlled';
import Menu, { MenuItem } from '@ui/Menu';
import { InputIconButton } from '@ui/Input';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import defineEventTarget from '@ui/utils/defineEventTarget';
import { ListItem, ListItemText } from '@ui/List';
import SelectInputMenu from './SelectInputMenu';
import { SelectInputContext } from './SelectInputContext';

const getDefaultItemValue = (item) => item;
const getDefaultItemText = (item) => (typeof item === 'string' ? item : '');
const getDefaultItemSelected = (item, value) => String(item) === String(value);

const SelectInput = React.forwardRef(function SelectInput(props, ref) {
    const {
        data = [],
        id,
        name,
        defaultValue,
        value: propValue,
        placeholder,
        tabIndex = '0',
        className,
        disabled,
        readOnly,
        autoFocus,
        fullWidth,
        error,
        openOnFocus = false,
        multiline = false,
        resetButton = false,
        style,
        menuListMaxHeight,
        emptyItem = false,
        emptyItemText = 'None',
        emptyItemValue = '',
        renderItem,
        getItemText = getDefaultItemText,
        getItemValue = getDefaultItemValue,
        getItemSelected = getDefaultItemSelected,
        onBlur,
        onFocus,
        onChange
    } = props;

    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useControlled(propValue, defaultValue);

    const displayRef = useRef(null);
    const inputRef = useRef(null);
    const handleInputRef = useForkRef(inputRef, ref);
    const displayValueRef = useRef('');

    const hadBlurRecently = useRef(false);
    const hadBlurRecentlyTimeout = useRef(null);

    // Handlers

    const doChange = useCallback(
        (ev, newValue) => {
            setValue(newValue);

            if (onChange) {
                defineEventTarget(ev, { name, value: newValue });
                onChange(ev);
            }
        },
        [name, setValue, onChange]
    );

    const doOpenChange = useCallback(
        (isOpen) => {
            if (!disabled) {
                setOpen(isOpen);
            }
        },
        [disabled]
    );

    const handleFocus = useCallback(
        (ev) => {
            setFocused(true);

            if (openOnFocus && !hadBlurRecently.current) {
                doOpenChange(true);
            }

            if (!open && onFocus) {
                defineEventTarget(ev, { name, value });
                onFocus(ev);
            }
        },
        [value, name, open, doOpenChange, openOnFocus, onFocus]
    );

    const handleBlur = useCallback(
        (ev) => {
            hadBlurRecently.current = true;

            clearTimeout(hadBlurRecentlyTimeout.current);

            hadBlurRecentlyTimeout.current = null;
            hadBlurRecentlyTimeout.current = setTimeout(() => {
                hadBlurRecently.current = false;
            }, 100);

            setFocused(false);

            if (!open && onBlur) {
                defineEventTarget(ev, { name, value });
                onBlur(ev);
            }
        },
        [value, open, name, onBlur]
    );

    const handleMouseDown = useCallback(
        (ev) => {
            if (ev.button !== 0) {
                return;
            }

            ev.preventDefault();

            if (!open) {
                doOpenChange(true);
            }
        },
        [open, doOpenChange]
    );

    const handleKeyDown = useEventCallback((ev) => {
        switch (ev.key) {
            case ' ':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'Enter':
                ev.preventDefault();

                doOpenChange(true);
                break;
            default:
                break;
        }
    });

    const handleMenuClose = useEventCallback((ev) => {
        doOpenChange(false);
    });

    const handleResetButtonClick = useEventCallback((ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        doChange(ev, '');
    });

    const handleItemClick = useCallback(
        (ev, newValue) => {
            doOpenChange(false);

            if (value !== newValue) {
                doChange(ev, newValue);
            }
        },
        [value, doChange, doOpenChange]
    );

    // Effects

    useEffect(() => {
        if (autoFocus && displayRef.current) {
            displayRef.current.focus();
        }
    }, [autoFocus]);

    // Render

    data.forEach((item, index) => {
        const selected = !isEmptyString(value) && getItemSelected(item, value);
        const itemText = getItemText(item, index);

        if (selected) {
            displayValueRef.current = itemText;
        } else if (isEmptyString(value)) {
            displayValueRef.current = '';
        }
    });

    const ChevronIconComponent = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

    let displayContent = displayValueRef.current;

    if (isEmptyString(displayContent)) {
        if (!isEmptyString(placeholder)) {
            displayContent = <div className="select-input__placeholder">{placeholder}</div>;
        } else {
            displayContent = <div dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
        }
    }

    const contextValue = useMemo(
        () => ({
            data,
            value,
            getItemValue,
            getItemText,
            getItemSelected,
            emptyItem,
            emptyItemText,
            emptyItemValue,
            renderItem
        }),
        [
            data,
            emptyItem,
            emptyItemText,
            emptyItemValue,
            getItemSelected,
            getItemText,
            getItemValue,
            renderItem,
            value
        ]
    );

    return (
        <div
            role="presentation"
            className={classNames('select-input input', className, {
                'select-input--multiline': multiline,
                'input--focused': focused,
                'input--disabled': disabled,
                'select-input--disabled': disabled,
                'input--full-width': fullWidth,
                'input--error': error
            })}
            tabIndex={tabIndex}
            style={style}
            ref={displayRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
        >
            <input type="hidden" ref={handleInputRef} {...{ id, value, disabled, readOnly }} />
            <div className="select-input__display">{displayContent}</div>
            {resetButton && !!value && (
                <InputIconButton tabIndex="-1" onMouseDown={handleResetButtonClick}>
                    <ClearCloseIcon />
                </InputIconButton>
            )}
            <ChevronIconComponent className="select-input__chevron" size="medium" />

            <SelectInputContext.Provider value={contextValue}>
                <SelectInputMenu
                    open={open}
                    anchorRef={displayRef}
                    onClose={handleMenuClose}
                    onItemClick={handleItemClick}
                    menuListMaxHeight={menuListMaxHeight}
                />
            </SelectInputContext.Provider>
        </div>
    );
});

SelectInput.propTypes = {
    data: PropTypes.array,
    id: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoFocus: PropTypes.bool,
    fullWidth: PropTypes.bool,
    error: PropTypes.bool,
    multiline: PropTypes.bool,
    openOnFocus: PropTypes.bool,
    resetButton: PropTypes.bool,
    style: PropTypes.object,
    menuListMaxHeight: PropTypes.number,
    emptyItem: PropTypes.bool,
    emptyItemText: PropTypes.string,
    emptyItemValue: PropTypes.any,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    renderItem: PropTypes.func,
    getItemText: PropTypes.func,
    getItemValue: PropTypes.func,
    getItemSelected: PropTypes.func
};

export default SelectInput;
