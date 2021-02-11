import React from 'react';
import classNames from 'classnames';

export interface ListItemTextProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Contains of "text" or ReactNode
     */
    children?: React.ReactNode;
    truncate?: boolean;
    flex?: boolean;
}

export const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
    function ListItemText(props, forwardedRef) {
        const { children, className, truncate, flex, ...other } = props;

        return (
            <div
                className={classNames('list__text', className, {
                    'list__text--truncate': truncate,
                    'list__text--flex': flex
                })}
                ref={forwardedRef}
                {...other}
            >
                {children}
            </div>
        );
    }
);
