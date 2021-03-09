import React, { useMemo } from 'react';

import { isEmptyString } from '../utils';
import { ElementOf } from '../utils/types';
import { Menu, MenuItem, MenuProps } from '../Menu';
import { ListItem, ListItemProps, ListItemText } from '../List';

import { useSelectInputContext } from './SelectInput';

export interface SelectInputMenuProps {
    open?: boolean;
    anchorRef: React.RefObject<HTMLElement>;
    menuListMaxHeight?: number;
    menuOffset?: MenuProps['offset'];
    onItemClick: (ev: React.SyntheticEvent, value: string) => void;
    onClose: () => void;
}

export type SelectInputMenuItemProps = ListItemProps;

export const SelectInputMenu = (props: SelectInputMenuProps) => {
    const { open, anchorRef, menuListMaxHeight = 250, menuOffset, onItemClick, onClose } = props;

    const {
        data = [],
        value,
        getItemSelected,
        getItemText,
        getItemValue,
        renderItem,
        emptyItem,
        emptyItemText,
        emptyItemValue
    } = useSelectInputContext();

    const handleItemClick = (item: ElementOf<typeof data>) => (ev: React.MouseEvent) => {
        ev.stopPropagation();

        const newValue = emptyItemValue === item ? emptyItemValue : getItemValue(item);

        if (newValue === null || newValue === undefined) {
            return;
        }

        if (onItemClick) {
            onItemClick(ev, newValue);
        }
    };

    const items = data.map((item, index) => {
        const selected = !isEmptyString(value) && getItemSelected(item, value);
        const itemValue = getItemValue(item);
        const itemText = getItemText(item);

        const itemProps = {
            selected,
            value,
            'data-value': itemValue,
            onClick: handleItemClick(item)
        } as SelectInputMenuItemProps;

        if (renderItem) {
            const itemElement = renderItem(item, selected);

            if (React.isValidElement(itemElement)) {
                return React.cloneElement(itemElement, { key: index, ...itemProps });
            }
        }

        return (
            <MenuItem key={index} {...itemProps}>
                {itemText}
            </MenuItem>
        );
    });

    if (emptyItem) {
        items.unshift(
            <ListItem
                key="-1"
                button
                value={emptyItemValue}
                onClick={handleItemClick(emptyItemValue)}
            >
                <ListItemText className="list__text--empty">{emptyItemText}</ListItemText>
            </ListItem>
        );
    }

    const listProps = useMemo(() => ({ maxHeight: menuListMaxHeight }), [menuListMaxHeight]);

    return (
        <Menu
            open={open}
            anchorRef={anchorRef}
            onClose={onClose}
            autoWidth
            offset={menuOffset}
            listProps={listProps}
        >
            {items}
        </Menu>
    );
};
