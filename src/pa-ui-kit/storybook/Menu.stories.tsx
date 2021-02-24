import React, { useRef, useState, useCallback } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { Menu, MenuItem, MenuProps } from '../components/Menu';
import { ListItem, ListItemText, ListSubheader } from '../components/List';

export default {
    title: 'PA-UI-KIT/Menu',
    component: Menu,
    subcomponents: { MenuItem }
} as Meta;

export const Default: Story<MenuProps> = (args) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleButtonClick = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    const handleMenuClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleItemClick = useCallback((ev, index) => {
        console.log({ index });
        // setOpen(false);
    }, []);

    return (
        <>
            <Button ref={anchorRef} onClick={handleButtonClick}>
                Open Menu
            </Button>
            <Menu
                {...args}
                open={open}
                anchorRef={anchorRef}
                width={200}
                listProps={{ maxHeight: 200 }}
                modal
                onClose={handleMenuClose}
                onItemClick={handleItemClick}
            >
                <ListSubheader>Subheader 1</ListSubheader>
                <MenuItem disabled>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
                <MenuItem>Item 3</MenuItem>
                <MenuItem>Item 4</MenuItem>
                <Divider />
                <ListSubheader>Subheader 2</ListSubheader>
                <MenuItem>Item 5</MenuItem>
                <MenuItem>Item 6</MenuItem>
                <MenuItem>Item 7</MenuItem>
                <ListItem button>
                    <ListItemText>Item 8</ListItemText>
                </ListItem>
                <MenuItem>Item 9</MenuItem>
                <MenuItem>Item 10</MenuItem>
                <MenuItem>Item 11</MenuItem>
                <MenuItem>Item 12</MenuItem>
                <MenuItem>Item 13</MenuItem>
            </Menu>
        </>
    );
};
Default.args = { placement: 'right-start' } as MenuProps;
