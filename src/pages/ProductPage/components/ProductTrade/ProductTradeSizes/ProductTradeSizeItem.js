import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CellListItem } from '@ui/CellList';

const ProductTradeSizeItem = (props) => {
    const { id, name, outOfStock, selected, onSelect } = props;

    const handleClick = useCallback(
        (ev) => {
            if (onSelect) {
                onSelect(ev, id);
            }
        },
        [id, onSelect]
    );

    if (!id || !name) {
        return null;
    }

    return (
        <CellListItem
            key={id}
            selected={selected}
            disabled={outOfStock}
            painted
            className="product-trade__sizes-item"
            onClick={handleClick}
        >
            {name}
        </CellListItem>
    );
};

ProductTradeSizeItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    outOfStock: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func
};

export default memo(ProductTradeSizeItem);
