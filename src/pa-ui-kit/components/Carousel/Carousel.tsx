import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import {
    useControlled,
    usePrevious,
    useEventCallback,
    useEventListener,
    useMergedRefs,
    useMountedRef
} from '../utils';

import { CarouselControl } from './CarouselControl';
import { CarouselIndicators } from './CarouselIndicators';

type ExtendedProps = Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>;

export interface CarouselProps extends ExtendedProps {
    /**
     * Normaly contains of `img` components.
     */
    children?: React.ReactElement | React.ReactElement[];
    activeIndex?: number;
    autoPlay?: boolean;
    interval?: number;
    animationTimeout?: number;
    control?: 'always' | 'hover' | 'none';
    disableInfiniteLoop?: boolean;
    indicators?: boolean;
    onChange?: (index: number) => void;
}

function getAnimationDirectionByIndex(currentIndex = 0, previousIndex = 0) {
    return currentIndex >= previousIndex ? 'left' : 'right';
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
    props,
    ref
) {
    const {
        activeIndex: activeIndexProp,
        children,
        autoPlay,
        disableInfiniteLoop = true,
        interval = 5000,
        animationTimeout = 1000,
        className,
        control = 'hover',
        indicators = true,
        onChange,
        ...other
    } = props;

    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const [activeIndex, setActiveIndex] = useControlled(activeIndexProp, 0);
    const prevActiveIndex = usePrevious(activeIndex);

    const animDirectionRef = useRef('left');
    const mouseEnterTimerIdRef = useRef<number>();
    const autoPlayTimerIdRef = useRef<number>();
    const isMountedRef = useMountedRef();

    const nodeRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergedRefs(nodeRef, ref);

    const infiniteLoopRef = useRef(false);
    infiniteLoopRef.current = autoPlay || !disableInfiniteLoop;

    const itemsLengthRef = useRef(0);
    itemsLengthRef.current = React.Children.count(children);

    if (typeof activeIndexProp !== 'undefined') {
        animDirectionRef.current = getAnimationDirectionByIndex(activeIndexProp, prevActiveIndex);
    }

    // Handlers

    const doChange = useEventCallback((value: number) => {
        if (onChange) {
            onChange(value);
        }
    });

    const nextSlide = useEventCallback(() => {
        if (typeof activeIndex === 'undefined') {
            return;
        }

        let newIndex = Math.min(activeIndex + 1, itemsLengthRef.current - 1);

        if (infiniteLoopRef.current) {
            newIndex = (activeIndex + 1) % itemsLengthRef.current;
        }

        setActiveIndex(newIndex);
        animDirectionRef.current = 'left';

        doChange(newIndex);
    });

    const prevSlide = useEventCallback(() => {
        if (typeof activeIndex === 'undefined') {
            return;
        }

        let newIndex = Math.max(activeIndex - 1, 0);

        if (infiniteLoopRef.current) {
            newIndex = activeIndex > 0 ? activeIndex - 1 : itemsLengthRef.current - 1;
        }

        setActiveIndex(newIndex);
        animDirectionRef.current = 'right';

        doChange(newIndex);
    });

    const stop = useCallback(() => {
        animDirectionRef.current = 'left';

        clearInterval(autoPlayTimerIdRef.current);
    }, []);

    const play = useCallback(() => {
        if (autoPlay && isMountedRef.current) {
            stop();

            clearInterval(autoPlayTimerIdRef.current);

            autoPlayTimerIdRef.current = setInterval(() => {
                nextSlide();
            }, interval);
        }
    }, [autoPlay, interval, nextSlide, stop, isMountedRef]);

    const handlePrevControlClick = useCallback(
        throttle(
            () => {
                prevSlide();
            },
            animationTimeout,
            { leading: true, trailing: false }
        ),
        [prevSlide]
    );

    const handleNextControlClick = useCallback(
        throttle(
            () => {
                nextSlide();
            },
            animationTimeout,
            { leading: true, trailing: false }
        ),
        [nextSlide]
    );

    const handleMouseEnter = useEventCallback(() => {
        if (isMouseEntered) {
            return;
        }
        clearTimeout(mouseEnterTimerIdRef.current);
        mouseEnterTimerIdRef.current = undefined;
        stop();
        mouseEnterTimerIdRef.current = setTimeout(() => {
            setIsMouseEntered(true);
        }, 150);
    });

    const handleMouseLeave = useEventCallback(() => {
        clearTimeout(mouseEnterTimerIdRef.current);
        setIsMouseEntered(false);
        play();
    });

    const handleMouseDown = useEventCallback((ev: React.SyntheticEvent) => {
        ev.preventDefault();
    });

    const handleIndicatorSelect = useEventCallback((_, index: number) => {
        animDirectionRef.current = getAnimationDirectionByIndex(index, activeIndex);

        setActiveIndex(index);
        doChange(index);
    });

    // Effects

    useEffect(() => {
        play();

        return () => {
            stop();
        };
    }, [play, stop]);

    useEventListener('visibilitychange', () => {
        if (document.hidden) {
            stop();
        } else {
            play();
        }
    });

    // Render

    const items = React.Children.toArray(children).map((item, index) => {
        return (
            <CSSTransition
                key={index}
                in={index === activeIndex}
                classNames={`carousel__slide-anim-${animDirectionRef.current}`}
                timeout={{ enter: animationTimeout, exit: animationTimeout }}
            >
                <div
                    className={classNames('carousel__item', {
                        'carousel__item--active': index === activeIndex
                    })}
                >
                    {item}
                </div>
            </CSSTransition>
        );
    });

    if (!itemsLengthRef.current) {
        return null;
    }

    const shouldDisplayControl = itemsLengthRef.current > 1 && control !== 'none';
    const isActiveControl = control === 'always' || (isMouseEntered && control === 'hover');
    const disabledNextControl =
        activeIndex === itemsLengthRef.current - 1 && !infiniteLoopRef.current;
    const disablePrevControl = !activeIndex && !infiniteLoopRef.current;

    return (
        <div
            role="presentation"
            className={classNames('carousel', className)}
            onMouseOver={handleMouseEnter}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            ref={handleRef}
            {...other}
        >
            <div className="carousel__items">{items}</div>

            {indicators && (
                <CarouselIndicators
                    size={itemsLengthRef.current}
                    activeIndex={activeIndex}
                    onSelect={handleIndicatorSelect}
                />
            )}

            {shouldDisplayControl && (
                <CarouselControl
                    type="prev"
                    active={isActiveControl}
                    disabled={disablePrevControl}
                    onClick={handlePrevControlClick}
                />
            )}

            {shouldDisplayControl && (
                <CarouselControl
                    type="next"
                    active={isActiveControl}
                    disabled={disabledNextControl}
                    onClick={handleNextControlClick}
                />
            )}
        </div>
    );
});
