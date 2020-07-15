import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AlertActions = (props) => {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('alert__actions', className)} {...other}>
            {children}
        </div>
    );
};

AlertActions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export { AlertActions };
