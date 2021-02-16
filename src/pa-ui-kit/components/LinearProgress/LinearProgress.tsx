import React from 'react';
import classNames from 'classnames';

export interface LinearProgressProps extends React.ComponentPropsWithRef<'div'> {
    primary?: boolean;
    secondary?: boolean;
    height?: number | string;
}

export const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
    function LinearProgress(props, forwardedRef) {
        const { height, primary, secondary, className, style, ...other } = props;

        return (
            <div
                className={classNames('linear-progress', className, {
                    'linear-progress--primary': primary,
                    'linear-progress--secondary': secondary
                })}
                style={{ height, ...style }}
                {...other}
                ref={forwardedRef}
            >
                <div className="linear-progress__bar" />
            </div>
        );
    }
);
