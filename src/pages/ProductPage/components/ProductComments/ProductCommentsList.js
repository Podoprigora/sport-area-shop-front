import React from 'react';
import PropTypes from 'prop-types';

import Divider from '@ui/Divider';
import Empty from '@ui/Empty';
import MessageSquareIcon from '@svg-icons/feather/MessageSquareIcon';

import ProductCommentsListItem from './ProductCommentsListItem';
import ProductCommentsListLoadMore from './ProductCommentsListLoadMore';

const ProductCommentsList = (props) => {
    const { items = [], ...other } = props;

    const shouldDisplayItems = items.length > 0;
    const shouldDisplayLoadMore = true;

    return (
        <div className="paper paper--outlined list product-comments-list" {...other}>
            {!shouldDisplayItems ? (
                <Empty icon={<MessageSquareIcon />}>There are no comments.</Empty>
            ) : (
                items.map((item, index) => {
                    const { id } = item;

                    return <ProductCommentsListItem key={id} {...item} />;
                })
            )}
            {shouldDisplayLoadMore && <ProductCommentsListLoadMore />}
        </div>
    );
};

ProductCommentsList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    )
};

export default ProductCommentsList;
