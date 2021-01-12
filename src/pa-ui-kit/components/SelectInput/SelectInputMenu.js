import React, { memo } from 'react';
import PropTypes from 'prop-types';

import isEmptyString from '@ui/utils/isEmptyString';
import Menu, { MenuItem } from '@ui/Menu';
import { ListItem, ListItemText } from '@ui/List';
import { useSelectInputContext } from './SelectInputContext';

const SelectInputMenu = (props) => {
    const { open, anchorRef, menuListMaxHeight = 250, onItemClick, onClose, ...other } = props;

    const {
        data,
        value,
        getItemSelected,
        getItemText,
        getItemValue,
        renderItem,
        emptyItem,
        emptyItemText,
        emptyItemValue
    } = useSelectInputContext() || {};

    const handleItemClick = (item, index) => (ev) => {
        ev.stopPropagation();

        const newValue = item === emptyItemValue ? item : getItemValue(item, index);

        if (newValue === null || newValue === undefined) {
            return;
        }

        if (onItemClick) {
            onItemClick(ev, newValue);
        }
    };

    const items = data.map((item, index) => {
        const selected = !isEmptyString(value) && getItemSelected(item, value);
        const itemValue = getItemValue(item, index);
        const itemText = getItemText(item, index);

        const itemProps = {
            selected,
            onClick: handleItemClick(item, index),
            value: undefined,
            'data-value': itemValue
        };

        if (renderItem) {
            return React.cloneElement(renderItem(item), { key: itemValue, ...itemProps });
        }

        return <MenuItem {...itemProps}>{itemText}</MenuItem>;
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

SelectInputMenu.propTypes = {
    open: PropTypes.bool,
    anchorRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    menuListMaxHeight: PropTypes.number,
    onItemClick: PropTypes.func,
    onClose: PropTypes.func
};

export default memo(SelectInputMenu);
