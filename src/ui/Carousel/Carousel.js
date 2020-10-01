import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import useControlled from '@ui/hooks/useControlled';
import useEventCallback from '@ui/hooks/useEventCallback';
import useEventListener from '@ui/hooks/useEventListener';
import useForkRef from '@ui/hooks/useForkRef';
import useMountedRef from '@ui/hooks/useMountedRef';
import CarouselControl from './CarouselControl';
import CarouselIndicators from './CarouselIndicators';

const Carousel = React.forwardRef(function Carousel(props, ref) {
    const {
        activeIndex: activeIndexProp,
        children,
        autoPlay,
        disableInfiniteLoop = true,
        interval = 5000,
        animationTimeout = 800,
        className,
        control = 'hover',
        indicators = true,
        onChange,
        ...other
    } = props;

    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const [activeIndex, setActiveIndex] = useControlled(activeIndexProp, 0);

    const animDirectionRef = useRef('left');
    const mouseEnterTimerIdRef = useRef(null);
    const autoPlayTimerIdRef = useRef(null);
    const isMountedRef = useMountedRef();
    const nodeRef = useRef(null);
    const handleRef = useForkRef(nodeRef, ref);

    const infiniteLoopRef = useRef(false);
    infiniteLoopRef.current = autoPlay || !disableInfiniteLoop;

    const itemsLengthRef = useRef(0);
    itemsLengthRef.current = React.Children.count(children);

    const doChange = useEventCallback((ev, value) => {
        if (onChange) {
            onChange(ev, value);
        }
    });

    const nextSlide = useEventCallback((ev) => {
        if (Number.isNaN(parseInt(activeIndex, 10))) {
            return;
        }

        let newIndex = Math.min(activeIndex + 1, itemsLengthRef.current - 1);

        if (infiniteLoopRef.current) {
            newIndex = (activeIndex + 1) % itemsLengthRef.current;
        }

        setActiveIndex(newIndex);
        animDirectionRef.current = 'left';

        doChange(ev, newIndex);
    });

    const prevSlide = useEventCallback((ev) => {
        if (Number.isNaN(parseInt(activeIndex, 10))) {
            return;
        }

        let newIndex = Math.max(activeIndex - 1, 0);

        if (infiniteLoopRef.current) {
            newIndex = activeIndex > 0 ? activeIndex - 1 : itemsLengthRef.current - 1;
        }

        setActiveIndex(newIndex);
        animDirectionRef.current = 'right';

        doChange(ev, newIndex);
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
            (ev) => {
                prevSlide();
            },
            animationTimeout,
            { leading: true, trailing: false }
        ),
        []
    );

    const handleNextControlClick = useCallback(
        throttle(
            (ev) => {
                nextSlide();
            },
            animationTimeout,
            { leading: true, trailing: false }
        ),
        []
    );

    const handleMouseEnter = useEventCallback((ev) => {
        if (isMouseEntered) {
            return;
        }

        clearTimeout(mouseEnterTimerIdRef.current);
        mouseEnterTimerIdRef.current = null;

        stop();

        mouseEnterTimerIdRef.current = setTimeout(() => {
            setIsMouseEntered(true);
        }, 150);
    });

    const handleMouseLeave = useEventCallback((ev) => {
        clearTimeout(mouseEnterTimerIdRef.current);

        setIsMouseEntered(false);

        play();
    });

    const handleMouseDown = useEventCallback((ev) => {
        ev.preventDefault();
    });

    const handleIndicatorSelect = useEventCallback((ev, index) => {
        animDirectionRef.current = index >= activeIndex ? 'left' : 'right';

        setActiveIndex(index);
        doChange(ev, index);
    });

    useEffect(() => {
        play();

        return () => {
            stop();
        };
    }, [play, stop]);

    useEventListener('visibilitychange', (ev) => {
        if (document.hidden) {
            stop();
        } else {
            play();
        }
    });

    const items = React.Children.toArray(children).map((item, index) => {
        return (
            <CSSTransition
                key={index}
                in={index === activeIndex}
                classNames={`carousel__slide-anim-${animDirectionRef.current}`}
                timeout={animationTimeout}
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

Carousel.propTypes = {
    activeIndex: PropTypes.number,
    children: PropTypes.node,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    animationTimeout: PropTypes.number,
    control: PropTypes.oneOf(['always', 'hover', 'none']),
    disableInfiniteLoop: PropTypes.bool,
    indicators: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func
};

export default Carousel;
