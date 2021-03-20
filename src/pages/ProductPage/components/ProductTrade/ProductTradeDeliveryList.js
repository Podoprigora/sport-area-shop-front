import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@ui/List';
import { CheckIcon, TruckIcon } from '@ui/svg-icons/feather';

const ProductTradeDeliveryList = () => {
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

export default ProductTradeDeliveryList;
