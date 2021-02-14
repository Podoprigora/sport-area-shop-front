import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { useMergedRefs, useIsFocusVisible, useEventCallback } from '../utils';
import { FlexRowAlignItems } from '../FlexRow';
import { ListItemContext } from './ListItemContext';

export interface ListItemProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains `ListItemText`, `ListItemIcon`, `ListItemAction`
     */
    children?: React.ReactNode;
    button?: boolean;
    autoFocus?: boolean;
    selected?: boolean;
    disabled?: boolean;
    highlighted?: boolean;
    alignItems?: FlexRowAlignItems;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
    props,
    forwardedRef
) {
    const {
        button,
        autoFocus,
        selected,
        disabled,
        highlighted,
        children,
        className,
        alignItems,
        onClick,
        onFocus,
        onBlur,
        onMouseDown,
        onKeyDown,
        ...other
    } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, focusVisibleRef } = useIsFocusVisible<HTMLDivElement>();

    const elementRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergedRefs(elementRef, focusVisibleRef, forwardedRef);

    const handleFocus = useEventCallback((ev: React.FocusEvent<HTMLDivElement>) => {
        if (isFocusVisible(ev)) {
            setFocusVisible(true);
        }

        if (onFocus) {
            onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev: React.FocusEvent<HTMLDivElement>) => {
        if (focusVisible) {
            onBlurVisible();
            setFocusVisible(false);
        }

        if (onBlur) {
            onBlur(ev);
        }
    });

    const handleClick = useCallback(
        (ev: React.MouseEvent<HTMLDivElement>) => {
            if (onClick && !disabled) {
                onClick(ev);
            }
        },
        [onClick, disabled]
    );

    // TODO: Remove handleClick callback when Enter key's pressed and come up with better approach
    const handleKeyDown = useCallback(
        (ev: React.KeyboardEvent<HTMLDivElement>) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();

                handleClick(
                    ev as React.KeyboardEvent<HTMLDivElement> & React.MouseEvent<HTMLDivElement>
                );
            }

            if (onKeyDown) {
                onKeyDown(ev);
            }
        },
        [handleClick, onKeyDown]
    );

    useEffect(() => {
        if (autoFocus && button && !disabled && elementRef.current) {
            elementRef.current.focus({ preventScroll: false });
        }
    }, [autoFocus, button, disabled]);

    const componentProps = {
        role: button ? 'button' : 'listitem',
        tabIndex: button && !disabled ? 0 : undefined,
        'aria-disabled': disabled,
        className: classNames('list__item', className, {
            'list__item--button': button,
            'list__item--selected': selected,
            'list__item--highlighted': highlighted,
            'list__item--disabled': disabled,
            'list__item--focus-visible': focusVisible,
            // TODO: Try to make use of FlexRow instead
            [`u-flex-align-items-${alignItems}`]: alignItems
        }),
        ...other,
        onClick: handleClick,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown
    };

    const context = useMemo(() => ({ disabled }), [disabled]);

    return (
        <ListItemContext.Provider value={context}>
            <div {...componentProps} ref={handleRef}>
                {children}
            </div>
        </ListItemContext.Provider>
    );
});

export default ListItem;
