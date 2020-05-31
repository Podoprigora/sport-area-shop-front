import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useMountedRef from '@components/hooks/useMountedRef';
import useEventListener from '@components/hooks/useEventListener';
import useForkRef from '@components/hooks/useForkRef';
import useEventCallback from '@components/hooks/useEventCallback';

const ClickAwayListener = (props) => {
    const { children, onClickAway } = props;

    const mountedRef = useMountedRef();
    const touchMoveRef = useRef(false);
    const nodeRef = useRef(null);
    const handleRef = useForkRef(nodeRef, children.ref);

    const handleClickAway = useEventCallback((ev) => {
        if (!mountedRef.current || !nodeRef.current) {
            return;
        }

        if (touchMoveRef.current) {
            touchMoveRef.current = false;
            return;
        }

        let isClickAway = false;

        if (ev.composedPath) {
            isClickAway = ev.composedPath().indexOf(nodeRef.current) === -1;
        } else {
            isClickAway = !nodeRef.current.contains(ev.target);
        }

        if (isClickAway) {
            onClickAway(ev);
        }
    });

    const handleTouchMove = useEventCallback((ev) => {
        touchMoveRef.current = true;
    });

    useEventListener('click', handleClickAway);
    useEventListener('touchend', handleClickAway);
    useEventListener('touchmove', handleTouchMove);

    return React.cloneElement(children, { ref: handleRef });
};

ClickAwayListener.propTypes = {
    children: PropTypes.node,
    onClickAway: PropTypes.func.isRequired
};

export default ClickAwayListener;
