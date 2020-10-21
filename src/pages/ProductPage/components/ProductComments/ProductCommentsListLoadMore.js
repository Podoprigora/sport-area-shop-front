import React from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import ChevronDownIcon from '@svg-icons/feather/ChevronDownIcon';

const ProductCommentsListLoadMore = (props) => {
    return (
        <div className="product-comments-list__load-more">
            <Button primary link icon={ChevronDownIcon}>
                Show more comments
            </Button>
        </div>
    );
};

ProductCommentsListLoadMore.propTypes = {};

export default ProductCommentsListLoadMore;
