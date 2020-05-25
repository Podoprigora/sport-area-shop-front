import React, { useState, useEffect, useCallback, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useForkRef from '@components/hooks/useForkRef';
import InputAdornment from './InputAdornment';

const Input = forwardRef(function Input(props, ref) {
    const {
        type = 'text',
        id,
        name,
        defaultValue,
        value,
        placeholder,
        disabled,
        required,
        readOnly,
        autoFocus,
        autoComplete,
        fullWidth,
        tabIndex = '0',
        error,
        className,
        style,
        inputComponent = 'input',
        inputProps,
        prependAdornment,
        appendAdornment,
        onBlur,
        onFocus,
        onChange,
        onClick,
        onKeyDown,
        onKeyUp,
        ...other
    } = props;

    const [focused, setFocused] = useState(false);

    const inputRef = useRef(null);
    const handleInputRef = useForkRef(inputRef, ref);

    const handleFocus = (ev) => {
        if (onFocus) {
            onFocus(ev);
        }

        setFocused(true);
    };

    const handleBlur = (ev) => {
        if (onBlur) {
            onBlur(ev);
        }

        setFocused(false);
    };

    const handleChange = (ev) => {
        if (onChange) {
            onChange(ev);
        }
    };

    const handleClick = useCallback((ev) => {
        if (inputRef.current && ev.target === ev.currentTarget) {
            inputRef.current.focus();
        }
    }, []);

    let InputComponent = inputComponent;
    if (type === 'textarea') {
        InputComponent = 'textarea';
    }

    const inputEl = (
        <InputComponent
            type={type}
            ref={handleInputRef}
            className="input__el"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...{
                disabled,
                id,
                name,
                defaultValue,
                value,
                tabIndex,
                placeholder,
                required,
                readOnly,
                autoFocus,
                autoComplete,
                onClick,
                onKeyDown,
                onKeyUp
            }}
            {...inputProps}
        />
    );

    return (
        <div
            role="presentation"
            className={classNames('input', className, {
                'input--disabled': disabled,
                'input--focused': focused || error,
                'input--full-width': fullWidth,
                'input--error': error
            })}
            style={style}
            tabIndex="-1"
            onClick={handleClick}
        >
            {prependAdornment && (
                <InputAdornment start disabled={disabled}>
                    {prependAdornment(props)}
                </InputAdornment>
            )}
            {inputEl}
            {appendAdornment && (
                <InputAdornment end disabled={disabled}>
                    {appendAdornment(props)}
                </InputAdornment>
            )}
        </div>
    );
});

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoFocus: PropTypes.bool,
    autoComplete: PropTypes.bool,
    fullWidth: PropTypes.bool,
    error: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    inputProps: PropTypes.object,
    inputComponent: PropTypes.elementType,
    prependAdornment: PropTypes.func,
    appendAdornment: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func
};

Input.defaultProps = {
    type: 'text'
};

export default Input;
