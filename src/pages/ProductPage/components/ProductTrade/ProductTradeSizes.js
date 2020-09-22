import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CellList, { CellListItem } from '@ui/CellList';
import HelperText from '@ui/HelperText';

const sizes = ['XS', 'S', 'L', 'XL'];

const ProductTradeSizes = (props) => {
    const { className } = props;

    return (
        <div className={classNames('product-trade__sizes', className)}>
            <span className="product-trade__sizes-label">Select a size:</span>

            <CellList className="product-trade__sizes-list">
                {sizes.map((item, index) => {
                    return (
                        <CellListItem
                            key={index}
                            selected={index === 1}
                            disabled={index === sizes.length - 1}
                            painted
                            className="product-trade__sizes-item "
                        >
                            {item}
                        </CellListItem>
                    );
                })}
            </CellList>

            {/* <HelperText error>Please select an available size.</HelperText> */}
        </div>
    );
};

ProductTradeSizes.propTypes = {
    className: PropTypes.string
};

export default ProductTradeSizes;
