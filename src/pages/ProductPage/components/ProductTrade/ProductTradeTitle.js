import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ProductStat } from '@components/Product';

const ProductTradeTitle = (props) => {
    const { className } = props;

    return (
        <div className={classNames('product-trade__title', className)}>
            <h3 className="product-trade__brand product__brand">NAKETANO</h3>
            <h4 className="product-trade__name product__name">
                Family Biz - Hooded Jacket for Women - Grey
            </h4>
            <ProductStat className="product-trade__stat" rating={5} comments={10} />
        </div>
    );
};

ProductTradeTitle.propTypes = {
    className: PropTypes.string
};

export default ProductTradeTitle;
