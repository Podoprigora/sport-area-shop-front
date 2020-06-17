import React from 'react';

import NumberInput from '@ui/NumberInput';
import FormikField from '../FormikField';

const NumberField = React.forwardRef(function NumberField(props, ref) {
    return <FormikField {...props} ref={ref} component={NumberInput} />;
});

export default NumberField;
