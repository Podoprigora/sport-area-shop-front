import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import scroll from 'scroll';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import { Scrollbar, ScrollbarRef } from '../Scrollbar';
import { useEventCallback } from '../utils';

import { ScrollingControl } from './ScrollingControl';

export interface ScrollingCarouselProps extends React.ComponentPropsWithRef<'div'> {
    children?: React.ReactElement | React.ReactElement[];
    scrollbar?: boolean;
    nextIcon?: React.ReactElement;
    prevIcon?: React.ReactElement;
}

type DisplayControlState = {
    prev: boolean;
    next: boolean;
};

export const ScrollingCarousel = React.forwardRef<HTMLDivElement, ScrollingCarouselProps>(
    function ScrollingCarousel(props, forwardedRef) {
        const { children, scrollbar, className, nextIcon, prevIcon, ...other } = props;

        const [displayControls, setDisplayControls] = useState<DisplayControlState>({
            prev: false,
            next: false
        });
        const [scrollable, setScrollable] = useState(false);
        const [isActivatedDragState, setIsActivatedDragState] = useState(false);

        const scrollerContentNodeRef = useRef<HTMLDivElement>(null);
        const scrollerNodeRef = useRef<ScrollbarRef>(null);
        const isDraggableContentRef = useRef(false);
        const startScrollPositionXRef = useRef(0);
        const activeDragItemIndexRef = useRef<number>();

        // Handlers

        const updateDisplayControlsState = useEventCallback(() => {
            if (!scrollerNodeRef.current) {
                return;
            }

            const { getClientWidth, getScrollWidth, getScrollLeft } = scrollerNodeRef.current;

            const displayControlPrev = getScrollLeft() > 0;
            const displayControlNext = getClientWidth() + getScrollLeft() < getScrollWidth();
            const hasScrolling = getScrollWidth() > getClientWidth();

            setScrollable(hasScrolling);

            if (
                displayControlPrev !== displayControls.prev ||
                displayControlNext !== displayControls.next
            ) {
                setDisplayControls({
                    prev: displayControlPrev,
                    next: displayControlNext
                });
            }
        });

        const handleScrollerContentMouseDown = (ev: React.MouseEvent) => {
            ev.preventDefault();

            if (scrollerNodeRef.current) {
                setIsActivatedDragState(false);

                isDraggableContentRef.current = true;
                startScrollPositionXRef.current =
                    ev.clientX + scrollerNodeRef.current?.getScrollLeft();
            }
        };

        const handleScrollerContentMouseUp = (ev: React.MouseEvent) => {
            ev.preventDefault();

            isDraggableContentRef.current = false;
        };

        const handleScrollerContentMouseLeave = (ev: React.MouseEvent) => {
            ev.preventDefault();

            isDraggableContentRef.current = false;
        };

        const handleScrollerContentMouseMove = (ev: React.MouseEvent) => {
            ev.preventDefault();

            if (isDraggableContentRef.current === true && scrollerNodeRef.current) {
                scrollerNodeRef.current.scrollLeft(startScrollPositionXRef.current - ev.clientX);

                setTimeout(() => {
                    setIsActivatedDragState(true);
                }, 166);
            }
        };

        const scrollContent = useCallback((direction: 'left' | 'right') => {
            if (scrollerNodeRef.current) {
                const { getClientWidth, getScrollLeft } = scrollerNodeRef.current;

                const nextScrollPosition =
                    (direction === 'left' ? -1 : 1) * getClientWidth() + getScrollLeft();

                scroll.left(scrollerNodeRef.current.view, nextScrollPosition);
            }
        }, []);

        const handleClickControlNext = useCallback(() => {
            scrollContent('right');
        }, [scrollContent]);

        const handleClickControlPrev = useCallback(() => {
            scrollContent('left');
        }, [scrollContent]);

        const handleScroll = debounce(() => {
            updateDisplayControlsState();
        }, 166);

        // Effects

        useEffect(() => {
            updateDisplayControlsState();
        }, [updateDisplayControlsState]);

        useEffect(() => {
            const handleResizeWindow = throttle(() => {
                updateDisplayControlsState();
            }, 166);

            window.addEventListener('resize', handleResizeWindow);

            return () => {
                window.removeEventListener('resize', handleResizeWindow);
            };
        }, [updateDisplayControlsState]);

        // Render

        const items = useMemo(() => {
            const handleItemMouseDown = (index: number) => () => {
                activeDragItemIndexRef.current = index;
            };

            return React.Children.map(children, (child, i) => {
                const isItemDraggable = activeDragItemIndexRef.current === i;

                if (React.isValidElement(child)) {
                    return (
                        <div
                            role="presentation"
                            key={i}
                            className="scrolling-carousel__item"
                            onMouseDown={handleItemMouseDown(i)}
                        >
                            {isActivatedDragState && isItemDraggable
                                ? React.cloneElement(child, { 'data-draggable': isItemDraggable })
                                : child}
                        </div>
                    );
                }

                return null;
            });
        }, [children, isActivatedDragState]);

        return (
            <div
                className={classNames('scrolling-carousel', className, {
                    'scrolling-carousel--scrollable': scrollable && !scrollbar
                })}
                {...other}
                ref={forwardedRef}
            >
                {scrollable && (
                    <ScrollingControl
                        type="prev"
                        disabled={!displayControls.prev}
                        icon={prevIcon}
                        onClick={handleClickControlPrev}
                    />
                )}
                <div className="scrolling-carousel__body">
                    <Scrollbar
                        autoHeight
                        autoHeightMax="auto"
                        ref={scrollerNodeRef}
                        disabled={scrollbar}
                        onScroll={handleScroll}
                    >
                        <div
                            role="presentation"
                            className="scrolling-carousel__scroller-content"
                            ref={scrollerContentNodeRef}
                            onMouseDown={handleScrollerContentMouseDown}
                            onMouseUp={handleScrollerContentMouseUp}
                            onMouseMove={handleScrollerContentMouseMove}
                            onMouseLeave={handleScrollerContentMouseLeave}
                        >
                            <div className="scrolling-carousel__items">{items}</div>
                        </div>
                    </Scrollbar>
                </div>

                {scrollable && (
                    <ScrollingControl
                        type="next"
                        disabled={!displayControls.next}
                        icon={nextIcon}
                        onClick={handleClickControlNext}
                    />
                )}
            </div>
        );
    }
);
