import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { format as timeAgoFormat } from 'timeago.js';

import { useEventCallback } from '@ui/utils';
import { Rating } from '@ui/Rating';
import { Button } from '@ui/Button';
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
        disableLike,
        userLiked,
        className,
        onLike,
        onAddReply
    } = props;

    const [openReplyForm, setOpenReplyForm] = useState(false);

    const handleReplyClick = useCallback((ev) => {
        setOpenReplyForm((prevState) => !prevState);
    }, []);

    const handleAddReplyFormCancel = useCallback((ev) => {
        setOpenReplyForm(false);
    }, []);

    const handleAddReply = useCallback(
        async (value) => {
            if (onAddReply) {
                await onAddReply({ parentId: id, text: value });
                setOpenReplyForm(false);
            }

            return undefined;
        },
        [id, onAddReply]
    );

    const handleLike = useEventCallback((ev) => {
        if (onLike) {
            return onLike(ev, id);
        }

        return undefined;
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
                    <CommentLikeControl
                        qty={likes}
                        selected={!!userLiked}
                        disabled={disableLike}
                        onClick={handleLike}
                    />
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
    disableLike: PropTypes.bool,
    dislikes: PropTypes.number,
    userLiked: PropTypes.number,
    className: PropTypes.string,
    onLike: PropTypes.func,
    onAddReply: PropTypes.func
};

export default Comment;
