import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AlertCircleIcon from '@svg-icons/feather/AlertCircleIcon';
import AlertTriangleIcon from '@svg-icons/feather/AlertTriangleIcon';
import InfoIcon from '@svg-icons/feather/InfoIcon';
import CheckCircleIcon from '@svg-icons/feather/CheckCircleIcon';

const Alert = React.forwardRef(function Alert(props, ref) {
    const { type = 'error', children, action, frame, className, ...other } = props;

    const icons = {
        error: <AlertCircleIcon />,
        warning: <AlertTriangleIcon />,
        info: <InfoIcon />,
        success: <CheckCircleIcon />,
        default: <AlertCircleIcon />
    };

    const icon = React.cloneElement(icons[type] || icons.default, {
        size: 'medium'
    });

    return (
        <div
            className={classNames('alert', className, {
                [`alert--${type}`]: type,
                'alert--frame': frame
            })}
            {...other}
            ref={ref}
        >
            <div className="alert__icon">{icon}</div>
            <div className="alert__message">{children}</div>
            {action && <div className="alert__action">{action}</div>}
        </div>
    );
});

Alert.propTypes = {
    type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    children: PropTypes.node.isRequired,
    action: PropTypes.node,
    frame: PropTypes.bool,
    className: PropTypes.string
};

export default Alert;
