import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import { useIsFocusVisible, useMergedRefs } from '../utils';

export interface CellListItemProps extends React.ComponentPropsWithRef<'button'> {
    selected?: boolean;
    painted?: boolean;
}

export const CellListItem = React.forwardRef<HTMLButtonElement, CellListItemProps>(
    function CellListItem(props, forwardedRef) {
        const {
            children,
            className,
            selected,
            painted,
            disabled,
            onFocus,
            onBlur,
            ...other
        } = props;

        const [focusVisible, setFocusVisible] = useState(false);
        const { isFocusVisible, onBlurVisible, focusVisibleRef } = useIsFocusVisible();
        const handleRef = useMergedRefs<HTMLButtonElement>(forwardedRef, focusVisibleRef);

        const handleFocus = useCallback(
            (ev: React.FocusEvent<HTMLButtonElement>) => {
                if (isFocusVisible(ev)) {
                    setFocusVisible(true);
                }

                if (onFocus) {
                    onFocus(ev);
                }
            },
            [isFocusVisible, onFocus]
        );

        const handleBlur = useCallback(
            (ev: React.FocusEvent<HTMLButtonElement>) => {
                if (focusVisible) {
                    onBlurVisible();
                    setFocusVisible(false);
                }

                if (onBlur) {
                    onBlur(ev);
                }
            },
            [focusVisible, onBlur, onBlurVisible]
        );

        return (
            <button
                {...other}
                type="button"
                className={classNames('cell-list__item', className, {
                    'cell-list__item--focus-visible': focusVisible,
                    'cell-list__item--selected': selected,
                    'cell-list__item--painted': painted,
                    'cell-list__item--disabled': disabled
                })}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={handleRef}
            >
                {children}
            </button>
        );
    }
);
