import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Comment from '@components/Comment';
import ProductCommentRepliesList from './ProductCommentRepliesList';

const ProductCommentsListItem = (props) => {
    const { id, repliesCount, expandedReplies } = props;

    return (
        <div className="list__item product-comments-list__item">
            <Comment {...props} />

            {!!repliesCount && (
                <ProductCommentRepliesList
                    id={id}
                    count={repliesCount}
                    expanded={expandedReplies}
                />
            )}
        </div>
    );
};

ProductCommentsListItem.propTypes = {
    id: PropTypes.number.isRequired,
    repliesCount: PropTypes.number,
    expandedReplies: PropTypes.bool
};

export default memo(ProductCommentsListItem);
