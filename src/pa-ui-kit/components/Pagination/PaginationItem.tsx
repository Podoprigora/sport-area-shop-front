import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

import { useIsFocusVisible, useMergedRefs } from '../utils';

export type PaginationItemType = 'item' | 'control';

export interface PaginationItemProps {
    children: React.ReactNode;
    type?: PaginationItemType;
    selected?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> &
        React.TouchEventHandler<HTMLButtonElement>;
}

export const PaginationItem = (props: PaginationItemProps) => {
    const { type = 'item', children, selected, disabled, onClick } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, focusVisibleRef } = useIsFocusVisible();
    const nodeRef = useRef<HTMLButtonElement | null>(null);
    const handleRef = useMergedRefs<HTMLButtonElement>(nodeRef, focusVisibleRef);

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(ev);
        }
    };

    const handleTouchEnd = (ev: React.TouchEvent<HTMLButtonElement>) => {
        ev.preventDefault();

        if (onClick) {
            onClick(ev);
        }
    };

    const handleFocus = (ev: React.FocusEvent<HTMLButtonElement>) => {
        if (isFocusVisible(ev)) {
            setFocusVisible(true);
        }
    };

    const handleBlur = () => {
        if (focusVisible) {
            onBlurVisible();
            setFocusVisible(false);
        }
    };

    useEffect(() => {
        if (disabled) {
            setFocusVisible(false);
        }
    }, [disabled]);

    return (
        <button
            type="button"
            className={classNames('pagination__item', {
                'pagination__item--control': type === 'control',
                'pagination__item--selected': selected,
                'pagination__item--disabled': disabled,
                'pagination__item--focus-visible': focusVisible
            })}
            disabled={disabled}
            tabIndex={disabled ? undefined : 0}
            ref={handleRef}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
        </button>
    );
};
