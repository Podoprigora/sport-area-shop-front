import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import CheckboxBase from '@ui/CheckboxBase';
import { useRadioGroup } from '@ui/RadioGroup/RadioGroupContext';
import RadioButtonBlankIcon from '@ui/svg-icons/material/RadioButtonBlankIcon';
import RadioButtonCheckedIcon from '@ui/svg-icons/material/RadioButtonCheckedIcon';
import useEventCallback from '@ui/hooks/useEventCallback';

const Radio = React.forwardRef(function Radio(props, ref) {
    const {
        checked: checkedProp,
        name: nameProp,
        value,
        onChange,
        onFocus,
        onBlur,
        ...other
    } = props;

    const radioGroup = useRadioGroup();

    let checked = checkedProp;
    let name = nameProp;

    const handleChange = useEventCallback((ev) => {
        if (onChange) {
            onChange(ev);
        }

        if (radioGroup) {
            radioGroup.onChange(ev);
        }
    });

    const handleFocus = useEventCallback((ev) => {
        if (onFocus) {
            onFocus(ev);
        }

        if (radioGroup) {
            radioGroup.onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev) => {
        if (onBlur) {
            onBlur(ev);
        }

        if (radioGroup) {
            radioGroup.onBlur(ev);
        }
    });

    if (radioGroup) {
        if (typeof checked === 'undefined') {
            checked = radioGroup.value === value;
        }

        if (typeof nameProp === 'undefined') {
            name = radioGroup.name;
        }
    }

    return (
        <CheckboxBase
            type="radio"
            checked={checked}
            name={name}
            value={value}
            icon={<RadioButtonBlankIcon />}
            iconChecked={<RadioButtonCheckedIcon />}
            ref={ref}
            {...other}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
});

Radio.propTypes = {
    checked: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default Radio;
