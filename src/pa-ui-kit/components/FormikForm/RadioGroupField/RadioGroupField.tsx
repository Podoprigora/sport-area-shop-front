import React from 'react';
import { Assign } from 'utility-types';

import { RadioGroup, RadioGroupProps } from '../../RadioGroup';
import { FormikField, FormikFieldProps } from '../FormikField';

export type RadioGroupFieldProps = Assign<RadioGroupProps, FormikFieldProps>;

export const RadioGroupField = React.forwardRef<HTMLDivElement, RadioGroupFieldProps>(
    function RadioGroupField(props, ref) {
        return <FormikField {...props} ref={ref} component={RadioGroup} />;
    }
);
