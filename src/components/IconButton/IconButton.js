import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconButton = ({ children, className, ...props }) => {
    return (
        <button type="button" className={classNames('btn-icon', className)} {...props}>
            {children}
        </button>
    );
};

IconButton.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string
};

export default IconButton;
