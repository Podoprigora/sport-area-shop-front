import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@ui/Tooltip';
import IconButton from '@ui/IconButton';
import ThumbUpIcon from '@ui/svg-icons/material/ThumbUpIcon';
import BoxLabel from '@ui/BoxLabel';
import useMountedRef from '@ui/hooks/useMountedRef';

const CommentLikeControl = (props) => {
    const { qty, selected, disabled, onClick } = props;

    const [pending, setPending] = useState(false);
    const isMoutedRef = useMountedRef();

    const handleClick = useCallback(
        async (ev) => {
            if (onClick) {
                try {
                    setPending(true);
                    await onClick(ev);
                } catch (e) {
                    console.error(e);
                } finally {
                    if (isMoutedRef.current) {
                        setPending(false);
                    }
                }
            }
        },
        [isMoutedRef, onClick]
    );

    return (
        <BoxLabel label={qty || null} condensed className="u-text-small">
            <Tooltip title={selected ? 'Unlike' : 'Like'}>
                <IconButton
                    primary={selected}
                    disabled={disabled || pending}
                    size="small"
                    onClick={handleClick}
                >
                    <ThumbUpIcon />
                </IconButton>
            </Tooltip>
        </BoxLabel>
    );
};

CommentLikeControl.propTypes = {
    qty: PropTypes.number,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default CommentLikeControl;
