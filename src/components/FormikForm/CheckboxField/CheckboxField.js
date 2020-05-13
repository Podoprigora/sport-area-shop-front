import React from 'react';

import Checkbox from '@components/Checkbox';
import FormikField from '../FormikField';

const CheckboxField = React.forwardRef(function CheckboxField(props, ref) {
    return <FormikField type="checkbox" {...props} ref={ref} component={Checkbox} />;
});

export default CheckboxField;
