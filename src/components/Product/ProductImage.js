import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = (props) => {
    const { image, name } = props;

    return (
        <div className="product__img-container">
            <img src={image} alt={name} className="product__img" />
        </div>
    );
};

ProductImage.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string
};

export default ProductImage;
