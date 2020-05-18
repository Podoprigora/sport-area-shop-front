import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useIsFocusVisible from '@components/hooks/useIsFocusVisible';
import useForkRef from '@components/hooks/useForkRef';
import useEventCallback from '@components/hooks/useEventCallback';

const IconButton = React.forwardRef(function IconButton(props, ref) {
    const { children, disabled, className, primary, size, onFocus, onBlur, ...other } = props;

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

    const iconEl = React.cloneElement(children, {
        size: children.props.size || size
    });

    return (
        <button
            type="button"
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
            {iconEl}
        </button>
    );
});

IconButton.propTypes = {
    children: PropTypes.element.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    primary: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default IconButton;
