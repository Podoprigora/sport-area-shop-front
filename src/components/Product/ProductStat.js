import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@ui/Rating';
import MessageSquareIcon from '@svg-icons/feather/MessageSquareIcon';

const ProductStat = (props) => {
    const { rating, comments } = props;

    return (
        <div className="product__stat">
            <Rating className="product__rating" defaultValue={rating} size="small" readOnly />
            <div className="product__comments">
                <MessageSquareIcon className="product__comments-icon" size="small" />
                {comments}
            </div>
        </div>
    );
};

ProductStat.propTypes = {
    rating: PropTypes.number,
    comments: PropTypes.number
};

export default ProductStat;
