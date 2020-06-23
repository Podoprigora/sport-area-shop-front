import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Divider = React.forwardRef(function Divider(props, ref) {
    const { className, ...other } = props;

    return <hr className={classNames('divider', className)} ref={ref} {...other} />;
});

Divider.propTypes = {
    className: PropTypes.string
};

export default Divider;
