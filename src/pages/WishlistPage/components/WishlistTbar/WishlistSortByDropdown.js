import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useControlled } from '@ui/utils';
import { Menu } from '@ui/Menu';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import { SortIcon } from '@ui/svg-icons/material';
import { CheckIcon } from '@ui/svg-icons/feather';

const options = [
    { id: 'added-date', title: 'By added date' },
    { id: 'price-up', title: 'Price up' },
    { id: 'price-down', title: 'Price down' }
];

const defaultDisplayValue = 'Sort by';

const WishlistSortByDropdown = (props) => {
    const { value, defaultValue = '', onChange, ...other } = props;

    const [selectedState, setSelectedState] = useControlled(value, defaultValue);

    const menuItems = useMemo(() => {
        return options.map((item) => {
            const { id, title } = item;
            const selected = id === selectedState;

            const handleItemClick = (ev) => {
                setSelectedState(id);

                if (onChange) {
                    onChange(ev, id);
                }
            };

            return (
                <ListItem button key={id} value={id} selected={selected} onClick={handleItemClick}>
                    <ListItemText flex>{title}</ListItemText>
                    {selected && (
                        <ListItemIcon>
                            <CheckIcon size="small" />
                        </ListItemIcon>
                    )}
                </ListItem>
            );
        });
    }, [selectedState, setSelectedState, onChange]);

    const displayValue = useMemo(() => {
        if (!selectedState) {
            return defaultDisplayValue;
        }

        return options.reduce((result, item) => {
            const { id, title } = item;

            return id === selectedState ? title : result;
        }, defaultDisplayValue);
    }, [selectedState]);

    // @TODO: Should make use the Dropdown component instead.
    return '[Dropdown]';

    // return (
    //     <ButtonMenu text={displayValue} plain arrow icon={SortIcon} {...other}>
    //         <Menu autoWidth>{menuItems}</Menu>
    //     </ButtonMenu>
    // );
};

WishlistSortByDropdown.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

export default memo(WishlistSortByDropdown);
