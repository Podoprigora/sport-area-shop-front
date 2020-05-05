import React from 'react';
import PropTypes from 'prop-types';
import { Form as FormikForm } from 'formik';
import classNames from 'classnames';

const Form = React.forwardRef(function Form(props, ref) {
    const { className, ...other } = props;

    return <FormikForm className={classNames('form', className)} {...other} ref={ref} />;
});

Form.propTypes = {
    className: PropTypes.string
};

export default Form;
