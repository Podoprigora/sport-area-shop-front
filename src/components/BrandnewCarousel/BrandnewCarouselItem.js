import React, { memo } from 'react';
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

const BrandnewCarouselItem = (props) => {
    const { id, name, brand, image, price, currency } = props;

    return (
        <Product className="products-carousel__item">
            <ProductActionAddToWishlist id={id} />
            <ProductFlag isNew />

            <ProductLink>
                <ProductImage image={image} name={name} />
            </ProductLink>

            <ProductLink>
                <ProductTitle brand={brand} name={name} />
            </ProductLink>

            <ProductPrice price={price} currency={currency} />
        </Product>
    );
};

BrandnewCarouselItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    currency: PropTypes.string
};

export default memo(BrandnewCarouselItem);
