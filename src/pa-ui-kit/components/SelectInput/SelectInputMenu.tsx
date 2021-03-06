import React from 'react';

import { isEmptyValue } from '../utils';
import { ElementOf } from '../utils/types';
import { Menu, MenuItem } from '../Menu';
import { ListItem, ListItemText } from '../List';

import { useSelectInputContext } from './SelectInput';

export interface SelectInputMenuProps {
    open?: boolean;
    anchorRef: React.RefObject<HTMLElement>;
    menuListMaxHeight?: number;
    onItemClick: (ev: React.SyntheticEvent, value: string) => void;
    onClose: () => void;
}

export const SelectInputMenu = (props: SelectInputMenuProps) => {
    const { open, anchorRef, menuListMaxHeight = 250, onItemClick, onClose } = props;

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
        const selected = !isEmptyValue(value) && getItemSelected(item, value);
        const itemValue = getItemValue(item);
        const itemText = getItemText(item);

        const itemProps = {
            selected,
            value: undefined,
            'data-value': itemValue,
            onClick: handleItemClick(item)
        };

        if (renderItem) {
            const itemElement = renderItem(item);

            if (React.isValidElement(itemElement)) {
                return React.cloneElement(itemElement, { key: itemValue, ...itemProps });
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

    return (
        <Menu
            open={open}
            anchorRef={anchorRef}
            onClose={onClose}
            autoWidth
            listProps={{ maxHeight: menuListMaxHeight }}
        >
            {items}
        </Menu>
    );
};
