import React from 'react';

import { ListItem, ListItemProps, ListItemText } from '../List';

export interface MenuItemProps extends ListItemProps {
    children: string;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
    props,
    forwardedRef
) {
    const { children, ...other } = props;

    return (
        <ListItem button ref={forwardedRef} {...other}>
            <ListItemText>{children}</ListItemText>
        </ListItem>
    );
});
