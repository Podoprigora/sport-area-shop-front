import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useForkRef from '@components/hooks/useForkRef';
import useEventCallback from '@components/hooks/useEventCallback';
import isEmptyString from '@components/utils/isEmptyString';
import useControlled from '@components/hooks/useControlled';
import Menu from '@components/Menu';
import { InputIconButton } from '@components/Input';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import defineEventTarget from '@components/utils/defineEventTarget';

const getNestedPropsChildrenString = (component) => {
    if (Array.isArray(component) && component.length > 0) {
        return component.reduce((acc, item) => {
            const result = getNestedPropsChildrenString(item);
            return result || acc;
        }, null);
    }

    if (!component || !component.props) {
        return null;
    }

    if (typeof component.props.children === 'string') {
        return component.props.children;
    }

    return getNestedPropsChildrenString(component.props.children);
};

const SelectInput = React.forwardRef(function SelectInput(props, ref) {
    const {
        id,
        name,
        defaultValue,
        value: propValue,
        placeholder,
        tabIndex = '0',
        className,
        children,
        disabled,
        readOnly,
        autoFocus,
        fullWidth,
        error,
        openOnFocus = false,
        multiline = false,
        resetButton = false,
        style,
        menuProps,
        onBlur = () => {},
        onFocus = () => {},
        onChange = () => {},
        ...other
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

            defineEventTarget(ev, { name, value: newValue });
            onChange(ev);
        },
        [name, setValue, onChange]
    );

    const handleFocus = useCallback(
        (ev) => {
            setFocused(true);

            if (openOnFocus && !hadBlurRecently.current) {
                setOpen(true);
            }

            defineEventTarget(ev, { name, value });
            onFocus(ev);
        },
        [name, value, openOnFocus, onFocus]
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

            defineEventTarget(ev, { name, value });
            onBlur(ev);
        },
        [name, value, onBlur]
    );

    const handleMouseDown = useEventCallback((ev) => {
        ev.preventDefault();

        displayRef.current.focus();
        setOpen(true);
    });

    const handleKeyDown = useEventCallback((ev) => {
        switch (ev.key) {
            case ' ':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'Enter':
                ev.preventDefault();

                setOpen(true);
                break;
            default:
                break;
        }
    });

    const handleItemClick = useCallback(
        (child) => (ev) => {
            ev.stopPropagation();

            const newValue = child.props.value;

            setOpen(false);

            if (child.props.onClick) {
                child.props.onClick(ev);
            }

            if (value === newValue) {
                return;
            }

            doChange(ev, newValue);
        },
        [value, doChange]
    );

    const handleMenuClose = useCallback((ev) => {
        setOpen(false);
    }, []);

    const handleResetButtonClick = useCallback(
        (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            doChange(ev, '');
        },
        [doChange]
    );

    // Effects

    useEffect(() => {
        if (autoFocus && displayRef.current) {
            displayRef.current.focus();
        }
    }, [autoFocus]);

    // Render

    const items = React.Children.map(children, (child, index) => {
        const selected = !isEmptyString(value) && String(value) === String(child.props.value);

        if (selected) {
            displayValueRef.current = getNestedPropsChildrenString(child);
        } else if (isEmptyString(value)) {
            displayValueRef.current = '';
        }

        return React.cloneElement(child, {
            selected,
            onClick: handleItemClick(child),
            value: undefined,
            'data-value': child.props.value
        });
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

    return (
        <div
            role="button"
            className={classNames('select-input input', className, {
                'select-input--multiline': multiline,
                'input--focused': focused,
                'input--disabled': disabled,
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
            {...other}
        >
            <input type="hidden" ref={handleInputRef} {...{ value, disabled, readOnly }} />
            <div className="select-input__display">{displayContent}</div>
            {resetButton && !!value && (
                <InputIconButton tabIndex="-1" onMouseDown={handleResetButtonClick}>
                    <ClearCloseIcon />
                </InputIconButton>
            )}

            <ChevronIconComponent className="select-input__chevron" size="medium" />
            <Menu
                open={open}
                anchorRef={displayRef}
                onClose={handleMenuClose}
                autoWidth
                maxHeight={250}
                {...menuProps}
            >
                {items}
            </Menu>
        </div>
    );
});

SelectInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoFocus: PropTypes.bool,
    fullWidth: PropTypes.bool,
    error: PropTypes.bool,
    multiline: PropTypes.bool,
    openOnFocus: PropTypes.bool,
    resetButton: PropTypes.bool,
    style: PropTypes.object,
    menuProps: PropTypes.object,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func
};

export default SelectInput;
