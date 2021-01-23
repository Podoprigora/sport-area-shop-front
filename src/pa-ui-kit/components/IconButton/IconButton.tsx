import React, { useState } from 'react';
import classNames from 'classnames';

import { useIsFocusVisible, useMergedRefs, useEventCallback } from '../utils';
import { SvgIconProps } from '../withSvgIconAttributes';

export interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
    children: React.ReactElement<SvgIconProps>;
    size?: 'small' | 'medium' | 'large';
    primary?: boolean;
    className?: string;
    disabled?: boolean;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    props,
    forwardedRef
) {
    const {
        type = 'button',
        children,
        disabled,
        className,
        primary,
        size,
        onFocus,
        onBlur,
        ...other
    }: IconButtonProps = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const handleRef = useMergedRefs<HTMLButtonElement>(focusVisibleRef, forwardedRef);

    const handleFocus = useEventCallback((ev: React.FocusEvent<HTMLButtonElement>) => {
        if (isFocusVisible(ev)) {
            setFocusVisible(true);
        }

        if (onFocus) {
            onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev: React.FocusEvent<HTMLButtonElement>) => {
        if (focusVisible) {
            onBlurVisible();
            setFocusVisible(false);
        }

        if (onBlur) {
            onBlur(ev);
        }
    });

    const iconElement = React.isValidElement(children)
        ? React.cloneElement(children, {
              size: children.props.size || size
          })
        : null;

    return (
        <button
            type={type}
            className={classNames('btn-icon', className, {
                'btn-icon--primary': primary,
                'btn-icon--focus-visible': focusVisible,
                'btn-icon--disabled': disabled,
                [`btn-icon--${size}`]: size
            })}
            disabled={disabled}
            ref={handleRef}
            {...other}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {iconElement}
        </button>
    );
});

export { IconButton };
