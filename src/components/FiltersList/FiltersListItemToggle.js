import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import { KeyboardArrowUpIcon, KeyboardArrowDownIcon } from '@ui/svg-icons/material';

const FiltersListItemToggle = (props) => {
    const { items, expanded, minLength, onClick } = props;

    const handleClick = useCallback(
        (ev) => {
            if (onClick) {
                onClick(ev);
            }
        },
        [onClick]
    );

    const showMoreCount = items.length - minLength;

    return (
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </ListItemIcon>
            <ListItemText>{expanded ? 'Show less' : `Show more (${showMoreCount})`}</ListItemText>
        </ListItem>
    );
};

FiltersListItemToggle.propTypes = {
    items: PropTypes.array.isRequired,
    minLength: PropTypes.number.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func
};

export default FiltersListItemToggle;
