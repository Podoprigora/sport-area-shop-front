import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconButton = React.forwardRef(function IconButton(props, ref) {
    const { children, disabled, className, primary, size, ...other } = props;

    const iconEl = React.cloneElement(children, {
        size: children.props.size || size
    });

    return (
        <button
            type="button"
            className={classNames('btn-icon', className, {
                'btn-icon--primary': primary,
                'btn-icon--disabled': disabled,
                [`btn-icon--${size}`]: size
            })}
            disabled={disabled}
            ref={ref}
            {...other}
        >
            {iconEl}
        </button>
    );
});

IconButton.propTypes = {
    children: PropTypes.element.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    primary: PropTypes.bool
};

export default IconButton;
