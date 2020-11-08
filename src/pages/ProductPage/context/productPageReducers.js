import produce, { current } from 'immer';
import reducerFactory from '@ui/utils/reducerFactory';

const defaultFeaturesState = {
    items: []
};

const defaultCommentState = {
    id: null,
    parentId: null,
    userId: null,
    username: '',
    text: '',
    date: null,
    rating: 0,
    likes: 0,
    userLiked: 0,
    repliesCount: 0,
    expandedReplies: false,
    replies: []
};

export const defaultCommentsState = {
    loading: false,
    error: null,
    shouldRefetch: false,
    allIds: [],
    itemsById: {},
    selectedPages: [1],
    sortBy: 'newest',
    total: 0,
    itemsPerPage: 5,
    totalRating: 0
};

export const productPageDefaultState = {
    loading: true,
    id: null,
    brand: '',
    name: '',
    price: null,
    oldPrice: null,
    currency: '',
    sizes: [],
    selectedSizeId: null,
    images: [],
    thumbnails: [],
    features: defaultFeaturesState,
    comments: defaultCommentsState,
    errorsByKey: {}
};

const productReducer = produce((draft, payload) => {
    Object.assign(draft, payload);
});

const loadingReducer = produce((draft, loading = false) => {
    draft.loading = loading;
});

const selectedSizeIdReducer = produce((draft, id) => {
    draft.selectedSizeId = id;
});

const errorsByKeyReducer = produce((draft, payload) => {
    const { key, value } = payload;

    if (value) {
        draft.errorsByKey[key] = value;
    } else if (draft.errorsByKey[key]) {
        delete draft.errorsByKey[key];
    }
});

const commentsReducer = produce((draft, payload, append = false) => {
    const { items = [], ...otherPayload } = payload;
    const commentsDraft = draft.comments;

    Object.assign(commentsDraft, otherPayload);

    if (!append) {
        commentsDraft.itemsById = {};
        commentsDraft.allIds = [];
    }

    const commentsItemsByIdDraft = commentsDraft.itemsById;
    const commentsAllIdsDraft = commentsDraft.allIds;

    items.forEach((item) => {
        const { id } = item;

        if (id) {
            if (commentsItemsByIdDraft) {
                commentsItemsByIdDraft[id] = { ...defaultCommentState, ...item };
            }

            if (commentsAllIdsDraft && commentsAllIdsDraft.indexOf(id) === -1) {
                commentsAllIdsDraft.push(id);
            }
        }
    });
});

const commentsNextPageReducer = produce((draft) => {
    const commentsSelectedPagesDraft = draft.comments.selectedPages;
    const lastPage = commentsSelectedPagesDraft[commentsSelectedPagesDraft.length - 1];

    commentsSelectedPagesDraft.push(lastPage + 1);
});

const commentsDefaultPageReducer = produce((draft) => {
    draft.comments.selectedPages = defaultCommentsState.selectedPages;
});

const commentsLoadingReducer = produce((draft, loading = false) => {
    draft.comments.loading = loading;
});

const commentReducer = produce((draft, payload) => {
    const { id, ...otherPayload } = payload;
    const existedCommentDraft = draft.comments.itemsById[id];

    if (existedCommentDraft) {
        Object.assign(existedCommentDraft, otherPayload);
    } else {
        draft.comments.itemsById[id] = payload;
    }
});

const commentLikesReducer = produce((draft, id) => {
    const comment = draft.comments.itemsById[id];

    if (comment) {
        if (!comment.userLiked) {
            comment.userLiked = 1;
            comment.likes += 1;
        } else if (comment.likes > 0) {
            comment.userLiked = 0;
            comment.likes -= 1;
        }
    }
});

const addCommentReplyReducer = produce((draft, payload) => {
    const { parentId } = payload;

    const comment = draft.comments.itemsById[parentId];

    if (comment) {
        comment.replies.push(payload);
        comment.repliesCount += 1;
    }
});

const toggleCommentRepliesReducer = produce((draft, payload) => {
    const { id, toggle } = payload;

    const comment = draft.comments.itemsById[id];

    if (comment) {
        comment.expandedReplies = toggle ?? !comment.expandedReplies;
    }
});

const commentsSortByReducer = produce((draft, value) => {
    draft.comments.sortBy = value;
});

const commentsShouldRefetchReducer = produce((draft, refetch = false) => {
    draft.comments.shouldRefetch = refetch;
});

// Strategies

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const RECEIVE_PRODUCT = ' RECEIVE_PRODUCT';
export const SELECT_SIZE = 'SELECT_SIZE';
export const SET_ERROR = ' SET_ERROR';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENTS_ERROR = 'RECEIVE_COMMENTS_ERROR';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_MORE_COMMENTS = 'RECEIVE_MORE_COMMENTS';
export const TOGGLE_COMMENTS_LOADING = 'TOGGLE_COMMENTS_LOADING';
export const RECEIVE_COMMENT_REPLIES = 'RECEIVE_COMMENT_REPLIES';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const ADD_COMMENT_REPLY = 'ADD_COMMENT_REPLY';
export const TOGGLE_COMMENT_REPLIES = 'TOGGLE_COMMENT_REPLIES';
export const SELECT_COMMENTS_SORT = 'SELECT_COMMENTS_SORT';

const strategies = {
    [TOGGLE_LOADING]: toggleLoadingStrategy,
    [REQUEST_PRODUCT]: requestProductStrategy,
    [RECEIVE_PRODUCT]: receiveProductStrategy,
    [SELECT_SIZE]: selectSizeStrategy,
    [SET_ERROR]: setErrorStrategy,
    [REQUEST_COMMENTS]: requestCommentsStrategy,
    [RECEIVE_COMMENTS]: receiveCommentsStrategy,
    [RECEIVE_COMMENTS_ERROR]: receiveCommentsErrorStrategy,
    [RECEIVE_MORE_COMMENTS]: receiveMoreCommentsStrategy,
    [RECEIVE_COMMENT_REPLIES]: receiveCommentRepliesStategy,
    [TOGGLE_COMMENTS_LOADING]: toggleCommentsLoadingStrategy,
    [LIKE_COMMENT]: likeCommentStrategy,
    [ADD_COMMENT_REPLY]: addCommentReplyStrategy,
    [TOGGLE_COMMENT_REPLIES]: toggleCommentRepliesStrategy,
    [SELECT_COMMENTS_SORT]: selectCommentsSortStrategy
};

function toggleLoadingStrategy(state, { toggle = false }) {
    return loadingReducer(state, toggle);
}

function requestProductStrategy() {
    return loadingReducer(productPageDefaultState, true);
}

function receiveProductStrategy(state, payload) {
    const { comments: commentsPayload, ...otherPayload } = payload || {};

    let newState = productReducer(state, otherPayload);
    newState = loadingReducer(newState, false);
    newState = commentsReducer(newState, commentsPayload);

    return newState;
}

function selectSizeStrategy(state, payload) {
    const { id } = payload;

    let newState = selectedSizeIdReducer(state, id);

    if (id) {
        newState = errorsByKeyReducer(newState, { key: 'sizes', value: null });
    }

    return newState;
}

function setErrorStrategy(state, payload) {
    return errorsByKeyReducer(state, payload);
}

// Comments strategies

function requestCommentsStrategy(state) {
    return commentsLoadingReducer(state, true);
}

function receiveCommentsStrategy(state, payload) {
    let newState = commentsReducer(state, payload);
    newState = commentsDefaultPageReducer(newState);
    newState = commentsLoadingReducer(newState, false);
    newState = commentsShouldRefetchReducer(newState, false);

    return newState;
}

function receiveCommentsErrorStrategy(state) {
    let newState = commentsLoadingReducer(state, false);
    newState = commentsShouldRefetchReducer(newState, false);

    return newState;
}

function toggleCommentsLoadingStrategy(state, payload) {
    const { toggle = false } = payload;

    return commentsLoadingReducer(state, toggle);
}

function receiveMoreCommentsStrategy(state, payload) {
    let newState = commentsReducer(state, payload, true);
    newState = commentsNextPageReducer(newState);
    newState = commentsLoadingReducer(newState, false);

    return newState;
}

function receiveCommentRepliesStategy(state, payload) {
    const { id, items = [] } = payload;

    if (!id) {
        return state;
    }

    const existedCommentReplies = state?.comments?.itemsById[id]?.replies || [];

    return commentReducer(state, { id, replies: [...items, ...existedCommentReplies] });
}

function likeCommentStrategy(state, payload) {
    const { id } = payload;

    if (!id) {
        return state;
    }

    return commentLikesReducer(state, id);
}

function addCommentReplyStrategy(state, payload) {
    const { parentId } = payload;

    let newState = addCommentReplyReducer(state, payload);

    if (parentId) {
        newState = toggleCommentRepliesReducer(newState, { id: parentId, toggle: true });
    }

    return newState;
}

function toggleCommentRepliesStrategy(state, payload) {
    return toggleCommentRepliesReducer(state, payload);
}

function selectCommentsSortStrategy(state, payload) {
    const { value } = payload;

    let newState = commentsSortByReducer(state, value);
    newState = commentsShouldRefetchReducer(newState, true);

    return newState;
}

export const productPageReducer = reducerFactory(strategies, productPageDefaultState);
