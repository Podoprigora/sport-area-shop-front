import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemAction, ListItemText } from '@ui/List';
import { Checkbox } from '@ui/Checkbox';
import { useEventCallback } from '@ui/utils';

const FiltersListItem = (props) => {
    const { id, title, selected, onClick } = props;

    const handleClick = useEventCallback((ev) => {
        if (onClick) {
            onClick(ev, id);
        }
    });

    return (
        <ListItem button onClick={handleClick}>
            <ListItemAction>
                <Checkbox tabIndex="-1" checked={selected} />
            </ListItemAction>
            <ListItemText flex>{selected ? <strong>{title}</strong> : title}</ListItemText>
        </ListItem>
    );
};

FiltersListItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(FiltersListItem);
