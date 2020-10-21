import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import useEventCallback from '@ui/hooks/useEventCallback';
import ChevronUpIcon from '@svg-icons/feather/ChevronUpIcon';
import ChevronDownIcon from '@svg-icons/feather/ChevronDownIcon';
import ProductCommentRepliesListItem from './ProductCommentReplyListItem';

function getRepliesCountText(count = 0) {
    if (!count) {
        return '';
    }

    let result = 'reply';

    if (count > 1) {
        result = `${count} replies`;
    }

    return result;
}

const ProductCommentRepliesList = (props) => {
    const { items = [] } = props;
    const [expanded, setExpanded] = useState(false);

    const handleToggleBtnClick = useEventCallback((ev) => {
        setExpanded((prevState) => !prevState);
    });

    if (!items.length) {
        return null;
    }

    return (
        <>
            <Button
                primary
                link
                icon={expanded ? ChevronUpIcon : ChevronDownIcon}
                className="product-comments-list__show-replies-btn"
                onClick={handleToggleBtnClick}
            >
                {expanded ? 'Hide' : 'Show'} {getRepliesCountText(items.length)}
            </Button>
            {expanded && (
                <div className="product-comments-list__replies-list">
                    {items.map((item) => {
                        const { id } = item;

                        return <ProductCommentRepliesListItem key={id} {...item} />;
                    })}
                </div>
            )}
        </>
    );
};

ProductCommentRepliesList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    )
};

export default ProductCommentRepliesList;
