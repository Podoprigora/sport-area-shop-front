import React from 'react';
import classNames from 'classnames';

export type SvgIconSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface SvgIconProps extends React.ComponentPropsWithRef<'span'> {
    className?: string;
    size?: SvgIconSize;
    primary?: boolean;
}

export const withSvgIconAttributes = (SvgIconComponent: React.ElementType) => {
    const EnhencedComponent = React.forwardRef<HTMLElement, SvgIconProps>((props, ref) => {
        const { className, size, primary, ...other } = props;

        return (
            <span
                className={classNames('svg-icon', className, {
                    'svg-icon--primary': primary,
                    [`svg-icon--${size}`]: size
                })}
                {...other}
                ref={ref}
            >
                <SvgIconComponent preserveAspectRatio="xMidYMid meet" />
            </span>
        );
    });

    return React.memo(EnhencedComponent);
};
