import React from 'react';
import PropTypes from 'prop-types';

import {
    Product,
    ProductActionAddToWishlist,
    ProductFlag,
    ProductImage,
    ProductLink,
    ProductPrice,
    ProductTitle
} from '@components/Product';
import Calc from '@utils/Calc';

const TopsellerCarouselItem = (props) => {
    const { id, name, brand, image, price, oldPrice, currency } = props;
    const discount = Calc.discountPersent(oldPrice, price);

    return (
        <Product className="products-carousel__item ">
            <ProductActionAddToWishlist id={id} />
            <ProductFlag discount={discount} />

            <ProductLink>
                <ProductImage image={image} name={name} />
            </ProductLink>

            <ProductLink>
                <ProductTitle brand={brand} name={name} />
            </ProductLink>

            <ProductPrice price={price} oldPrice={oldPrice} currency={currency} />
        </Product>
    );
};

TopsellerCarouselItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    oldPrice: PropTypes.number,
    currency: PropTypes.string
};

export default TopsellerCarouselItem;
