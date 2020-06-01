import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useMountedRef from '@components/hooks/useMountedRef';
import useEventListener from '@components/hooks/useEventListener';
import useForkRef from '@components/hooks/useForkRef';
import useEventCallback from '@components/hooks/useEventCallback';

const ClickAwayListener = (props) => {
    const { children, onClickAway } = props;

    const syntheticEventRef = useRef(false);
    const touchMoveRef = useRef(false);
    const nodeRef = useRef(null);
    const handleRef = useForkRef(nodeRef, children.ref);
    const mountedRef = useMountedRef();

    const handleClickAway = useEventCallback((ev) => {
        const insideReactTree = syntheticEventRef.current;

        syntheticEventRef.current = false;

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

        if (isClickAway && !insideReactTree) {
            onClickAway(ev);
        }
    });

    const handleTouchMove = useEventCallback((ev) => {
        touchMoveRef.current = true;
    });

    // To keep track events that bubbles up through the portal
    const createSyntheticHandler = (eventName) => (ev) => {
        syntheticEventRef.current = true;

        const childrenPropsHandler = children.props[eventName];
        if (childrenPropsHandler) {
            childrenPropsHandler(ev);
        }
    };

    useEventListener('click', handleClickAway);
    useEventListener('touchend', handleClickAway);
    useEventListener('touchmove', handleTouchMove);

    const childrenProps = {
        ref: handleRef,
        onClick: createSyntheticHandler('onClick'),
        onTouchEnd: createSyntheticHandler('onTouchEnd')
    };

    return React.cloneElement(children, childrenProps);
};

ClickAwayListener.propTypes = {
    children: PropTypes.node,
    onClickAway: PropTypes.func.isRequired
};

export default ClickAwayListener;
