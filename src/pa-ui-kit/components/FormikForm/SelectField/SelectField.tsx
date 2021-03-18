import React from 'react';
import { Assign } from 'utility-types';

import { SelectInput, SelectInputProps, DataItem } from '../../SelectInput';
import { FormikField, FormikFieldProps } from '../FormikField';

export type SelectFieldProps<T extends DataItem> = Assign<SelectInputProps<T>, FormikFieldProps>;

function SelectFieldWithRef<T extends DataItem>(
    props: SelectFieldProps<T>,
    ref: React.Ref<HTMLInputElement>
) {
    return <FormikField {...props} ref={ref} inputComponent={SelectInput} />;
}

export const SelectField = React.forwardRef(SelectFieldWithRef) as <T extends DataItem>(
    props: SelectFieldProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => JSX.Element;
