import React from 'react';
import classNames from 'classnames';

export interface CircularProgressProps extends React.ComponentPropsWithRef<'div'> {
    size?: 'small' | 'medium' | 'large';
    primary?: boolean;
    secondary?: boolean;
}

const circleSize = 50;

export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
    function CircularProgress(props, forwardedRef) {
        const { size = 'medium', primary, secondary, className, ...other } = props;

        return (
            <div
                className={classNames('circular-progress', className, {
                    'circular-progress--primary': primary,
                    'circular-progress--secondary': secondary,
                    [`circular-progress--${size}`]: size
                })}
                {...other}
                ref={forwardedRef}
            >
                <svg viewBox={`0 0 ${circleSize} ${circleSize}`} className="circular-progress__svg">
                    <circle
                        className="circular-progress__svg-circle"
                        cx={circleSize / 2}
                        cy={circleSize / 2}
                        r={circleSize / 2 - 5}
                    />
                </svg>
            </div>
        );
    }
);
