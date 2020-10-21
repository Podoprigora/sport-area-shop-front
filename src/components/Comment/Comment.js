import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { format as timeAgoFormat } from 'timeago.js';

import fakeRequest from '@services/fakeRequest';
import useEventCallback from '@ui/hooks/useEventCallback';
import Rating from '@ui/Rating';
import Button from '@ui/Button';
import CommentLikeControl from './CommentLikeControl';
import CommentAddReplyForm from './CommentAddReplyForm';
import CommentAlterMenu from './CommentAlterMenu';

const Comment = (props) => {
    const {
        type = 'comment',
        id,
        username,
        date,
        rating = 0,
        text,
        likes,
        userLiked,
        className
    } = props;
    const [openReplyForm, setOpenReplyForm] = useState(false);

    const handleReplyClick = useCallback((ev) => {
        setOpenReplyForm((prevState) => !prevState);
    }, []);

    const handleAddReplyFormCancel = useCallback((ev) => {
        setOpenReplyForm(false);
    }, []);

    const handleAddReply = useEventCallback(async (value) => {
        return fakeRequest({ success: true }, 1500).then(() => {
            console.log(value);
        });
    });

    const isReply = type === 'reply';
    const formatedDate = date && timeAgoFormat(date);
    const shouldDisplayRating = !isReply && rating > 0;
    const shouldDisplayAlterMenu = id === 1000;

    return (
        <div className={classNames('comment', className)}>
            <div className="comment__header">
                <span className="comment__username">{username}</span>
                <span className="comment__date">{formatedDate}</span>
            </div>
            {shouldDisplayRating && (
                <Rating className="comment__rating" size="small" readOnly value={rating} />
            )}
            <div className="comment__text">{text}</div>
            {!isReply && (
                <div className="comment__fbar">
                    <CommentLikeControl qty={likes} selected={!!userLiked} />
                    <Button
                        transparent
                        slim
                        size="small"
                        className="u-text-upper-case"
                        onClick={handleReplyClick}
                    >
                        Reply
                    </Button>
                    {shouldDisplayAlterMenu && <CommentAlterMenu className="u-margin-l-auto" />}
                </div>
            )}
            {!isReply && openReplyForm && (
                <CommentAddReplyForm
                    onCancel={handleAddReplyFormCancel}
                    onAsyncSubmit={handleAddReply}
                />
            )}
        </div>
    );
};

Comment.propTypes = {
    type: PropTypes.oneOf(['comment', 'reply']),
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number,
    likes: PropTypes.number,
    dislikes: PropTypes.number,
    userLiked: PropTypes.number,
    className: PropTypes.string
};

export default Comment;
