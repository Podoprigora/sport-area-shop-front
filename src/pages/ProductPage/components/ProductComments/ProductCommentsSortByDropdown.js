import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useControlled } from '@ui/utils';
import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import { CheckIcon } from '@ui/svg-icons/feather';
import { SortIcon } from '@ui/svg-icons/material';
import { Menu } from '@ui/Menu';

const options = [
    { id: 'top', title: 'Top comments' },
    { id: 'newest', title: 'Newest first' }
];

const defaultDisplayValue = 'Sort By';

const ProductCommentsSortByDropdown = (props) => {
    const { value, defaultValue = '', onChange } = props;

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

    // @TODO: Should make use the Dropdown component instead.

    return '[Dropdown]';

    // return (
    //     <ButtonMenu text={displayValue} plain arrow icon={SortIcon} style={{ minWidth: '14rem' }}>
    //         <Menu autoWidth>{menuItems}</Menu>
    //     </ButtonMenu>
    // );
};

ProductCommentsSortByDropdown.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

export default memo(ProductCommentsSortByDropdown);
