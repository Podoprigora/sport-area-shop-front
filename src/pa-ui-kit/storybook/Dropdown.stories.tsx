import React, { useCallback } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { IconButton } from '../components/IconButton';
import { Dropdown, DropdownProps } from '../components/Dropdown';
import {
    MoreVirticalIcon,
    EditIcon,
    TrashIcon,
    UserIcon,
    LogOutIcon,
    InboxIcon
} from '../components/svg-icons/feather';
import { KeyboardArrowDownIcon } from '../components/svg-icons/material';
import { Menu } from '../components/Menu';
import { ListItem, ListItemIcon, ListItemText } from '../components/List';
import { Divider } from '../components/Divider';

import './sass/custom-button.scss';

export default {
    title: 'PA-UI-KIT/Dropdown',
    component: Dropdown
} as Meta;

export const Default: Story<DropdownProps> = (args) => {
    const handleEditClick = useCallback(() => {
        console.log('Edit item');
    }, []);

    const handleDeleteClick = useCallback(() => {
        console.log('Delete item');
    }, []);

    return (
        <Dropdown
            {...args}
            renderTrigger={() => {
                return (
                    <IconButton>
                        <MoreVirticalIcon />
                    </IconButton>
                );
            }}
            renderMenu={() => {
                return (
                    <Menu width={160} modal={false}>
                        <ListItem button onClick={handleEditClick}>
                            <ListItemIcon>
                                <EditIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </ListItem>
                        <ListItem button onClick={handleDeleteClick}>
                            <ListItemIcon>
                                <TrashIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                    </Menu>
                );
            }}
        />
    );
};
Default.args = {} as DropdownProps;
Default.parameters = {
    docs: {
        source: {
            code: `
export const Default: Story<DropdownProps> = (args) => {
    const handleEditClick = useCallback(() => {
        console.log('Edit item');
    }, []);

    const handleDeleteClick = useCallback(() => {
        console.log('Delete item');
    }, []);

    return (
        <Dropdown
            {...args}
            renderTrigger={() => {
                return (
                    <IconButton>
                        <MoreVirticalIcon />
                    </IconButton>
                );
            }}
            renderMenu={() => {
                return (
                    <Menu width={160} modal={false}>
                        <ListItem button onClick={handleEditClick}>
                            <ListItemIcon>
                                <EditIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </ListItem>
                        <ListItem button onClick={handleDeleteClick}>
                            <ListItemIcon>
                                <TrashIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                    </Menu>
                );
            }}
        />
    );
};
            `
        }
    }
};

export const CustomTrigger: Story<DropdownProps> = (args) => {
    return (
        <Dropdown
            {...args}
            renderTrigger={() => {
                return (
                    <div role="button" className="custom-btn" tabIndex={0}>
                        <UserIcon size="medium" className="custom-btn__icon" />
                        <div className="custom-btn__text">
                            <div>Demo User</div>
                            <div className="custom-btn__email">example@mail.com</div>
                        </div>
                        <KeyboardArrowDownIcon size="medium" className="custom-btn__arrow" />
                    </div>
                );
            }}
            renderMenu={() => {
                return (
                    <Menu autoWidth modal={false}>
                        <ListItem button>
                            <ListItemIcon>
                                <UserIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Inbox</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <LogOutIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </Menu>
                );
            }}
        />
    );
};
CustomTrigger.args = {} as DropdownProps;
CustomTrigger.parameters = {
    docs: {
        source: {
            code: `
export const CustomTrigger: Story<DropdownProps> = (args) => {
    return (
        <Dropdown
            {...args}
            renderTrigger={() => {
                return (
                    <div role="button" className="custom-btn" tabIndex={0}>
                        <UserIcon size="medium" className="custom-btn__icon" />
                        <div className="custom-btn__text">
                            <div>Demo User</div>
                            <div className="custom-btn__email">example@mail.com</div>
                        </div>
                        <KeyboardArrowDownIcon size="medium" className="custom-btn__arrow" />
                    </div>
                );
            }}
            renderMenu={() => {
                return (
                    <Menu autoWidth modal={false}>
                        <ListItem button>
                            <ListItemIcon>
                                <UserIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Inbox</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <LogOutIcon size="medium" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </Menu>
                );
            }}
        />
    );
};
            `
        }
    }
};
