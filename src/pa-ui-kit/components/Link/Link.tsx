import React, { useState } from 'react';
import classNames from 'classnames';

import { useEventCallback, useMergedRefs, useIsFocusVisible } from '../utils';
import { SvgIconProps } from '../withSvgIconAttributes';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
    children?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    icon?: React.ReactElement<SvgIconProps>;
    iconAlign?: 'left' | 'right';
    primary?: boolean;
    disabled?: boolean;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
    onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, forwardedRef) {
    const {
        children,
        icon,
        iconAlign = 'left',
        size = 'medium',
        primary,
        disabled,
        className,
        onFocus,
        onBlur,
        ...other
    }: LinkProps = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const handleRef = useMergedRefs<HTMLAnchorElement>(focusVisibleRef, forwardedRef);

    const handleFocus = useEventCallback((ev) => {
        if (isFocusVisible(ev)) {
            setFocusVisible(true);
        }

        if (onFocus) {
            onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev) => {
        if (focusVisible) {
            onBlurVisible();
            setFocusVisible(false);
        }

        if (onBlur) {
            onBlur(ev);
        }
    });

    const iconElement =
        React.isValidElement(icon) &&
        React.cloneElement(icon, {
            size: icon.props.size || size,
            className: classNames('link__icon', {
                [`link__icon--${iconAlign}`]: iconAlign
            })
        });

    return (
        <a
            {...other}
            className={classNames('link', className, {
                [`link--${size}`]: size,
                'link--primary': primary,
                'link--disabled': disabled,
                'link--focus-visible': focusVisible
            })}
            ref={handleRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {icon && iconAlign === 'left' && iconElement}
            {children}
            {icon && iconAlign === 'right' && iconElement}
        </a>
    );
});

export { Link };
