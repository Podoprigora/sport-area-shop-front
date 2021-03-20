import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IconButton } from '@ui/IconButton';
import { MoreVirticalIcon, TrashIcon, EditIcon } from '@ui/svg-icons/feather';
import { Menu } from '@ui/Menu';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import { useEventCallback } from '@ui/utils';

const CommentAlterMenu = (props) => {
    const { className, onEdit, onDelete, ...other } = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleAnchorClick = useCallback((ev) => {
        setOpen(true);
    }, []);

    const handleMenuClose = useCallback((ev) => {
        setOpen(false);
    }, []);

    const handleEditMenuItemClick = useEventCallback((ev) => {
        handleMenuClose();

        if (onEdit) {
            onEdit(ev);
        }
    });

    const handleDeleteMenuItemClick = useEventCallback((ev) => {
        handleMenuClose();

        if (onDelete) {
            onDelete(ev);
        }
    });

    return (
        <>
            <IconButton
                size="medium"
                className={classNames(className, {
                    'btn-icon--focus-visible': open
                })}
                {...other}
                onClick={handleAnchorClick}
                ref={anchorRef}
            >
                <MoreVirticalIcon />
            </IconButton>
            <Menu open={open} anchorRef={anchorRef} width={150} onClose={handleMenuClose}>
                <ListItem button onClick={handleEditMenuItemClick}>
                    <ListItemIcon>
                        <EditIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </ListItem>
                <ListItem button onClick={handleDeleteMenuItemClick}>
                    <ListItemIcon>
                        <TrashIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </ListItem>
            </Menu>
        </>
    );
};

CommentAlterMenu.propTypes = {
    className: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default CommentAlterMenu;
