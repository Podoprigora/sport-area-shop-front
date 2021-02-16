import React from 'react';
import classNames from 'classnames';

export interface WindowBodyProps extends React.ComponentPropsWithoutRef<'div'> {
    children?: React.ReactNode;
    /**
     * If `true` - will apply paddings.
     */
    padding?: boolean;
    /**
     * If `true` - will apply background color.
     */
    painted?: boolean;
}

export const WindowBody = (props: WindowBodyProps) => {
    const { children, className, padding = true, painted, ...other } = props;

    return (
        <div
            className={classNames('window__body', className, {
                'window__body--painted': painted,
                'window__body--no-padding': !padding
            })}
            {...other}
        >
            {children}
        </div>
    );
};
