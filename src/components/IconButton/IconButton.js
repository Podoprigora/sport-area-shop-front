import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconButton = ({ children, disabled, className, ...props }) => {
    return (
        <button
            type="button"
            className={classNames('btn-icon', className, {
                'btn-icon--disabled': disabled
            })}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

IconButton.propTypes = {
    children: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

export default IconButton;
