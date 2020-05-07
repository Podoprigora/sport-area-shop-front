import React from 'react';

import Input from '@components/Input';
import FormikField from '../FormikField';

const InputField = React.forwardRef(function InputField(props, ref) {
    return <FormikField {...props} ref={ref} component={Input} />;
});

export default InputField;
