import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventCallback from '@ui/hooks/useEventCallback';
import useForkRef from '@ui/hooks/useForkRef';
import useIsFocusVisible from '@ui/hooks/useIsFocusVisible';

const Link = React.forwardRef(function Link(props, ref) {
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

    const iconElement =
        icon &&
        React.createElement(icon, {
            size,
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

Link.propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    icon: PropTypes.elementType,
    iconAlign: PropTypes.oneOf(['left', 'right']),
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default Link;
