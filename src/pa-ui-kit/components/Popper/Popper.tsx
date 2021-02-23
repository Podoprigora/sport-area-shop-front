import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { State as PopperState } from '@popperjs/core';

import { Portal } from '../Portal';
import { usePopper, UsePopperProps } from './usePopper';

export interface PopperProps extends UsePopperProps {
    children: (props: Partial<PopperState>) => React.ReactElement;
    open?: boolean;
    anchorRef?: React.RefObject<HTMLElement | null>;
    transitionProps?: Pick<CSSTransitionProps, 'classNames' | 'timeout'>;
}

export const Popper = (props: PopperProps) => {
    const {
        children,
        anchorRef = { current: null },
        open,
        placement,
        strategy,
        modifiers,
        transitionProps
    }: PopperProps = props;

    const { referenceRef, popperRef, popperInstance } = usePopper({
        placement,
        strategy,
        modifiers
    });
    const [exited, setExited] = useState(true);

    // Handlers

    const handleTransitionEnter = useCallback(() => {
        setExited(false);
    }, []);

    const handleTransitionExited = useCallback(() => {
        setExited(true);
    }, []);

    useEffect(() => {
        if (anchorRef.current) {
            referenceRef(anchorRef.current);
        }
    }, [anchorRef, referenceRef]);

    // Render

    if (!open && exited) {
        return null;
    }

    const popperState = (popperInstance && popperInstance.state) || {};
    const childrenElement = children instanceof Function ? children(popperState) : null;

    return (
        <Portal>
            <div className="popper" ref={popperRef}>
                {transitionProps ? (
                    <CSSTransition
                        in={open && !!popperInstance}
                        onEnter={handleTransitionEnter}
                        onExited={handleTransitionExited}
                        {...transitionProps}
                        timeout={300}
                    >
                        {childrenElement}
                    </CSSTransition>
                ) : (
                    childrenElement
                )}
            </div>
        </Portal>
    );
};
