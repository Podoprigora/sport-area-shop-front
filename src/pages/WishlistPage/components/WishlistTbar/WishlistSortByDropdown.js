import React, { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SortIcon from '@svg-icons/material/SortIcon';
import Menu from '@ui/Menu';
import useControlled from '@ui/hooks/useControlled';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import CheckIcon from '@svg-icons/feather/CheckIcon';
import ButtonMenu from '@ui/ButtonMenu';

const options = [
    { id: 'added-date', title: 'By added date' },
    { id: 'price-up', title: 'Price up' },
    { id: 'price-down', title: 'Price down' }
];

const WishlistSortByDropdown = (props) => {
    const { value, defaultValue = '', style, onChange, ...other } = props;

    const [selectedState, setSelectedState] = useControlled(value, defaultValue);

    const handleItemClick = (id) => (ev) => {
        setSelectedState(id);

        if (onChange) {
            onChange(ev, id);
        }
    };

    const menuItems = options.map((item) => {
        const { id, title } = item;
        const selected = id === selectedState;

        return (
            <ListItem button key={id} value={id} selected={selected} onClick={handleItemClick(id)}>
                <ListItemText flex>{title}</ListItemText>
                {selected && (
                    <ListItemIcon>
                        <CheckIcon size="small" />
                    </ListItemIcon>
                )}
            </ListItem>
        );
    });

    const defaultDisplayValue = 'Sort by';
    const displayValue =
        selectedState &&
        options.reduce((result, item) => {
            const { id, title } = item;

            return id === selectedState ? title : result;
        }, defaultDisplayValue);

    return (
        <>
            <ButtonMenu
                text={displayValue}
                plain
                arrow
                icon={SortIcon}
                style={{ minWidth: '18rem', ...style }}
                {...other}
            >
                <Menu autoWidth>{menuItems}</Menu>
            </ButtonMenu>
        </>
    );
};

WishlistSortByDropdown.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

export default memo(WishlistSortByDropdown);
