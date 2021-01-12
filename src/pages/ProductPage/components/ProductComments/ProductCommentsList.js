import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useNotification from '@ui/Notification';
import useEventCallback from '@ui/hooks/useEventCallback';
import Empty from '@ui/Empty';
import MessageSquareIcon from '@ui/svg-icons/feather/MessageSquareIcon';
import useMountedRef from '@ui/hooks/useMountedRef';

import { userIdSelector } from '@store/identity';
import {
    useProductPageState,
    useProductPageSelectors,
    useProductPageActions
} from '@pages/ProductPage/context';
import ProductCommentsListItem from './ProductCommentsListItem';
import ProductCommentsListLoadMore from './ProductCommentsListLoadMore';

const ProductCommentsList = () => {
    const [loading, setLoading] = useState(false);

    const { showAlert } = useNotification();

    const state = useProductPageState();
    const { comments, commentsCount } = useProductPageSelectors(state);
    const {
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
                showAlert({
                    type: 'error',
                    frame: true,
                    message: "We can't fetch comments, server error occurred!"
                });
            } finally {
                if (isMoutedRef.current) {
                    setLoading(false);
                }
            }
        },
        [asyncFetchMoreComments, isMoutedRef, showAlert]
    );

    const handleLike = useEventCallback((ev, id) => {
        if (asyncLikeComment && identityUserId) {
            return asyncLikeComment(productId, id).catch((e) => {
                showAlert({
                    type: 'error',
                    frame: true,
                    message: "We can't complete action, server error occurred!"
                });
            });
        }

        return undefined;
    });

    const handleAddReply = useEventCallback((reply) => {
        const payload = { ...reply, productId };

        if (asyncAddCommentReply) {
            return asyncAddCommentReply(payload).catch((e) => {
                showAlert({
                    type: 'error',
                    frame: true,
                    message: "We can't add your reply, server error occurred!"
                });
            });
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
