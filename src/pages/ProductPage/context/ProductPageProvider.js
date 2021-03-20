import React, { useCallback, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import { useEventCallback } from '@ui/utils';
import ProductsService from '@services/ProductsService';
import { ProductPageActionsContext, ProductPageContext } from './ProductPageContext';
import {
    productPageDefaultState,
    productPageReducer,
    RECEIVE_PRODUCT,
    REQUEST_PRODUCT,
    TOGGLE_LOADING,
    SELECT_SIZE,
    RECEIVE_MORE_COMMENTS,
    RECEIVE_COMMENT_REPLIES,
    LIKE_COMMENT,
    ADD_COMMENT_REPLY,
    TOGGLE_COMMENT_REPLIES,
    SELECT_COMMENTS_SORT,
    RECEIVE_COMMENTS,
    REQUEST_COMMENTS,
    SET_ERROR,
    RECEIVE_COMMENTS_ERROR
} from './productPageReducers';
import ProductPageContextLog from './ProductPageContextLog';
import { useProductPageSelectors } from './productPageSelectors';

const ProductPageProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(productPageReducer, productPageDefaultState);
    const {
        commentsItemsPerPage,
        selectedCommentsPage,
        getCommentById,
        commentsFetchProps
    } = useProductPageSelectors(state);

    const toggleLoading = useEventCallback((toggle = false) => {
        dispatch({ type: TOGGLE_LOADING, payload: { toggle } });
    });

    const selectSize = useEventCallback((id) => {
        dispatch({ type: SELECT_SIZE, payload: { id } });
    });

    const setError = useEventCallback((key, value) => {
        dispatch({ type: SET_ERROR, payload: { key, value } });
    });

    const selectCommentsSort = useEventCallback((value) => {
        dispatch({ type: SELECT_COMMENTS_SORT, payload: { value } });
    });

    const toggleCommentReplies = useEventCallback((id, toggle) => {
        dispatch({ type: TOGGLE_COMMENT_REPLIES, payload: { id, toggle } });
    });

    const asyncFetchProduct = useEventCallback((id) => {
        if (!id) {
            return undefined;
        }

        dispatch({ type: REQUEST_PRODUCT });

        return ProductsService.fetchOne(id)
            .then((response) => {
                dispatch({ type: RECEIVE_PRODUCT, payload: response });
            })
            .catch((e) => {
                dispatch({ type: TOGGLE_LOADING, payload: { toggle: false } });
                throw e;
            });
    });

    const asyncRefetchComments = useCallback(() => {
        const productId = state?.id;
        const start = 0;
        const { itemsPerPage: limit, sortBy, shouldRefetch, loading } = commentsFetchProps;

        if (productId && shouldRefetch && !loading) {
            dispatch({ type: REQUEST_COMMENTS });

            return ProductsService.fetchProductComments({ productId, start, limit, sortBy })
                .then((response) => {
                    dispatch({ type: RECEIVE_COMMENTS, payload: { items: response } });
                })
                .catch((e) => {
                    dispatch({ type: RECEIVE_COMMENTS_ERROR });
                    throw e;
                });
        }

        return undefined;
    }, [commentsFetchProps, state]);

    const asyncFetchMoreComments = useEventCallback(() => {
        const start = selectedCommentsPage * commentsItemsPerPage;
        const limit = commentsItemsPerPage;

        return ProductsService.fetchProductComments({ start, limit }).then((response) => {
            dispatch({ type: RECEIVE_MORE_COMMENTS, payload: { items: response } });
        });
    });

    const asyncFetchCommentReplies = useEventCallback((id) => {
        const comment = getCommentById(id);

        if (!comment) {
            return null;
        }

        const { repliesCount = 0, replies = [] } = comment;

        if (repliesCount > replies.length) {
            return ProductsService.fetchProductComments({ parentId: id }).then((response) => {
                dispatch({ type: RECEIVE_COMMENT_REPLIES, payload: { id, items: response } });
            });
        }

        return undefined;
    });

    const asyncLikeComment = useEventCallback((id, commentId) => {
        return ProductsService.likeProductComment({ productId: id, commentId }).then(() => {
            dispatch({ type: LIKE_COMMENT, payload: { id: commentId } });
        });
    });

    const asyncAddCommentReply = useEventCallback((params) => {
        return ProductsService.addProductCommentReply(params).then((response) => {
            dispatch({ type: ADD_COMMENT_REPLY, payload: response });
        });
    });

    const asyncSaveProductComment = useEventCallback((values) => {
        const productId = state?.id;

        if (!productId) {
            return null;
        }

        const savedData = { productId, ...values };

        return ProductsService.saveProductComment(savedData);
    });

    const actions = useMemo(() => {
        return {
            toggleLoading,
            selectSize,
            setError,
            selectCommentsSort,
            toggleCommentReplies,
            asyncFetchProduct,
            asyncRefetchComments,
            asyncLikeComment,
            asyncFetchMoreComments,
            asyncFetchCommentReplies,
            asyncAddCommentReply,
            asyncSaveProductComment
        };
    }, [
        toggleLoading,
        selectSize,
        setError,
        selectCommentsSort,
        toggleCommentReplies,
        asyncFetchProduct,
        asyncRefetchComments,
        asyncLikeComment,
        asyncFetchMoreComments,
        asyncFetchCommentReplies,
        asyncAddCommentReply,
        asyncSaveProductComment
    ]);

    return (
        <ProductPageContext.Provider value={state}>
            <ProductPageActionsContext.Provider value={actions}>
                <ProductPageContextLog />
                {children}
            </ProductPageActionsContext.Provider>
        </ProductPageContext.Provider>
    );
};

ProductPageProvider.propTypes = {
    children: PropTypes.node
};

export default ProductPageProvider;
