import React from 'react';
import PropTypes from 'prop-types';

import commentsData from '@remote/json/product-comments';

import Comment from '@components/Comment';
import ProductCommentRepliesList from './ProductCommentRepliesList';

const repliesData = commentsData.filter((item) => item.parentId > 0);

const ProductCommentsListItem = (props) => {
    const { id } = props;

    const shouldDisplayReplies = id === 1001;

    return (
        <div className="list__item product-comments-list__item">
            <Comment {...props} />

            {shouldDisplayReplies && <ProductCommentRepliesList items={repliesData} />}
        </div>
    );
};

ProductCommentsListItem.propTypes = {
    id: PropTypes.number.isRequired
};

export default ProductCommentsListItem;
