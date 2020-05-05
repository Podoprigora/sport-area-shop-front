import React from 'react';
import { useField } from 'formik';

import FieldControl from '@components/FieldControl';
import Input from '@components/Input';

const InputField = React.forwardRef(function InputField(props, ref) {
    const [field, meta] = useField(props);
    const { error, touched } = meta;

    const fieldProps = {
        ...props,
        ...field,
        error,
        touched
    };

    return <FieldControl {...fieldProps} ref={ref} component={Input} />;
});

export default InputField;
