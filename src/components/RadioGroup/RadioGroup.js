import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import useControlled from '@components/hooks/useControlled';
import FieldGroup from '@components/FieldGroup';
import { RadioGroupContext } from './RadioGroupContext';

const RadioGroup = React.forwardRef(function RadioGroup(props, ref) {
    const {
        children,
        name,
        value: valueProp,
        defaultValue,
        onChange,
        onFocus,
        onBlur,
        ...other
    } = props;

    const [value, setValue] = useControlled(valueProp, defaultValue);

    const handleChange = useCallback(
        (ev) => {
            setValue(ev.target.value);

            if (onChange) {
                onChange(ev);
            }
        },
        [onChange, setValue]
    );

    const handleFocus = useCallback(
        (ev) => {
            if (onFocus) {
                onFocus(ev);
            }
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (ev) => {
            if (onBlur) {
                onBlur(ev);
            }
        },
        [onBlur]
    );

    const context = useMemo(
        () => ({
            value,
            name,
            onChange: handleChange,
            onBlur: handleBlur,
            onFocus: handleFocus
        }),
        [value, name, handleBlur, handleFocus, handleChange]
    );

    return (
        <RadioGroupContext.Provider value={context}>
            <FieldGroup ref={ref} {...other}>
                {children}
            </FieldGroup>
        </RadioGroupContext.Provider>
    );
});

RadioGroup.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default RadioGroup;
