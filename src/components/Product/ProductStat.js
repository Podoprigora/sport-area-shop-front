import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Rating } from '@ui/Rating';
import { MessageSquareIcon } from '@ui/svg-icons/feather';

const ProductStat = (props) => {
    const { rating, comments, size = 'small', className } = props;

    return (
        <div className={classNames('product__stat', className)}>
            <Rating className="product__rating" value={rating} size={size} readOnly />
            <div className="product__comments">
                <MessageSquareIcon className="product__comments-icon" size={size} />
                {comments}
            </div>
        </div>
    );
};

ProductStat.propTypes = {
    rating: PropTypes.number,
    comments: PropTypes.number,
    size: PropTypes.string,
    className: PropTypes.string
};

export default ProductStat;
