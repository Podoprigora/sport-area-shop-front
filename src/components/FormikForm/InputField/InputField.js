import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import FieldControl from '@components/FieldControl';
import Input from '@components/Input';

const InputField = React.forwardRef(function InputField(props, ref) {
    const [field, meta, helpers] = useField(props);
    const { error, touched } = meta;

    const fieldProps = {
        ...props,
        ...field,
        ...helpers,
        error,
        touched
    };

    return <FieldControl {...fieldProps} ref={ref} component={Input} />;
});

InputField.propTypes = {
    name: PropTypes.string.isRequired
};

export default InputField;
