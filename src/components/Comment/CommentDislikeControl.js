import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@ui/Tooltip';
import IconButton from '@ui/IconButton';
import ThumbDownIcon from '@svg-icons/material/ThumbDownIcon';

const CommentDislikeControl = (props) => {
    const { selected } = props;

    return (
        <Tooltip title="Dislike">
            <IconButton size="small" className="u-color-red">
                <ThumbDownIcon />
            </IconButton>
        </Tooltip>
    );
};

CommentDislikeControl.propTypes = {
    selected: PropTypes.bool
};

export default CommentDislikeControl;
