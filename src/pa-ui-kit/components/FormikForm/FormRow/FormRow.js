import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormRow = React.forwardRef(function FormRow(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('form__row', className)} {...other}>
            {children}
        </div>
    );
});

FormRow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default FormRow;
