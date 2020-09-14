import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Calc from '@utils/Calc';
import {
    Product,
    ProductFlag,
    ProductLink,
    ProductImage,
    ProductTitle,
    ProductStat,
    ProductPrice
} from '@components/Product';
import ProductActionCheckbox from '@components/Product/ProductActionCheckbox';

const WishlistGridItem = (props) => {
    const {
        id,
        name,
        brand,
        image,
        price,
        oldPrice,
        currency,
        isNew,
        rating = 0,
        comments = 0
    } = props;

    const discount = Calc.discountPersent(oldPrice, price);

    return (
        <Product className="catalog-grid__item">
            <div className="catalog-grid__item-inner">
                <ProductActionCheckbox />
                <ProductFlag isNew={isNew} discount={discount} />

                <ProductLink>
                    <ProductImage image={image} name={name} />
                </ProductLink>

                <ProductLink>
                    <ProductTitle brand={brand} name={name} />
                </ProductLink>

                <ProductLink>
                    <ProductStat rating={rating} comments={comments} />
                </ProductLink>

                <ProductPrice price={price} oldPrice={oldPrice} currency={currency} />
            </div>
        </Product>
    );
};

WishlistGridItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    oldPrice: PropTypes.number,
    currency: PropTypes.string,
    isNew: PropTypes.bool,
    rating: PropTypes.number,
    comments: PropTypes.number
};

export default memo(WishlistGridItem);
