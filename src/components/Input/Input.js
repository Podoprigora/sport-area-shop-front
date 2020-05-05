import React, { useState, useEffect, useCallback, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useForkRef from '@components/hooks/useForkRef';

const Input = forwardRef(function Input(props, ref) {
    const { type, disabled, autoFocus, fullWidth, ...other } = props;

    const [focused, setFocused] = useState(false);

    const inputRef = useRef(null);
    const handleInputRef = useForkRef(inputRef, ref);

    useEffect(() => {
        if (autoFocus) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleFocus = useCallback((ev) => {
        setFocused(true);
    }, []);

    const handleBlur = useCallback((ev) => {
        setFocused(false);
    }, []);

    const inputEl = (
        <input
            type={type}
            ref={handleInputRef}
            className="input__el"
            {...{ disabled }}
            {...other}
        />
    );

    return (
        <div
            role="presentation"
            className={classNames('input', {
                'input--disabled': disabled,
                'input--focused': focused,
                'input--full-width': fullWidth
            })}
            tabIndex={-1}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {inputEl}
        </div>
    );
});

Input.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    fullWidth: PropTypes.bool
};

Input.defaultProps = {
    type: 'text'
};

export default Input;
