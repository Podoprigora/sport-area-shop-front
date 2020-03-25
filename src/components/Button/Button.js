import React, { useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useForkRef from '@components/hooks/useForkRef';

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
        autoFocus,
        ...other
    } = props;

    const buttonRef = useRef(null);
    const handleRef = useForkRef(buttonRef, ref);

    useEffect(() => {
        if (autoFocus) {
            buttonRef.current.focus();
        }
    }, [autoFocus]);

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
                    'btn--disabled': disabled,
                    'btn--empty-text': !children,
                    'btn--auto-width': autoWidth
                }
            )}
            disabled={disabled}
            ref={handleRef}
            {...other}
        >
            {!!Icon && <Icon className="btn__icon" size={iconSize || size} />}
            {children && <span className="btn__text">{children}</span>}
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
    autoFocus: PropTypes.bool
};

export default Button;
