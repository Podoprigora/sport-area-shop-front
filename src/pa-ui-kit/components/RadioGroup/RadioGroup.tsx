import React, { useCallback, useMemo } from 'react';
import { Assign } from 'utility-types';
import classNames from 'classnames';

import { createCtx, useControlled } from '../utils';
import { FieldGroup, FieldGroupProps } from '../FieldGroup';

type ExtendedProps = Assign<FieldGroupProps, React.ComponentPropsWithRef<'input'>>;

export interface RadioGroupProps extends ExtendedProps {
    name?: string;
    children?: React.ReactNode;
}

type RadioGroupContextValue = Required<Pick<RadioGroupProps, 'onChange' | 'onFocus' | 'onBlur'>> &
    Pick<RadioGroupProps, 'value' | 'name' | 'disabled' | 'required' | 'readOnly'>;

const RadioGroupContext = createCtx<RadioGroupContextValue>();

export const useRadioGroup = RadioGroupContext.useContext;

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
    props,
    forwardedRef
) {
    const {
        children,
        name,
        value: valueProp,
        defaultValue,
        disabled,
        readOnly,
        required,
        className,
        onChange,
        onFocus,
        onBlur,
        ...other
    }: RadioGroupProps = props;

    const [value, setValue] = useControlled(valueProp, defaultValue);

    // Handlers

    const handleChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setValue(ev.target.value);

            if (onChange) {
                onChange(ev);
            }
        },
        [onChange, setValue]
    );

    const handleFocus = useCallback(
        (ev: React.FocusEvent<HTMLInputElement>) => {
            if (onFocus) {
                onFocus(ev);
            }
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (ev: React.FocusEvent<HTMLInputElement>) => {
            if (onBlur) {
                onBlur(ev);
            }
        },
        [onBlur]
    );

    // Render

    const context = useMemo(
        () => ({
            value,
            name,
            readOnly,
            required,
            disabled,
            onChange: handleChange,
            onBlur: handleBlur,
            onFocus: handleFocus
        }),
        [value, name, disabled, readOnly, required, handleBlur, handleFocus, handleChange]
    );

    const items = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { key: index, disabled });
        }

        return undefined;
    });

    return (
        <RadioGroupContext.Provider value={context}>
            <FieldGroup
                className={classNames('radio-group', className)}
                {...other}
                ref={forwardedRef}
            >
                {items}
            </FieldGroup>
        </RadioGroupContext.Provider>
    );
});
