import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, size, className, ...props }) => {
    const sizeClassnames = {
        small: 'btn--small',
        medium: 'btn--medium',
        large: 'btn--large'
    };

    return (
        <button
            type="button"
            className={classNames('btn', sizeClassnames[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProp = {
    size: 'medium'
};

export default Button;
