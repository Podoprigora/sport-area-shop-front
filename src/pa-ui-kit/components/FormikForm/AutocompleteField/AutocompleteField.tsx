import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Assign } from 'utility-types';

import { useEventCallback } from '../../utils';
import { Autocomplete, AutocompleteProps, DataItem } from '../../Autocomplete';
import { FieldControl, FieldControlProps } from '../../FieldControl';

export type AutocompleteFieldProps<T extends DataItem> = Assign<
    AutocompleteProps<T>,
    Omit<FieldControlProps, 'ref'>
> & {
    name: string;
    inputName?: string;
};

function AutocompleteFieldWithRef<T extends DataItem>(
    props: AutocompleteFieldProps<T>,
    forwardedRef: React.Ref<HTMLDivElement>
) {
    const { name, inputName, onChange, onInputChange, ...other } = props;
    const { setFieldValue, getFieldMeta } = useFormikContext();
    const [field, meta, helpers] = useField<typeof props.value>(props);
    const { error, touched } = meta;

    let inputValue: typeof props.inputValue;

    if (inputName) {
        const inputFieldMeta = getFieldMeta<typeof inputValue>(inputName);

        inputValue = inputFieldMeta.value;
    }

    const handleInputChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        if (inputName) {
            setFieldValue(inputName, ev.target.value);
        }

        if (onInputChange) {
            onInputChange(ev);
        }
    });

    const handleChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(ev.target.value);

        if (onChange) {
            onChange(ev);
        }
    });

    const fieldProps = {
        ...field,
        ...other,
        error,
        touched,
        inputValue,
        onChange: handleChange,
        onInputChange: handleInputChange
    };

    return <FieldControl {...fieldProps} ref={forwardedRef} inputComponent={Autocomplete} />;
}

export const AutocompleteField = React.forwardRef(AutocompleteFieldWithRef) as <T extends DataItem>(
    props: AutocompleteFieldProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => JSX.Element;
