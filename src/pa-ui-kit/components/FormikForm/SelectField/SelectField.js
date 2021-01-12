import React from 'react';

import SelectInput from '@ui/SelectInput';
import FormikField from '../FormikField';

const SelectField = React.forwardRef(function SelectField(props, ref) {
    return <FormikField {...props} ref={ref} component={SelectInput} />;
});

export default SelectField;
