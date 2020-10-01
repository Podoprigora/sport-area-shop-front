import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Carousel from '@ui/Carousel';
import ImageEasyZoom from '@ui/ImageEasyZoom';
import ProductGalleryThumbnailList from './ProductGalleryThumbnailList';

const images = [
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey.jpg',
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey2.jpg',
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey3.jpg'
];

const thumbnailImages = [
    'remote/images/product/thumbnails/naketano-family-biz-hooded-jacket-women-grey.jpg',
    'remote/images/product/thumbnails/naketano-family-biz-hooded-jacket-women-grey2.jpg',
    'remote/images/product/thumbnails/naketano-family-biz-hooded-jacket-women-grey3.jpg'
];

const ProductGallery = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = useCallback((ev, value) => {
        setActiveIndex(value);
    }, []);

    const items = images.map((item, index) => {
        return (
            <ImageEasyZoom key={index} className="product-gallery__picture">
                <img src={item} alt="" />
            </ImageEasyZoom>
        );
    });

    const thumbnails = thumbnailImages.map((item, index) => {
        return <img key={index} src={item} alt="" />;
    });

    return (
        <div className="product-gallery">
            <Carousel
                className="product-gallery__carousel"
                control="always"
                indicators={false}
                activeIndex={activeIndex}
                onChange={handleChange}
            >
                {items}
            </Carousel>
            <ProductGalleryThumbnailList activeIndex={activeIndex} onChange={handleChange}>
                {thumbnails}
            </ProductGalleryThumbnailList>
        </div>
    );
};

ProductGallery.propTypes = {};

export default ProductGallery;
