import React from 'react';
import classNames from 'classnames';

export type SkeletonType = 'text' | 'circle' | 'rect';
export type SkeletonSize = 'xsmall' | 'small' | 'medium' | 'large';
export type SkeletonAnimation = 'pulse' | 'wave' | false;

export interface SkeletonProps extends React.ComponentPropsWithRef<'div'> {
    type?: SkeletonType;
    size?: SkeletonSize;
    animation?: SkeletonAnimation;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
    props,
    forwardedRef
) {
    const {
        type = 'text',
        size = 'medium',
        animation = 'wave',
        className,
        style
    }: SkeletonProps = props;

    return (
        <div
            className={classNames('skeleton', className, {
                [`skeleton--${type}`]: type,
                [`skeleton--${size}`]: size,
                [`skeleton--animation-${animation}`]: animation
            })}
            style={style}
            ref={forwardedRef}
        />
    );
});
