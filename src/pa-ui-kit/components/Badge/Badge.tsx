import React from 'react';
import classNames from 'classnames';

export interface BadgeProps {
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
}

const Badge = (props: BadgeProps) => {
    const { children, value, placement = 'top-right', showZero = false } = props;

    if (!value && !showZero) {
        return children;
    }

    return (
        <div className="badge-wrap">
            {children}
            <div
                className={classNames('badge', {
                    [`badge--${placement}`]: placement
                })}
            >
                {value}
            </div>
        </div>
    );
};

export { Badge };
