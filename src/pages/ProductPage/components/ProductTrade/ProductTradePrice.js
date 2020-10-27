import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useProductPageState } from '@pages/ProductPage/context';
import Format from '@utils/Format';
import Calc from '@utils/Calc';

const ProductTradePrice = (props) => {
    const { className } = props;

    const { price, oldPrice, currency } = useProductPageState();

    return useMemo(() => {
        if (!price) {
            return null;
        }

        const discount = Calc.discountPersent(oldPrice, price);

        return (
            <div className={classNames('product-trade__prices', className)}>
                <div className="product-trade__price  product__price product__price--new">
                    {Format.price(price, currency)}
                </div>
                {oldPrice > 0 && (
                    <div className="product-trade__price-discount">
                        {discount > 0 && (
                            <div className="product-trade__discount">Save {discount}%</div>
                        )}
                        <div className="product__price product__price--old">
                            {Format.price(oldPrice, currency)}
                        </div>
                    </div>
                )}
                <div className="product-trade__price-note">
                    including VAT, plus shipping costs, if applicable
                </div>
            </div>
        );
    }, [price, oldPrice, currency, className]);
};

ProductTradePrice.propTypes = {
    className: PropTypes.string
};

export default ProductTradePrice;
