import React, { useCallback, useRef } from 'react';
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

    const handleChange = (ev) => {
        setValue(ev.target.value);

        if (onChange) {
            onChange(ev);
        }
    };

    const handleFocus = (ev) => {
        if (onFocus) {
            onFocus(ev);
        }
    };

    const handleBlur = (ev) => {
        if (onBlur) {
            onBlur(ev);
        }
    };

    return (
        <RadioGroupContext.Provider
            value={{
                value,
                name,
                onChange: handleChange,
                onBlur: handleBlur,
                onFocus: handleFocus
            }}
        >
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
