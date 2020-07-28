import React, { useCallback, useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StarGradeIcon from '@svg-icons/material/StarGradeIcon';
import useEventCallback from '@ui/hooks/useEventCallback';

const RatingItem = (props) => {
    const {
        name,
        value = 0,
        checked,
        selected,
        tabIndex = 0,
        size = 'large',
        disabled,
        readOnly,
        onChange,
        onMouseEnter,
        onFocus,
        onBlur
    } = props;

    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const hiddenFocusRef = useRef(false);

    const handleChange = useEventCallback((ev) => {
        if (onChange && !readOnly) {
            onChange(ev);
        }
    });

    const handleMouseEnter = useEventCallback((ev) => {
        if (onMouseEnter && !disabled && !readOnly) {
            onMouseEnter(ev);
        }
    });

    const handleMouseDown = useCallback(
        (ev) => {
            if (!readOnly) {
                ev.preventDefault();

                if (inputRef.current) {
                    hiddenFocusRef.current = true;
                    inputRef.current.focus();
                }
            }
        },
        [readOnly]
    );

    const handleFocus = useCallback(
        (ev) => {
            if (!readOnly) {
                if (!hiddenFocusRef.current) {
                    setFocused(true);
                }

                if (onFocus) {
                    onFocus(ev);
                }
            }
        },
        [readOnly, onFocus]
    );

    const handleBlur = useCallback(
        (ev) => {
            if (!readOnly) {
                hiddenFocusRef.current = false;
                setFocused(false);

                if (onBlur) {
                    onBlur(ev);
                }
            }
        },
        [readOnly, onBlur]
    );

    return (
        <div
            className={classNames('rating__item', {
                'rating__item--focused': focused,
                'rating__item--disabled': disabled,
                'rating__item--read-only': readOnly,
                [`rating__item--${size}`]: size
            })}
        >
            <div
                className={classNames('rating__icon', {
                    'rating__icon--selected': selected
                })}
            />

            {!readOnly && (
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    className="rating__input"
                    disabled={disabled}
                    tabIndex={readOnly ? -1 : tabIndex}
                    ref={inputRef}
                    onChange={handleChange}
                    onMouseEnter={handleMouseEnter}
                    onMouseDown={handleMouseDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )}
        </div>
    );
};

RatingItem.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
    selected: PropTypes.bool,
    value: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func
};

export default RatingItem;
