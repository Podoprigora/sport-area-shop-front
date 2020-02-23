import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Skeleton from '@components/Skeleton';

const ProductSkeleton = React.forwardRef(function ProductSkeleton(props, ref) {
    const { className, ...other } = props;

    return (
        <div className={classNames('product', className)} ref={ref} {...other}>
            <div className="product__img-container">
                <Skeleton type="circle" size="large" className="product__img" />
            </div>
            <h4 className="product__title">
                <Skeleton
                    type="text"
                    size="medium"
                    style={{ width: '80%', marginBottom: '1.4rem' }}
                />
                <Skeleton type="text" size="small" style={{ marginBottom: '.8rem' }} />
                <Skeleton type="text" size="small" style={{ width: '50%' }} />
            </h4>
            <div className="product__price">
                <Skeleton type="text" size="large" style={{ width: '40%' }} />
            </div>
        </div>
    );
});

ProductSkeleton.propTypes = {
    className: PropTypes.string
};

export default ProductSkeleton;
