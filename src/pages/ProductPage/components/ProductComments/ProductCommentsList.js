import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useEventCallback from '@ui/hooks/useEventCallback';
import Empty from '@ui/Empty';
import MessageSquareIcon from '@svg-icons/feather/MessageSquareIcon';
import useMountedRef from '@ui/hooks/useMountedRef';

import { userIdSelector } from '@store/identity';
import {
    useProductPageState,
    useProductPageSelectors,
    useProductPageActions
} from '@pages/ProductPage/context';
import ProductCommentsListItem from './ProductCommentsListItem';
import ProductCommentsListLoadMore from './ProductCommentsListLoadMore';

const ProductCommentsList = (props) => {
    const [loading, setLoading] = useState(false);

    const state = useProductPageState();
    const { comments, commentsCount } = useProductPageSelectors(state);
    const {
        toggleCommentReplies,
        asyncLikeComment,
        asyncAddCommentReply,
        asyncFetchMoreComments
    } = useProductPageActions();
    const identityUserId = useSelector(userIdSelector);
    const { id: productId } = state;

    const isMoutedRef = useMountedRef();

    const shouldDisplayItems = comments.length > 0;
    const shouldDisplayLoadMore = commentsCount > comments.length;

    const handleLoadingMoreClick = useCallback(
        async (ev) => {
            if (!asyncFetchMoreComments) {
                return;
            }

            try {
                setLoading(true);
                await asyncFetchMoreComments();
            } catch (e) {
                console.error(e);
            } finally {
                if (isMoutedRef.current) {
                    setLoading(false);
                }
            }
        },
        [asyncFetchMoreComments, isMoutedRef]
    );

    const handleLike = useEventCallback((ev, id) => {
        if (asyncLikeComment && identityUserId) {
            return asyncLikeComment(productId, id);
        }

        return undefined;
    });

    const handleAddReply = useEventCallback((reply) => {
        const payload = { ...reply, productId };

        if (asyncAddCommentReply) {
            return asyncAddCommentReply(payload);
        }

        return undefined;
    });

    return (
        <div className="paper paper--outlined list product-comments-list">
            {!shouldDisplayItems ? (
                <Empty icon={<MessageSquareIcon />}>There are no comments.</Empty>
            ) : (
                comments.map((item) => {
                    const { id, userId } = item || {};
                    const shouldDisableLike = identityUserId && identityUserId === userId;

                    return (
                        <ProductCommentsListItem
                            key={id}
                            {...item}
                            disableLike={shouldDisableLike}
                            onLike={handleLike}
                            onAddReply={handleAddReply}
                        />
                    );
                })
            )}
            {shouldDisplayLoadMore && (
                <ProductCommentsListLoadMore loading={loading} onClick={handleLoadingMoreClick} />
            )}
        </div>
    );
};

export default ProductCommentsList;
