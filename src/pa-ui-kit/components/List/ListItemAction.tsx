import React from 'react';
import classNames from 'classnames';

import { useListItem } from './ListItemContext';

export interface ListItemActionProps extends React.ComponentPropsWithRef<'div'> {
    /**
     * Contains a sole component
     */
    children?: React.ReactElement;
    className?: string;
}

export const ListItemAction = React.forwardRef<HTMLDivElement, ListItemActionProps>(
    function ListItemAction(props, forwardedRef) {
        const { children, className, ...other } = props;
        const { disabled } = useListItem();

        let childElement = children;

        childElement = React.isValidElement(children)
            ? React.cloneElement(children, {
                  disabled
              })
            : undefined;

        return (
            <div className={classNames('list__action', className)} ref={forwardedRef} {...other}>
                {childElement}
            </div>
        );
    }
);
