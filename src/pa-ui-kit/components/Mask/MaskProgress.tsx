import React from 'react';
import classNames from 'classnames';

export interface MaskProgressProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains `CircularProgress` or `LinearProgress` components
     */
    children?: React.ReactElement;
    title?: string;
    position?: 'top' | 'bottom' | 'center';
    primary?: boolean;
    secondary?: boolean;
}

export const MaskProgress = React.forwardRef<HTMLDivElement, MaskProgressProps>(
    function MaskProgress(props, forwardedRef) {
        const {
            children,
            title,
            className,
            position = 'center',
            primary,
            secondary,
            ...other
        } = props;

        const progressElement = React.isValidElement(children)
            ? React.cloneElement(children, {
                  primary,
                  secondary
              })
            : null;

        return (
            <div
                className={classNames('mask__progress', className, {
                    'mask__progress--primary': primary,
                    'mask__progress--secondary': secondary,
                    [`mask__progress--${position}`]: position
                })}
                {...other}
                ref={forwardedRef}
            >
                {progressElement}
                {title && <div className="mask__progress-title">{title}</div>}
            </div>
        );
    }
);
