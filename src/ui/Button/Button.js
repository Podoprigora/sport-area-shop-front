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
        loadingComponent,
        loading = false,
        iconAlign = 'left',
        iconSize = null,
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

    const loadingComponentElement =
        loading &&
        loadingComponent &&
        React.cloneElement(loadingComponent, {
            className: classNames('btn__icon', loadingComponent.props.className),
            size: loadingComponent.props.size || 'small'
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
            {!!Icon && !loading && <Icon className="btn__icon" size={iconSize || size} />}
            {loadingComponentElement && loadingComponentElement}
            {children && <span className="btn__text">{children}</span>}
            {arrow && <KeyboardArrowDownIcon className="btn__arrow" size={arrowSize} />}
        </button>
    );
});

Button.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.elementType,
    loadingComponent: PropTypes.node,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    iconSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', null]),
    iconAlign: PropTypes.oneOf(['left', 'top', 'bottom', 'right']),
    primary: PropTypes.bool,
    centered: PropTypes.bool,
    disabled: PropTypes.bool,
    plain: PropTypes.bool,
    loading: PropTypes.bool,
    transparent: PropTypes.bool,
    autoWidth: PropTypes.bool,
    maxWidth: PropTypes.number,
    autoFocus: PropTypes.bool,
    arrow: PropTypes.bool,
    slim: PropTypes.bool,
    truncate: PropTypes.bool,
    link: PropTypes.bool,
    arrowSize: PropTypes.oneOf(['small', 'medium', 'large', null]),
    style: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default Button;
