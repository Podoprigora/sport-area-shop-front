import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconButton = React.forwardRef(function IconButton(props, ref) {
    const { children, disabled, className, primary, ...other } = props;
    return (
        <button
            type="button"
            className={classNames('btn-icon', className, {
                'btn-icon--primary': primary,
                'btn-icon--disabled': disabled
            })}
            disabled={disabled}
            ref={ref}
            {...other}
        >
            {children}
        </button>
    );
});

IconButton.propTypes = {
    children: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    primary: PropTypes.bool
};

export default IconButton;
