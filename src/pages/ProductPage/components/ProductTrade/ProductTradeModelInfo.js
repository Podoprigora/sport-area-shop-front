import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import List, { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import InfoIcon from '@ui/svg-icons/feather/InfoIcon';

const ProductTradeModelInfo = (props) => {
    const { className } = props;

    return (
        <List className={classNames('product-trade__list', className)}>
            <ListItem className="product-trade__list-item ">
                <ListItemIcon>
                    <InfoIcon size="medium" />
                </ListItemIcon>
                <ListItemText>
                    The model is <strong>175 cm</strong> tall and is wearing a size{' '}
                    <strong>S</strong>.
                </ListItemText>
            </ListItem>
        </List>
    );
};

ProductTradeModelInfo.propTypes = {
    className: PropTypes.string
};

export default ProductTradeModelInfo;
