import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useControlled from '@components/hooks/useControlled';
import useEventCallback from '@components/hooks/useEventCallback';

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

    const [checked, setChecked] = useControlled(checkedProp, !!defaultChecked);
    const [focused, setFocused] = useState(false);

    const doChange = useCallback(
        (ev) => {
            setChecked(ev.target.checked);

            if (onChange) {
                onChange(ev);
            }
        },
        [setChecked, onChange]
    );

    const handleFocus = useCallback(
        (ev) => {
            setFocused(true);

            if (onFocus) {
                onFocus(ev);
            }
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (ev) => {
            setFocused(false);

            if (onBlur) {
                onBlur(ev);
            }
        },
        [onBlur]
    );

    const handleChange = useEventCallback((ev) => {
        doChange(ev);
    });

    const handleContainerMouseDown = useCallback((ev) => {
        setFocused(false);
    }, []);

    const iconComponent = React.createElement(icon, {
        className: 'checkbox__icon'
    });

    const iconCheckedComponent = React.createElement(iconChecked, {
        className: 'checkbox__icon checkbox__icon--checked'
    });

    return (
        <div
            role="presentation"
            className={classNames('checkbox', className, {
                'checkbox--focused': focused,
                'checkbox--disabled': disabled
            })}
            onMouseDown={handleContainerMouseDown}
        >
            <input
                type="checkbox"
                className="checkbox__input"
                ref={ref}
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
    icon: PropTypes.elementType.isRequired,
    iconChecked: PropTypes.elementType.isRequired,
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
