import React from 'react';
import classNames from 'classnames';

export interface ListSubheaderProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains some text
     */
    children?: React.ReactNode;
}

export const ListSubheader = React.forwardRef<HTMLDivElement, ListSubheaderProps>(
    function ListSubheader(props, forwardedRef) {
        const { children, className, ...other } = props;

        return (
            <div className={classNames('list__subheader', className)} ref={forwardedRef} {...other}>
                {children}
            </div>
        );
    }
);
