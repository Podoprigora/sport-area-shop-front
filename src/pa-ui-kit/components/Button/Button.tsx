import React, { useState } from 'react';
import classNames from 'classnames';

import { useForkRef } from '../hooks/useForkRef';
import { useEventCallback } from '../hooks/useEventCallback';
import { useIsFocusVisible } from '../hooks/useIsFocusVisible';
import KeyboardArrowDownIcon from '../svg-icons/material/KeyboardArrowDown';

type Align = 'left' | 'top' | 'bottom' | 'right';
type Size = 'small' | 'medium' | 'large';
type IconSize = Size | 'xlarge';

type ClassNames = {
    [key: string]: string;
};

type Style = {
    [key: string]: string | number;
};

export interface ButtonProps {
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
    maxWidth?: number;
    autoFocus?: boolean;
    arrow?: boolean;
    arrowSize?: Size;
    slim?: boolean;
    truncate?: boolean;
    style?: Style;
    onFocus?: (ev: React.SyntheticEvent) => void;
    onBlur?: (ev: React.SyntheticEvent) => void;
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

const Button = React.forwardRef(function Button(
    props: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
) {
    const {
        children,
        size = 'medium',
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
    } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const handleRef = useForkRef<HTMLButtonElement>(focusVisibleRef, ref);

    const handleFocus = useEventCallback((ev: React.FocusEvent<HTMLElement>): void => {
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

    const sizeClassnames = {
        small: 'btn--small',
        medium: 'btn--medium',
        large: 'btn--large'
    } as ClassNames;

    const iconAlignClassnames = {
        left: 'btn--icon-align-left',
        top: 'btn--icon-align-top',
        bottom: 'btn--icon-align-bottom',
        right: 'btn--icon-align-right'
    } as ClassNames;

    const componentStyle = {
        ...(maxWidth && { width: '100%', maxWidth }),
        ...style
    };

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
            type="button"
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
            {loadingComponentElement && loadingComponentElement}
            {children && <span className="btn__text">{children}</span>}
            {arrow && <KeyboardArrowDownIcon className="btn__arrow" size={arrowSize} />}
        </button>
    );
});

export { Button };
