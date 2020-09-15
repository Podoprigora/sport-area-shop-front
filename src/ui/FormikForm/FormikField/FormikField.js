import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import FieldControl from '@ui/FieldControl';

const FormikField = React.forwardRef(function FormikField(props, ref) {
    const { component: Component, ...other } = props;
    const [field, meta, helpers] = useField({ ...other });
    const { error, touched } = meta;

    const fieldProps = {
        ...field,
        ...other,
        ...helpers,
        error,
        touched
    };

    return <FieldControl {...fieldProps} ref={ref} component={Component} />;
});

FormikField.propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired
};

export default memo(FormikField);
