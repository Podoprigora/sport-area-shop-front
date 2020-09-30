import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from '@ui/Carousel';

const images = [
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey.jpg',
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey2.jpg',
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey3.jpg'
];

const ProductGallery = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = useCallback((ev, value) => {
        setActiveIndex(value);
    }, []);

    const items = images.map((item, index) => {
        return <img key={index} src={item} alt="" className="product-gallery__img" />;
    });

    return (
        <Carousel
            className="product-gallery"
            control="hover"
            // autoPlay
            // interval={2000}
            // activeIndex={activeIndex}
            // onChange={handleChange}
        >
            {items}
        </Carousel>
    );
};

ProductGallery.propTypes = {};

export default ProductGallery;
