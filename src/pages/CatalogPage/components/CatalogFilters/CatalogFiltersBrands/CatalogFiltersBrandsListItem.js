import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemAction, ListItemText } from '@ui/List';
import Checkbox from '@ui/Checkbox';
import useEventCallback from '@ui/hooks/useEventCallback';

const CatalogFiltersBrandsListItem = (props) => {
    const { name, title, selected, onClick } = props;

    const handleClick = useEventCallback((ev) => {
        if (onClick) {
            onClick({ name, title });
        }
    });

    return (
        <ListItem key={name} button onClick={handleClick}>
            <ListItemAction>
                <Checkbox tabIndex="-1" checked={selected} />
            </ListItemAction>
            <ListItemText flex>{selected ? <strong>{title}</strong> : title}</ListItemText>
        </ListItem>
    );
};

CatalogFiltersBrandsListItem.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(CatalogFiltersBrandsListItem);
