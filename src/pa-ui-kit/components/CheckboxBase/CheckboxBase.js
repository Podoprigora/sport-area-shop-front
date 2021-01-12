import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useControlled from '@ui/hooks/useControlled';
import useEventCallback from '@ui/hooks/useEventCallback';
import useIsFocusVisible from '@ui/hooks/useIsFocusVisible';
import useForkRef from '@ui/hooks/useForkRef';

const CheckboxBase = React.forwardRef(function CheckboxBase(props, ref) {
    const {
        type = 'checkbox',
        icon,
        iconChecked,
        checked: checkedProp,
        defaultChecked,
        value,
        name,
        id,
        autoFocus,
        readOnly,
        disabled,
        tabIndex,
        className,
        inputProps,
        onChange,
        onBlur,
        onFocus
    } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const [checked, setChecked] = useControlled(checkedProp, !!defaultChecked);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const handleRef = useForkRef(focusVisibleRef, ref);

    const doChange = useCallback(
        (ev) => {
            setChecked(ev.target.checked);

            if (onChange) {
                onChange(ev);
            }
        },
        [setChecked, onChange]
    );

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

    const handleChange = useEventCallback((ev) => {
        doChange(ev);
    });

    const iconComponent = React.cloneElement(icon, {
        className: 'checkbox__icon'
    });

    const iconCheckedComponent = React.cloneElement(iconChecked, {
        className: 'checkbox__icon checkbox__icon--checked'
    });

    return (
        <div
            role="presentation"
            className={classNames('checkbox', className, {
                'checkbox--focus-visible': focusVisible,
                'checkbox--disabled': disabled
            })}
        >
            <input
                type={type}
                className="checkbox__input"
                ref={handleRef}
                {...{
                    checked: checkedProp,
                    defaultChecked,
                    value,
                    name,
                    id,
                    autoFocus,
                    readOnly,
                    disabled,
                    tabIndex
                }}
                {...inputProps}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />

            {checked ? iconCheckedComponent : iconComponent}
        </div>
    );
});

CheckboxBase.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.node.isRequired,
    iconChecked: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    value: PropTypes.any,
    name: PropTypes.string,
    id: PropTypes.string,
    autoFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    inputProps: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default CheckboxBase;
