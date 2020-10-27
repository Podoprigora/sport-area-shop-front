import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CellList, { CellListItem } from '@ui/CellList';
import HelperText from '@ui/HelperText';
import { useProductPageActions, useProductPageState } from '@pages/ProductPage/context';

const ProductTradeSizes = (props) => {
    const { className } = props;

    const { sizes = [], selectedSizeId } = useProductPageState();
    const { selectSize } = useProductPageActions();

    return useMemo(() => {
        if (!sizes.length) {
            return null;
        }

        return (
            <div className={classNames('product-trade__sizes', className)}>
                <span className="product-trade__sizes-label">Select a size:</span>

                <CellList className="product-trade__sizes-list">
                    {sizes.map((size) => {
                        const { id, name, outOfStock = false } = size || {};

                        const handleClick = (ev) => {
                            if (selectSize) {
                                selectSize(id);
                            }
                        };

                        if (!id || !name) {
                            return null;
                        }

                        return (
                            <CellListItem
                                key={id}
                                selected={id === selectedSizeId}
                                disabled={outOfStock}
                                painted
                                className="product-trade__sizes-item"
                                onClick={handleClick}
                            >
                                {name}
                            </CellListItem>
                        );
                    })}
                </CellList>

                {/* <HelperText error>Please select an available size.</HelperText> */}
            </div>
        );
    }, [sizes, selectedSizeId, className, selectSize]);
};

ProductTradeSizes.propTypes = {
    className: PropTypes.string
};

export default ProductTradeSizes;
