import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Carousel } from '@ui/Carousel';
import { ImageEasyZoom } from '@ui/ImageEasyZoom';

import { useProductPageState } from '@pages/ProductPage/context';
import ProductGalleryThumbnailList from './ProductGalleryThumbnailList';

const ProductGallery = (props) => {
    const { animationTimeout = 1000 } = props;

    const { images, thumbnails: thumbnailImages } = useProductPageState();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = useCallback((ev, value) => {
        setActiveIndex(value);
    }, []);

    return useMemo(() => {
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
            <div className="product-gallery paper paper--outlined">
                <Carousel
                    className="product-gallery__carousel"
                    control="always"
                    indicators={false}
                    animationTimeout={animationTimeout}
                    activeIndex={activeIndex}
                    onChange={handleChange}
                >
                    {items}
                </Carousel>
                <ProductGalleryThumbnailList
                    activeIndex={activeIndex}
                    animationTimeout={animationTimeout}
                    onChange={handleChange}
                >
                    {thumbnails}
                </ProductGalleryThumbnailList>
            </div>
        );
    }, [images, thumbnailImages, animationTimeout, activeIndex, handleChange]);
};

ProductGallery.propTypes = {
    animationTimeout: PropTypes.number
};

export default ProductGallery;
