import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import ChevronUpIcon from '@svg-icons/feather/ChevronUpIcon';
import CircularProgress from '@ui/CircularProgress';
import useMountedRef from '@ui/hooks/useMountedRef';
import ChevronDownIcon from '@svg-icons/feather/ChevronDownIcon';
import Button from '@ui/Button';
import {
    useProductPageActions,
    useProductPageSelectors,
    useProductPageState
} from '@pages/ProductPage/context';
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
    const { id, count, expanded } = props;

    const state = useProductPageState();
    const { getCommentRepliesById } = useProductPageSelectors(state);
    const { asyncFetchCommentReplies, toggleCommentReplies } = useProductPageActions();

    const [loading, setLoading] = useState(false);

    const isMountedRef = useMountedRef();

    const items = useMemo(() => {
        return getCommentRepliesById(id);
    }, [getCommentRepliesById, id]);

    const handleToggleBtnClick = useEventCallback((ev) => {
        toggleCommentReplies(id);
    });

    const fetchReplies = useCallback(async () => {
        if (!asyncFetchCommentReplies) {
            return;
        }

        try {
            setLoading(true);
            await asyncFetchCommentReplies(id);

            if (isMountedRef.current) {
                setLoading(false);
            }
        } catch (e) {
            console.error(e);

            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [id, asyncFetchCommentReplies, isMountedRef]);

    useEffect(() => {
        if (expanded) {
            fetchReplies();
        }
    }, [expanded, fetchReplies]);

    if (!id) {
        return null;
    }

    return (
        <>
            <Button
                primary
                link
                loading={loading}
                loadingComponent={<CircularProgress />}
                icon={expanded ? ChevronUpIcon : ChevronDownIcon}
                className="product-comments-list__show-replies-btn"
                onClick={handleToggleBtnClick}
            >
                {expanded && !loading ? 'Hide' : 'Show'} {getRepliesCountText(count)}
            </Button>
            {expanded && items.length > 0 && (
                <div className="product-comments-list__replies-list">
                    {items.map((item) => {
                        return <ProductCommentRepliesListItem key={item?.id} {...item} />;
                    })}
                </div>
            )}
        </>
    );
};

ProductCommentRepliesList.propTypes = {
    id: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    expanded: PropTypes.bool
};

export default memo(ProductCommentRepliesList);
