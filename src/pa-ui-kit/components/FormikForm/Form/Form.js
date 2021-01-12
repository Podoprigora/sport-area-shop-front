import React from 'react';
import PropTypes from 'prop-types';
import { Form as FormikForm } from 'formik';
import classNames from 'classnames';

const Form = React.forwardRef(function Form(props, ref) {
    const { className, centered, maxWidth, style, ...other } = props;

    const componentStyle = {
        ...(maxWidth && { width: '100%', maxWidth }),
        ...style
    };

    return (
        <FormikForm
            className={classNames('form', className, {
                'u-margin-auto': centered
            })}
            style={componentStyle}
            {...other}
            ref={ref}
        />
    );
});

Form.propTypes = {
    className: PropTypes.string,
    maxWidth: PropTypes.number,
    centered: PropTypes.bool,
    style: PropTypes.object
};

export default Form;
