import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CellList from '@ui/CellList';
import ProductTradeSizeItem from './ProductTradeSizeItem';

const ProductTradeSizesList = (props) => {
    const { items = [], selectedId, onSelect } = props;

    return (
        <CellList className="product-trade__sizes-list">
            {items.map((item) => {
                const { id } = item;

                return (
                    <ProductTradeSizeItem
                        key={id}
                        {...item}
                        selected={selectedId === id}
                        onSelect={onSelect}
                    />
                );
            })}
        </CellList>
    );
};

ProductTradeSizesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    ),
    selectedId: PropTypes.number,
    onSelect: PropTypes.func
};

export default memo(ProductTradeSizesList);
