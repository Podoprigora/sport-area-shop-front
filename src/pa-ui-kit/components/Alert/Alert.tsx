import React from 'react';
import classNames from 'classnames';

import { SvgIconProps } from '../withSvgIconAttributes';
import {
    InfoIcon,
    CheckCircleIcon,
    AlertCircleIcon,
    AlertTriangleIcon
} from '../svg-icons/feather';

export type AlertType = 'error' | 'warning' | 'info' | 'success';

export interface AlertProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * The content of Alert
     */
    children?: React.ReactNode;
    type?: AlertType;
    action?: React.ReactNode;
    frame?: boolean;
    iconProps?: SvgIconProps;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    forwardedRef
) {
    const { type = 'error', children, action, frame, iconProps, className, ...other } = props;

    const icons = {
        error: <AlertCircleIcon />,
        warning: <AlertTriangleIcon />,
        info: <InfoIcon />,
        success: <CheckCircleIcon />,
        default: <AlertCircleIcon />
    };

    const icon = React.cloneElement(icons[type] || icons.default, {
        size: 'large',
        ...iconProps
    } as SvgIconProps);

    return (
        <div
            className={classNames('alert', className, {
                [`alert--${type}`]: type,
                'alert--frame': frame
            })}
            {...other}
            ref={forwardedRef}
        >
            <div className="alert__icon">{icon}</div>
            <div className="alert__message">{children}</div>
            {action && <div className="alert__action">{action}</div>}
        </div>
    );
});
