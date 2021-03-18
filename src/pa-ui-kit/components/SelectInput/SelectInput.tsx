import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import {
    useMergedRefs,
    useEventCallback,
    isEmptyString,
    useControlled,
    defineEventTarget,
    createCtx
} from '../utils';
import { InputIconButton } from '../Input';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon, ClearCloseIcon } from '../svg-icons/material';

import { SelectInputMenu, SelectInputMenuProps } from './SelectInputMenu';

export type DataItem = string | Record<string, unknown>;

export interface SelectInputProps<T extends DataItem> extends React.ComponentPropsWithRef<'input'> {
    data?: T[];
    value?: string;
    defaultValue?: string;
    fullWidth?: boolean;
    error?: boolean;
    focused?: boolean;
    openOnFocus?: boolean;
    multiline?: boolean;
    resetButton?: boolean;
    menuListMaxHeight?: number;
    menuOffset?: SelectInputMenuProps['menuOffset'];
    /**
     * Should display empty item to reset.
     */
    emptyItem?: boolean;
    emptyItemText?: string;
    emptyItemValue?: string;

    renderItem?(item: T, selected: boolean): React.ReactNode;
    getItemText?(item: T): string;
    getItemValue?(item: T, index?: number): string;
    getItemSelected?(item: T, value: SelectInputProps<DataItem>['value']): boolean;
}

type SelectInputContextValue = Pick<SelectInputProps<DataItem>, 'data' | 'value' | 'renderItem'> &
    Required<
        Pick<
            SelectInputProps<DataItem>,
            | 'emptyItem'
            | 'emptyItemText'
            | 'emptyItemValue'
            | 'getItemText'
            | 'getItemValue'
            | 'getItemSelected'
        >
    >;

const SelectInputContext = createCtx<SelectInputContextValue>();
export const useSelectInputContext = SelectInputContext.useContext;

const getDefaultItemValue = (item: DataItem) => (typeof item === 'string' ? item : '');
const getDefaultItemText = (item: DataItem) => (typeof item === 'string' ? item : '');
const getDefaultItemSelected = (item: DataItem, value: SelectInputProps<DataItem>['value']) =>
    String(item) === String(value);

function SelectInputWithRef<T extends DataItem>(
    props: SelectInputProps<T>,
    forwardedRef: React.Ref<HTMLInputElement>
) {
    const {
        data = [],
        id,
        name,
        defaultValue,
        value: propValue,
        placeholder,
        tabIndex = 0,
        className,
        disabled,
        readOnly,
        autoFocus,
        fullWidth,
        focused: focusedProp,
        error,
        openOnFocus = false,
        multiline = false,
        resetButton = false,
        style,
        menuListMaxHeight,
        menuOffset,
        emptyItem = false,
        emptyItemText = 'None',
        emptyItemValue = '',
        renderItem,
        getItemText = getDefaultItemText,
        getItemValue = getDefaultItemValue,
        getItemSelected = getDefaultItemSelected,
        onBlur,
        onFocus,
        onChange,
        ...other
    } = props;

    const [focused, setFocused] = useControlled(focusedProp, false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useControlled(propValue, defaultValue);

    const displayRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleInputRef = useMergedRefs(inputRef, forwardedRef);
    const displayValueRef = useRef<React.ReactNode>('');

    const hadBlurRecently = useRef(false);
    const hadBlurRecentlyTimeout = useRef<number>();

    // Handlers

    const doChange = useCallback(
        (ev: React.SyntheticEvent, newValue: string) => {
            setValue(newValue);

            if (onChange) {
                const changeEvent = ev as React.ChangeEvent<HTMLInputElement>;

                defineEventTarget(changeEvent, { name, value: newValue });
                onChange(changeEvent);
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
        (ev: React.FocusEvent<HTMLDivElement>) => {
            setFocused(true);

            if (openOnFocus && !hadBlurRecently.current) {
                doOpenChange(true);
            }

            if (onFocus) {
                const focusEvent = ev as React.FocusEvent<HTMLInputElement>;

                defineEventTarget<HTMLInputElement>(focusEvent, { name, value });
                onFocus(focusEvent);
            }
        },
        [setFocused, openOnFocus, onFocus, doOpenChange, name, value]
    );

    const handleBlur = useCallback(
        (ev: React.FocusEvent<HTMLDivElement>) => {
            hadBlurRecently.current = true;

            clearTimeout(hadBlurRecentlyTimeout.current);

            hadBlurRecentlyTimeout.current = undefined;
            hadBlurRecentlyTimeout.current = setTimeout(() => {
                hadBlurRecently.current = false;
            }, 100);

            setFocused(false);

            if (onBlur) {
                const focusEvent = ev as React.FocusEvent<HTMLInputElement>;

                defineEventTarget<HTMLInputElement>(focusEvent, { name, value });
                onBlur(focusEvent);
            }
        },
        [setFocused, onBlur, name, value]
    );

    const handleMouseDown = useCallback(
        (ev: React.MouseEvent) => {
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

    const handleKeyDown = useEventCallback((ev: React.KeyboardEvent) => {
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

    const handleMenuClose = useEventCallback(() => {
        doOpenChange(false);
    });

    const handleResetButtonClick = useEventCallback((ev: React.SyntheticEvent) => {
        ev.preventDefault();
        ev.stopPropagation();

        doChange(ev, '');
    });

    const handleItemClick = useCallback(
        (ev: React.SyntheticEvent, newValue: string) => {
            if (value !== newValue) {
                doChange(ev, newValue);
            }

            setTimeout(() => {
                doOpenChange(false);
            }, 100);
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

    data.forEach((item) => {
        const selected = !isEmptyString(value) && getItemSelected(item, value);
        const itemText = getItemText(item);

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
            {...other}
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
                <InputIconButton tabIndex={-1} onMouseDown={handleResetButtonClick}>
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
                    menuOffset={menuOffset}
                />
            </SelectInputContext.Provider>
        </div>
    );
}

export const SelectInput = React.forwardRef(SelectInputWithRef) as <T extends DataItem>(
    props: SelectInputProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => JSX.Element;
