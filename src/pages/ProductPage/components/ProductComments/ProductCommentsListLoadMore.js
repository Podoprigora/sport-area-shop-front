import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import ChevronDownIcon from '@svg-icons/feather/ChevronDownIcon';
import useEventCallback from '@ui/hooks/useEventCallback';
import CircularProgress from '@ui/CircularProgress';

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
