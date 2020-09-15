import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useControlled from '@ui/hooks/useControlled';
import { ListItem, ListItemText, ListItemIcon } from '@ui/List';
import CheckIcon from '@svg-icons/feather/CheckIcon';
import Menu from '@ui/Menu';
import Button from '@ui/Button';
import SortIcon from '@svg-icons/material/SortIcon';
import ButtonMenu from '@ui/ButtonMenu';

const options = [
    { id: 'relevance', name: 'Relevance' },
    { id: 'price-up', name: 'Price up' },
    { id: 'price-down', name: 'Price down' },
    { id: 'brand-new', name: 'Brand new' },
    { id: 'top-seller', name: 'Top seller' },
    { id: 'name', name: 'Name' }
];

const CatalogSortByDropdown = (props) => {
    const { value, defaultValue = '', style, onChange, ...other } = props;

    const [selectedState, setSelectedState] = useControlled(value, defaultValue);

    const handleItemClick = (id) => (ev) => {
        setSelectedState(id);

        if (onChange) {
            onChange(ev, id);
        }
    };

    const menuItems = options.map((item) => {
        const { id, name } = item;
        const selected = id === selectedState;

        return (
            <ListItem button key={id} value={id} selected={selected} onClick={handleItemClick(id)}>
                <ListItemText flex>{name}</ListItemText>
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
            const { id, name } = item;

            return id === selectedState ? name : result;
        }, defaultDisplayValue);

    return (
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
    );
};

CatalogSortByDropdown.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

export default memo(CatalogSortByDropdown);
