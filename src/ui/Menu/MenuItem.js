import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@ui/List';

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
    const { children, ...other } = props;

    return (
        <ListItem button ref={ref} {...other}>
            <ListItemText>{children}</ListItemText>
        </ListItem>
    );
});

MenuItem.propTypes = {
    children: PropTypes.string.isRequired
};

export default MenuItem;
