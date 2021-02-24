import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { Popper, PopperProps } from '../Popper';
import { useMergedRefs, useEventCallback } from '../utils';
import { PickPropType } from '../utils/types';

export interface TooltipProps {
    /**
     * Should contain a valid `ReactElement`.
     */
    children: React.ReactElement & { ref?: React.Ref<HTMLElement> };
    title?: string;
    placement?: PickPropType<PopperProps, 'placement'>;
    disableFocusListener?: boolean;
    enterDelay?: number;
    enterTouchDelay?: number;
    leaveDelay?: number;
    leaveTouchDelay?: number;
    className?: string;
}

export const Tooltip = (props: TooltipProps) => {
    const {
        children,
        title,
        placement = 'bottom',
        className,
        disableFocusListener = false,
        enterDelay = 300,
        enterTouchDelay = 1000,
        leaveDelay = 0,
        leaveTouchDelay = 300
    }: TooltipProps = props;

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLElement | null>(null);
    const mouseEnterTimerRef = useRef<number>();
    const mouseLeaveTimerRef = useRef<number>();
    const touchStartTimerRef = useRef<number>();
    const touchEndTimerRef = useRef<number>();
    const hadTouchEventRef = useRef(false);
    const handleAnchorRefs = useMergedRefs(anchorRef, children?.ref ? children.ref : null);

    // Handlers

    const handleMouseEnter = useEventCallback((ev) => {
        if (hadTouchEventRef.current) {
            if (disableFocusListener) {
                hadTouchEventRef.current = false;
            }
        } else {
            clearTimeout(mouseLeaveTimerRef.current);

            mouseEnterTimerRef.current = setTimeout(() => {
                setOpen(true);
            }, enterDelay);
        }

        if (children.props.onMouseEnter) {
            children.props.onMouseEnter(ev);
        }
    });

    const handleMouseLeave = useEventCallback((ev) => {
        clearTimeout(mouseEnterTimerRef.current);

        mouseLeaveTimerRef.current = setTimeout(() => {
            setOpen(false);
        }, leaveDelay);

        if (children.props.onMouseLeave) {
            children.props.onMouseLeave(ev);
        }
    });

    const handleTouchStart = useEventCallback((ev) => {
        hadTouchEventRef.current = true;
        clearTimeout(touchEndTimerRef.current);

        touchStartTimerRef.current = setTimeout(() => {
            setOpen(true);
        }, enterTouchDelay);

        if (children.props.onTouchStart) {
            children.props.onTouchStart(ev);
        }
    });

    const handleTouchEnd = useEventCallback((ev) => {
        clearTimeout(touchStartTimerRef.current);

        touchEndTimerRef.current = setTimeout(() => {
            setOpen(false);
        }, leaveTouchDelay);

        if (children.props.onTouchEnd) {
            children.props.onTouchEnd(ev);
        }
    });

    const handleFocus = useEventCallback((ev) => {
        if (hadTouchEventRef.current) {
            hadTouchEventRef.current = false;
        } else {
            setOpen(true);
        }

        if (children.props.onFocus) {
            children.props.onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev) => {
        setOpen(false);

        if (children.props.onBlur) {
            children.props.onBlur(ev);
        }
    });

    // Effects

    useEffect(() => {
        return () => {
            clearTimeout(mouseEnterTimerRef.current);
            clearTimeout(mouseLeaveTimerRef.current);
            clearTimeout(touchStartTimerRef.current);
            clearTimeout(touchEndTimerRef.current);
        };
    }, []);

    // Render

    if (!React.isValidElement(children)) {
        return children;
    }

    return (
        <>
            {React.cloneElement(children, {
                ref: handleAnchorRefs,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                onTouchStart: handleTouchStart,
                onTouchEnd: handleTouchEnd,
                ...(!disableFocusListener && {
                    onFocus: handleFocus,
                    onBlur: handleBlur
                })
            })}
            {!!title && (
                <Popper
                    open={open}
                    placement={placement}
                    anchorRef={anchorRef}
                    transitionProps={{
                        classNames: 'tooltip',
                        timeout: 200
                    }}
                    modifiers={[
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 12]
                            }
                        }
                    ]}
                >
                    {({ placement: currentPlacement }) => (
                        <div
                            className={classNames(
                                'tooltip',
                                `u-placement-${currentPlacement}`,
                                className
                            )}
                        >
                            {title}
                        </div>
                    )}
                </Popper>
            )}
        </>
    );
};
