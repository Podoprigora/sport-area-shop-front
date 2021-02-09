import React, { useMemo } from 'react';
import classNames from 'classnames';

export interface BadgeProps extends React.ComponentProps<'div'> {
    children: React.ReactElement;
    value?: string | number;
    placement?:
        | 'top-right'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-left'
        | 'center-right'
        | 'center-left';
    showZero?: boolean;
    offset?: [string | number, string | number];
    inline?: boolean;
    style?: React.CSSProperties;
    className?: string;
    wrapProps?: React.ComponentProps<'div'>;
}

export const Badge = (props: BadgeProps) => {
    const {
        children,
        value,
        placement = 'top-right',
        showZero = false,
        offset,
        inline = true,
        style,
        className,
        wrapProps,
        ...other
    } = props;

    const { className: wrapClassName, style: wrapStyle, ...otherWrapProps } = wrapProps || {};

    const mergedWrapStyle: React.CSSProperties = { ...wrapStyle };

    if (!inline) {
        mergedWrapStyle.display = 'block';
    }

    const badgeStyle = useMemo(() => {
        const placementItems = placement.split('-');
        const offsetStyle: React.CSSProperties = {};

        if (offset && offset.length === 2) {
            if (placementItems[0] === 'top') {
                offsetStyle.marginTop = parseInt(offset[1] as string, 10);
            } else if (placementItems[0] === 'bottom') {
                offsetStyle.marginBottom = parseInt(offset[1] as string, 10);
            }

            if (placementItems[1] === 'right') {
                offsetStyle.marginRight = parseInt(offset[0] as string, 10);
            } else if (placementItems[1] === 'left') {
                offsetStyle.marginLeft = parseInt(offset[0] as string, 10);
            }
        }

        return {
            ...style,
            ...offsetStyle
        };
    }, [style, offset, placement]);

    // Render

    if (!value && !showZero) {
        return children;
    }

    return (
        <div
            className={classNames('badge-wrap', wrapClassName)}
            style={mergedWrapStyle}
            {...otherWrapProps}
        >
            {children}
            <div
                className={classNames('badge', className, {
                    [`badge--${placement}`]: placement
                })}
                style={badgeStyle}
                {...other}
            >
                {value}
            </div>
        </div>
    );
};
