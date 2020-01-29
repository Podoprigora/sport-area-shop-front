import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, size, primary, icon: Icon, className, ...props }) => {
    const sizeClassnames = {
        small: 'btn--small',
        medium: 'btn--medium',
        large: 'btn--large'
    };

    return (
        <button
            type="button"
            className={classNames('btn', sizeClassnames[size], className, {
                'btn--primary': primary
            })}
            {...props}
        >
            {!!Icon && <Icon className="btn__icon" />}
            <span className="btn__text">{children}</span>
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.elementType,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    primary: PropTypes.bool
};

Button.defaultProp = {
    size: 'medium'
};

export default Button;
