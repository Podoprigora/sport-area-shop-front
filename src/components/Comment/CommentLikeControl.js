import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@ui/Tooltip';
import IconButton from '@ui/IconButton';
import ThumbUpIcon from '@svg-icons/material/ThumbUpIcon';
import BoxLabel from '@ui/BoxLabel';

const CommentLikeControl = (props) => {
    const { qty, selected } = props;

    return (
        <BoxLabel label={qty || null} condensed className="u-text-small">
            <Tooltip title={selected ? 'Unlike' : 'Like'}>
                <IconButton primary={selected} size="small">
                    <ThumbUpIcon />
                </IconButton>
            </Tooltip>
        </BoxLabel>
    );
};

CommentLikeControl.propTypes = {
    qty: PropTypes.number,
    selected: PropTypes.bool
};

export default CommentLikeControl;
