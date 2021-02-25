import React from 'react';
import classNames from 'classnames';

export interface ListSubheaderProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Normally contains some text
     */
    children?: React.ReactNode;
    sticky?: boolean;
}

export const ListSubheader = React.forwardRef<HTMLDivElement, ListSubheaderProps>(
    function ListSubheader(props, forwardedRef) {
        const { children, sticky, className, ...other } = props;

        return (
            <div
                className={classNames('list__subheader', className, {
                    'list__subheader--sticky': sticky
                })}
                ref={forwardedRef}
                {...other}
            >
                {children}
            </div>
        );
    }
);
