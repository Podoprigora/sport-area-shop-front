import React from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import SortIcon from '@svg-icons/material/SortIcon';

const ProductCommentsTbar = (props) => {
    return (
        <div className="tbar">
            <Button plain arrow icon={SortIcon} disabled>
                Sort By
            </Button>
            <Button primary style={{ marginLeft: 'auto' }}>
                Add Comment
            </Button>
        </div>
    );
};

ProductCommentsTbar.propTypes = {};

export default ProductCommentsTbar;
