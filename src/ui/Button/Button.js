import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useForkRef from '@ui/hooks/useForkRef';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';
import useEventCallback from '@ui/hooks/useEventCallback';
import useIsFocusVisible from '@ui/hooks/useIsFocusVisible';

const Button = React.forwardRef(function Button(props, ref) {
    const {
        children,
        size = 'medium',
        primary,
        icon: Icon,
        iconAlign = 'left',
        iconSize = null,
        className,
        centered,
        disabled,
        plain,
        autoWidth,
        maxWidth,
        arrow,
        arrowSize = 'medium',
        style,
        onFocus,
        onBlur,
        ...other
    } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const handleRef = useForkRef(focusVisibleRef, ref);

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
            onBlurVisible(ev);
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
    };

    const iconAlignClassnames = {
        left: 'btn--icon-align-left',
        top: 'btn--icon-align-top',
        bottom: 'btn--icon-align-bottom',
        right: 'btn--icon-align-right'
    };

    const componentStyle = {
        ...(maxWidth && { width: '100%', maxWidth }),
        ...style
    };

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
                    'btn--centered': centered,
                    'btn--focus-visible': focusVisible,
                    'btn--disabled': disabled,
                    'btn--empty-text': !children,
                    'btn--auto-width': autoWidth
                }
            )}
            style={componentStyle}
            disabled={disabled}
            ref={handleRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...other}
        >
            {!!Icon && <Icon className="btn__icon" size={iconSize || size} />}
            {children && <span className="btn__text">{children}</span>}
            {arrow && <KeyboardArrowDownIcon className="btn__arrow" size={arrowSize} />}
        </button>
    );
});

Button.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.elementType,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    iconSize: PropTypes.oneOf(['small', 'medium', 'large', null]),
    iconAlign: PropTypes.oneOf(['left', 'top', 'bottom', 'right']),
    primary: PropTypes.bool,
    centered: PropTypes.bool,
    disabled: PropTypes.bool,
    plain: PropTypes.bool,
    autoWidth: PropTypes.bool,
    maxWidth: PropTypes.number,
    autoFocus: PropTypes.bool,
    arrow: PropTypes.bool,
    arrowSize: PropTypes.oneOf(['small', 'medium', 'large', null]),
    style: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default Button;
