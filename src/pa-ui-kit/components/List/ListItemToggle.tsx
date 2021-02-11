import React, { useCallback } from 'react';

import { KeyboardArrowUpIcon, KeyboardArrowDownIcon } from '../svg-icons/material';

import { ListItem, ListItemProps } from './ListItem';
import { ListItemIcon } from './ListItemIcon';
import { ListItemText } from './ListItemText';

export type ListItemPropsOnClick = Pick<ListItemProps, 'onClick'>;

export interface ListItemToggleProps extends ListItemPropsOnClick {
    children?: React.ReactNode;
    expanded?: boolean;
    items?: React.ReactNode;
    maxLength?: number;
}

export const ListItemToggle = (props: ListItemToggleProps) => {
    const { children, expanded, onClick } = props;

    const handleClick = useCallback(
        (ev) => {
            if (onClick) {
                onClick(ev);
            }
        },
        [onClick]
    );

    return (
        <ListItem button onClick={handleClick}>
            {children || (
                <>
                    <ListItemIcon>
                        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </ListItemIcon>
                    <ListItemText>{expanded ? 'Show less' : 'Show more'}</ListItemText>
                </>
            )}
        </ListItem>
    );
};
