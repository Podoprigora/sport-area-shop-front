import React from 'react';
import { Assign } from 'utility-types';

import { NumberInput, NumberInputProps } from '../../NumberInput';
import { FormikField, FormikFieldProps } from '../FormikField';

export type NumberFieldProps = Assign<NumberInputProps, FormikFieldProps>;

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
    function NumberField(props, ref) {
        return <FormikField {...props} ref={ref} inputComponent={NumberInput} />;
    }
);
