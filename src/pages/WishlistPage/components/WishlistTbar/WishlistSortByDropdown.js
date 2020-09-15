import React, { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@ui/Button';
import SortIcon from '@svg-icons/material/SortIcon';
import Menu from '@ui/Menu';
import useControlled from '@ui/hooks/useControlled';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import CheckIcon from '@svg-icons/feather/CheckIcon';

const options = [
    { id: 'added-date', title: 'By added date' },
    { id: 'price-up', title: 'Price up' },
    { id: 'price-down', title: 'Price down' }
];

const WishlistSortByDropdown = (props) => {
    const { value, defaultValue = '', style, className, onChange, ...other } = props;

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedState, setSelectedState] = useControlled(value, defaultValue);

    const handleButtonClick = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    const handleCloseMenu = useCallback(() => {
        setOpen(false);
    }, []);

    const handleItemClick = (id) => (ev) => {
        setSelectedState(id);
        setOpen(false);

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
            <Button
                {...other}
                plain
                arrow
                icon={SortIcon}
                className={classNames(className, {
                    'btn--focus-visible': open
                })}
                style={{ minWidth: '18rem', ...style }}
                onClick={handleButtonClick}
                ref={anchorRef}
            >
                {displayValue}
            </Button>
            <Menu open={open} anchorRef={anchorRef} autoWidth onClose={handleCloseMenu}>
                {menuItems}
            </Menu>
        </>
    );
};

WishlistSortByDropdown.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

export default memo(WishlistSortByDropdown);
