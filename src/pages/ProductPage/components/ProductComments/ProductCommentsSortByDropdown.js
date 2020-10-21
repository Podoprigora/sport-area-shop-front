import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import useControlled from '@ui/hooks/useControlled';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import CheckIcon from '@svg-icons/feather/CheckIcon';
import ButtonMenu from '@ui/ButtonMenu';
import SortIcon from '@svg-icons/material/SortIcon';
import Menu from '@ui/Menu';

const options = [
    { id: 'top', title: 'Top comments' },
    { id: 'newest', title: 'Newest first' }
];

const defaultDisplayValue = 'Sort By';

const ProductCommentsSortByDropdown = (props) => {
    const { value, defaultValue = '', onChange, ...other } = props;

    const [selectedState, setSelectedState] = useControlled(value, defaultValue);

    const displayValue = useMemo(() => {
        if (!selectedState) {
            return defaultDisplayValue;
        }

        return options.reduce((result, item) => {
            const { id, title } = item;

            return id === selectedState ? title : result;
        }, defaultDisplayValue);
    }, [selectedState]);

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
                <ListItem key={id} button selected={selected} onClick={handleItemClick}>
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

    return (
        <ButtonMenu text={displayValue} plain arrow icon={SortIcon} {...other}>
            <Menu autoWidth>{menuItems}</Menu>
        </ButtonMenu>
    );
};

ProductCommentsSortByDropdown.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

export default memo(ProductCommentsSortByDropdown);
