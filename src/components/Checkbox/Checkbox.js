import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useControlled from '@components/hooks/useControlled';
import CheckBoxIcon from '@svg-icons/material/CheckBoxIcon';
import CheckBoxOutlineBlankIcon from '@svg-icons/material/CheckBoxOutlineBlankIcon';
import useEventCallback from '@components/hooks/useEventCallback';

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const {
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

            {checked ? (
                <CheckBoxIcon className="checkbox__icon checkbox__icon--checked" />
            ) : (
                <CheckBoxOutlineBlankIcon className="checkbox__icon" />
            )}
        </div>
    );
});

Checkbox.propTypes = {
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

export default Checkbox;
