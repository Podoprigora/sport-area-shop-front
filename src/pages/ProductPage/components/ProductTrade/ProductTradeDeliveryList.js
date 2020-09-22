import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import CheckIcon from '@svg-icons/feather/CheckIcon';
import DateRangeIcon from '@svg-icons/material/DateRangeIcon';
import CalendarIcon from '@svg-icons/feather/CalendarIcon';
import TruckIcon from '@svg-icons/feather/TruckIcon';

const ProductTradeDeliveryList = (props) => {
    return (
        <List className="product-trade__list">
            <ListItem className="product-trade__list-item">
                <ListItemIcon>
                    <TruckIcon size="medium" />
                </ListItemIcon>
                <ListItemText>
                    <strong>
                        <span className="u-text-decoration-underline">Delivery time</span> is 1-3
                        working day (s)
                    </strong>
                </ListItemText>
            </ListItem>
            <ListItem className="product-trade__list-item">
                <ListItemIcon>
                    <CheckIcon size="medium" />
                </ListItemIcon>
                <ListItemText>14 days free returns</ListItemText>
            </ListItem>
            <ListItem className="product-trade__list-item">
                <ListItemIcon>
                    <CheckIcon size="medium" />
                </ListItemIcon>
                <ListItemText>Free shipping</ListItemText>
            </ListItem>
        </List>
    );
};

ProductTradeDeliveryList.propTypes = {};

export default ProductTradeDeliveryList;
