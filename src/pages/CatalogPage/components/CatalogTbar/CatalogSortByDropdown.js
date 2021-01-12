import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useControlled from '@ui/hooks/useControlled';
import { ListItem, ListItemText, ListItemIcon } from '@ui/List';
import CheckIcon from '@ui/svg-icons/feather/CheckIcon';
import Menu from '@ui/Menu';
import SortIcon from '@ui/svg-icons/material/SortIcon';
import ButtonMenu from '@ui/ButtonMenu';

const options = [
    { id: 'relevance', name: 'Relevance' },
    { id: 'price-up', name: 'Price up' },
    { id: 'price-down', name: 'Price down' },
    { id: 'brand-new', name: 'Brand new' },
    { id: 'top-seller', name: 'Top seller' },
    { id: 'name', name: 'Name' }
];

const defaultDisplayValue = 'Sort by';

const CatalogSortByDropdown = (props) => {
    const { value, defaultValue = '', onChange, ...other } = props;

    const [selectedState, setSelectedState] = useControlled(value, defaultValue);

    const menuItems = useMemo(() => {
        return options.map((item) => {
            const { id, name } = item;
            const selected = id === selectedState;

            const handleItemClick = (ev) => {
                setSelectedState(id);

                if (onChange) {
                    onChange(ev, id);
                }
            };

            return (
                <ListItem button key={id} value={id} selected={selected} onClick={handleItemClick}>
                    <ListItemText flex>{name}</ListItemText>
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
            const { id, name } = item;

            return id === selectedState ? name : result;
        }, defaultDisplayValue);
    }, [selectedState]);

    return (
        <ButtonMenu text={displayValue} plain arrow icon={SortIcon} {...other}>
            <Menu autoWidth>{menuItems}</Menu>
        </ButtonMenu>
    );
};

CatalogSortByDropdown.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

export default memo(CatalogSortByDropdown);
