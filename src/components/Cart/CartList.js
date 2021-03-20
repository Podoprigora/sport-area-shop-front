import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { List } from '@ui/List';
import { Empty } from '@ui/Empty';
import { Divider } from '@ui/Divider';
import CartListItem from './CartListItem';

const CartList = (props) => {
    const { items = [], ...other } = props;

    if (items.length === 0) {
        return <Empty>Your Cart is empty.</Empty>;
    }

    return (
        <List className="cart__list cart-window__list">
            {items.map((item, index) => {
                const { id } = item;

                if (!id) {
                    return null;
                }

                const shouldDisplayDivider = index < items.length - 1;

                return (
                    <React.Fragment key={id}>
                        <CartListItem {...item} {...other} />
                        {shouldDisplayDivider && <Divider />}
                    </React.Fragment>
                );
            })}
        </List>
    );
};

CartList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired }))
};

export default memo(CartList);
