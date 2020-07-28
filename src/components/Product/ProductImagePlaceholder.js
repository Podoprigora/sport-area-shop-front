import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ImagePlaceholder from '@resources/images/image-placeholder.svg';

const ProductImagePlaceholder = (props) => {
    const { className, ...other } = props;

    return (
        <img
            src={ImagePlaceholder}
            alt="Product placehoder"
            className={classNames('product__img product__img-pacehoder', className)}
            {...other}
        />
    );
};

ProductImagePlaceholder.propTypes = {
    className: PropTypes.string
};

export default ProductImagePlaceholder;
