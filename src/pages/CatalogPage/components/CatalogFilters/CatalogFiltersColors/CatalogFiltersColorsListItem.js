import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemAction, ListItemText } from '@ui/List';
import Checkbox from '@ui/Checkbox';
import useEventCallback from '@ui/hooks/useEventCallback';

const CatalogFiltersColorsListItem = (props) => {
    const { name, id, selected, onClick } = props;

    const handleClick = useEventCallback((ev) => {
        if (onClick) {
            onClick({ name, id });
        }
    });

    return (
        <ListItem key={name} button onClick={handleClick}>
            <ListItemAction>
                <Checkbox tabIndex="-1" checked={selected} />
            </ListItemAction>
            <ListItemText flex>{selected ? <strong>{name}</strong> : name}</ListItemText>
        </ListItem>
    );
};

CatalogFiltersColorsListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(CatalogFiltersColorsListItem);
