import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowUpIcon from '@ui/svg-icons/material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@ui/svg-icons/material/KeyboardArrowDown';

import ListItem from './ListItem';
import ListItemIcon from './ListItemIcon';
import ListItemText from './ListItemText';

const ListItemToggle = (props) => {
    const { children, expanded, onClick } = props;

    const handleClick = useCallback(
        (ev) => {
            if (onClick) {
                onClick(ev);
            }
        },
        [onClick]
    );

    return (
        <ListItem button onClick={handleClick}>
            {children || (
                <>
                    <ListItemIcon>
                        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </ListItemIcon>
                    <ListItemText>{expanded ? 'Show less' : 'Show more'}</ListItemText>
                </>
            )}
        </ListItem>
    );
};

ListItemToggle.propTypes = {
    children: PropTypes.node,
    expanded: PropTypes.bool,
    onClick: PropTypes.func
};

export default ListItemToggle;
