import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import { isString, useEventCallback } from '../utils';

export type RatingItemSize = 'small' | 'medium' | 'large';

export interface RatingItemProps {
    name?: string;
    checked?: boolean;
    selected?: boolean;
    value?: number;
    size?: RatingItemSize;
    disabled?: boolean;
    readOnly?: boolean;
    tabIndex?: number | string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onFocus: React.FocusEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    onMouseEnter: React.MouseEventHandler<HTMLInputElement>;
}

export const RatingItem = (props: RatingItemProps) => {
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
    }: RatingItemProps = props;

    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const hiddenFocusRef = useRef(false);

    // Events handlers

    const handleChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>): void => {
        if (onChange && !readOnly) {
            onChange(ev);
        }
    });

    const handleMouseEnter = useEventCallback((ev: React.MouseEvent<HTMLInputElement>): void => {
        if (onMouseEnter && !disabled && !readOnly) {
            onMouseEnter(ev);
        }
    });

    const handleMouseDown = useCallback(
        (ev: React.MouseEvent<HTMLInputElement>): void => {
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
        (ev: React.FocusEvent<HTMLInputElement>): void => {
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
        (ev: React.FocusEvent<HTMLInputElement>): void => {
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

    // Render

    const formatedTabIndex = isString(tabIndex) ? parseInt(tabIndex, 10) : tabIndex;

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
                    tabIndex={formatedTabIndex ? -1 : formatedTabIndex}
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
