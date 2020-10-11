import React from 'react';
import PropTypes from 'prop-types';

import Empty from '@ui/Empty';
import MessageSquareIcon from '@svg-icons/feather/MessageSquareIcon';

const ProductCommentsList = (props) => {
    const { items = [], ...other } = props;

    const shouldDisplayItems = items.length > 0;

    return (
        <div {...other}>
            {!shouldDisplayItems ? (
                <Empty icon={<MessageSquareIcon />}>There are no comments.</Empty>
            ) : (
                <div>ProductCommentsList</div>
            )}
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
