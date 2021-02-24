import React, { useRef } from 'react';

import { useMountedRef, useEventListener, useMergedRefs, useEventCallback } from '../utils';

export interface ClickAwayListenerProps {
    children?: React.ReactElement & { ref?: React.Ref<HTMLElement> };
    onClickAway: (ev: React.SyntheticEvent) => void;
}

export const ClickAwayListener = (props: ClickAwayListenerProps) => {
    const { children, onClickAway } = props;

    const syntheticEventRef = useRef(false);
    const touchMoveRef = useRef(false);
    const nodeRef = useRef<HTMLElement | null>(null);
    const handleRef = useMergedRefs(nodeRef, children?.ref ? children.ref : null);
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

    const handleTouchMove = useEventCallback(() => {
        touchMoveRef.current = true;
    });

    // To keep track events that bubbles up through the portal
    const createSyntheticHandler = (eventName: string) => (ev: React.SyntheticEvent) => {
        syntheticEventRef.current = true;

        const childrenPropsHandler = children?.props[eventName];

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

    if (!React.isValidElement(children)) {
        return children || null;
    }

    return React.cloneElement(children, childrenProps);
};
