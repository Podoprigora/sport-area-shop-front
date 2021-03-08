import React from 'react';
import classNames from 'classnames';

export interface ListItemIconProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains a sole Icon component
     */
    children?: React.ReactElement | null;
    className?: string;
}

export const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
    function ListItemIcon(props, forwardedRef) {
        const { children, className, ...other } = props;

        return (
            <div className={classNames('list__icon', className)} ref={forwardedRef} {...other}>
                {children}
            </div>
        );
    }
);
