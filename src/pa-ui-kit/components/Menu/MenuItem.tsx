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

    // console.log('Menu item rerender');

    return (
        <ListItem button ref={forwardedRef} {...other}>
            <ListItemText>{children}</ListItemText>
        </ListItem>
    );
});
