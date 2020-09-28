import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '@ui/Carousel';

const images = [
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey.jpg',
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey2.jpg',
    'remote/images/product/naketano-family-biz-hooded-jacket-women-grey3.jpg'
];

const ProductGallery = (props) => {
    const items = images.map((item, index) => {
        return <img key={index} src={item} alt="" className="product-carousel__img" />;
    });

    // return null;

    // return (
    //     <div className="product-carousel">
    //         <div className="product-carousel__body">
    //             <div className="product-carousel__list">
    //                 {images.map((item, index) => {
    //                     return (
    //                         <div key={index} className="product-carousel__item">
    //                             <img src={item} alt="" className="product-carousel__img" />
    //                         </div>
    //                     );
    //                 })}
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="product-carousel-wrap">
            <Carousel className="product-carousel" control="always">
                {items}
            </Carousel>
        </div>
    );
};

ProductGallery.propTypes = {};

export default ProductGallery;
