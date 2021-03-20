import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { useEventCallback } from '@ui/utils';
import { Button } from '@ui/Button';
import { CircularProgress } from '@ui/CircularProgress';
import { ChevronDownIcon } from '@ui/svg-icons/feather';

const ProductCommentsListLoadMore = (props) => {
    const { loading, onClick } = props;

    const handleClick = useEventCallback((ev) => {
        if (onClick) {
            onClick(ev);
        }
    });

    return (
        <div className="product-comments-list__load-more">
            <Button
                primary
                link
                icon={ChevronDownIcon}
                loading={loading}
                loadingComponent={<CircularProgress />}
                onClick={handleClick}
            >
                Show more comments
            </Button>
        </div>
    );
};

ProductCommentsListLoadMore.propTypes = {
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(ProductCommentsListLoadMore);
