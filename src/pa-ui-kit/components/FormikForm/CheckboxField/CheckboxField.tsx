import React from 'react';
import { Assign } from 'utility-types';

import { Checkbox, CheckboxProps } from '../../Checkbox';
import { FormikField, FormikFieldProps } from '../FormikField';

export type CheckboxFieldProps = Assign<CheckboxProps, FormikFieldProps>;

export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
    function CheckboxField(props, ref) {
        return <FormikField {...props} type="checkbox" component={Checkbox} ref={ref} />;
    }
);
