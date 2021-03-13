import React from 'react';
import { Optional } from 'utility-types';

import { useRadioGroup } from '../RadioGroup';
import { CheckboxBase, CheckboxBaseProps } from '../CheckboxBase';
import { RadioButtonBlankIcon, RadioButtonCheckedIcon } from '../svg-icons/material';
import { useEventCallback } from '../utils';

type CheckboxBaseOptionalProps = Optional<CheckboxBaseProps, 'icon' | 'iconChecked'>;

export type RadioProps = Omit<CheckboxBaseOptionalProps, 'type'>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
    props,
    forwardedRef
) {
    const {
        checked: checkedProp,
        name: nameProp,
        value,
        readOnly: readOnlyProp,
        required: requiredProp,
        disabled: disabledProp,
        onChange,
        onFocus,
        onBlur,
        ...other
    } = props;

    const radioGroup = useRadioGroup();

    let checked = checkedProp;
    let name = nameProp;
    let required = requiredProp;
    let disabled = disabledProp;
    let readOnly = readOnlyProp;

    // Handlers

    const handleChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(ev);
        }

        if (radioGroup) {
            radioGroup.onChange(ev);
        }
    });

    const handleFocus = useEventCallback((ev: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) {
            onFocus(ev);
        }

        if (radioGroup) {
            radioGroup.onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(ev);
        }

        if (radioGroup) {
            radioGroup.onBlur(ev);
        }
    });

    // Render

    if (radioGroup) {
        if (typeof checked === 'undefined') {
            checked = radioGroup.value === value;
        }

        if (typeof nameProp === 'undefined') {
            name = radioGroup.name;
        }

        if (typeof disabledProp === 'undefined') {
            disabled = radioGroup.disabled;
        }

        if (typeof requiredProp === 'undefined') {
            required = radioGroup.required;
        }

        if (typeof readOnlyProp === 'undefined') {
            readOnly = radioGroup.readOnly;
        }
    }

    return (
        <CheckboxBase
            {...other}
            type="radio"
            checked={checked}
            name={name}
            value={value}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            icon={<RadioButtonBlankIcon />}
            iconChecked={<RadioButtonCheckedIcon />}
            ref={forwardedRef}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
});
