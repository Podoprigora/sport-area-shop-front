import React, { useState } from 'react';
import classNames from 'classnames';

import { useIsFocusVisible, useEventCallback, useMergedRefs } from '../utils';
import { SvgIconSize } from '../withSvgIconAttributes';
import { KeyboardArrowDownIcon } from '../svg-icons/material';

type Align = 'left' | 'top' | 'bottom' | 'right';
type Size = 'small' | 'medium' | 'large';
type IconSize = SvgIconSize;

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    children?: React.ReactNode;
    size?: Size;
    primary?: boolean;
    icon?: React.ReactNode;
    loadingComponent?: React.ReactNode;
    loading?: boolean;
    iconAlign?: Align;
    iconSize?: IconSize;
    className?: string;
    centered?: boolean;
    disabled?: boolean;
    link?: boolean;
    plain?: boolean;
    transparent?: boolean;
    autoWidth?: boolean;
    maxWidth?: number | string;
    autoFocus?: boolean;
    arrow?: boolean;
    arrowSize?: Size;
    slim?: boolean;
    truncate?: boolean;
    style?: React.CSSProperties;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

type IconProps = {
    className?: string;
    size?: IconSize;
};

function createIconElement(element: React.ReactNode, props: IconProps): React.ReactNode {
    if (!element) {
        return null;
    }

    if (React.isValidElement(element)) {
        return React.cloneElement(element, {
            ...props,
            ...(element.props?.size && { size: element.props?.size })
        });
    }

    return React.createElement(element as React.ElementType, props);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    props,
    forwardedRef
) {
    const {
        children,
        size = 'medium',
        type = 'button',
        primary,
        icon,
        loadingComponent,
        loading = false,
        iconAlign = 'left',
        iconSize,
        className,
        centered,
        disabled,
        link,
        plain,
        transparent,
        autoWidth,
        maxWidth,
        arrow,
        slim,
        truncate,
        arrowSize = 'medium',
        style,
        onFocus,
        onBlur,
        ...other
    }: ButtonProps = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
    const handleRef = useMergedRefs<HTMLButtonElement>(focusVisibleRef, forwardedRef);

    const handleFocus = useEventCallback((ev: React.FocusEvent<HTMLButtonElement>): void => {
        if (isFocusVisible(ev)) {
            setFocusVisible(true);
        }

        if (onFocus) {
            onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev: React.FocusEvent<HTMLButtonElement>): void => {
        if (focusVisible) {
            onBlurVisible();
            setFocusVisible(false);
        }

        if (onBlur) {
            onBlur(ev);
        }
    });

    const sizeClassnames = {
        small: 'btn--small',
        medium: 'btn--medium',
        large: 'btn--large'
    } as const;

    const iconAlignClassnames = {
        left: 'btn--icon-align-left',
        top: 'btn--icon-align-top',
        bottom: 'btn--icon-align-bottom',
        right: 'btn--icon-align-right'
    } as const;

    const componentStyle = {
        ...(maxWidth && { width: '100%', maxWidth }),
        ...style
    } as const;

    const iconElement =
        !loading &&
        createIconElement(icon, {
            className: 'btn__icon',
            size: iconSize || size
        });

    const loadingComponentElement =
        loading &&
        loadingComponent &&
        React.isValidElement(loadingComponent) &&
        React.cloneElement(loadingComponent, {
            className: classNames('btn__icon btn__progress', loadingComponent.props?.className),
            size: loadingComponent.props.size || size
        });

    return (
        <button
            type={type}
            className={classNames(
                'btn',
                sizeClassnames[size],
                iconAlignClassnames[iconAlign],
                className,
                {
                    'btn--primary': primary,
                    'btn--plain': plain,
                    'btn--link': link,
                    'btn--transparent': transparent,
                    'btn--centered': centered,
                    'btn--focus-visible': focusVisible,
                    'btn--disabled': disabled,
                    'btn--loading': loading,
                    'btn--empty-text': !children,
                    'btn--auto-width': autoWidth,
                    'btn--slim': slim,
                    'btn--truncate': truncate
                }
            )}
            style={componentStyle}
            disabled={disabled || loading}
            ref={handleRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...other}
        >
            {iconElement}
            {loadingComponentElement}
            {children && <span className="btn__text">{children}</span>}
            {arrow && <KeyboardArrowDownIcon className="btn__arrow" size={arrowSize} />}
        </button>
    );
});
