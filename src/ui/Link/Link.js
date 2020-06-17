import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Link = ({ children, icon, iconAlign, size, primary, className, ...props }) => {
    const iconElement =
        icon &&
        React.createElement(icon, {
            size,
            className: classNames('link__icon', {
                [`link__icon--${iconAlign}`]: iconAlign
            })
        });

    return (
        <a
            {...props}
            className={classNames('link', className, {
                [`link--${size}`]: size,
                'link--primary': primary
            })}
        >
            {icon && iconAlign === 'left' && iconElement}
            {children}
            {icon && iconAlign === 'right' && iconElement}
        </a>
    );
};

Link.propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    icon: PropTypes.elementType,
    iconAlign: PropTypes.oneOf(['left', 'right']),
    primary: PropTypes.bool,
    className: PropTypes.string
};

Link.defaultProps = {
    size: 'small',
    iconAlign: 'left'
};

export default Link;
