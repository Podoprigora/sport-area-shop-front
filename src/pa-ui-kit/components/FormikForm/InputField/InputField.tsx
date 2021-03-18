import React from 'react';
import { Assign } from 'utility-types';

import { Input, InputProps } from '../../Input';
import { FormikField, FormikFieldProps } from '../FormikField';

export type InputFieldProps = Assign<InputProps, FormikFieldProps>;

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
    props,
    forwardedRef
) {
    return <FormikField {...props} inputComponent={Input} ref={forwardedRef} />;
});
