import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import useEventCallback from '@ui/hooks/useEventCallback';
import useEventListener from '@ui/hooks/useEventListener';
import useMountedRef from '@ui/hooks/useMountedRef';
import CarouselControl from './CarouselControl';
import CarouselIndicators from './CarouselIndicators';

const animationTimeout = 1000;

const Carousel = React.forwardRef(function Carousel(props, ref) {
    const {
        children,
        autoPlay,
        interval = 5000,
        className,
        control = 'hover',
        renderThumbneil,
        ...other
    } = props;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const animDirection = useRef('left');
    const mouseEnterTimerId = useRef(null);
    const autoPlayTimerId = useRef(null);
    const isMounted = useMountedRef();
    const itemsLength = React.Children.toArray(children).length;

    const nextSlide = useEventCallback(() => {
        if (!isMounted.current) {
            return;
        }

        setActiveIndex((prevState) => {
            return (prevState + 1) % itemsLength;
        });
        animDirection.current = 'left';
    });

    const prevSlide = useEventCallback(() => {
        if (!isMounted.current) {
            return;
        }

        setActiveIndex((prevState) => {
            return prevState ? prevState - 1 : itemsLength - 1;
        });
        animDirection.current = 'right';
    });

    const stop = useCallback(() => {
        animDirection.current = 'left';
        clearInterval(autoPlayTimerId.current);
    }, []);

    const play = useCallback(() => {
        if (autoPlay) {
            stop();
            autoPlayTimerId.current = setInterval(() => {
                nextSlide();
            }, interval);
        }
    }, [autoPlay, interval, nextSlide, stop]);

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

        clearTimeout(mouseEnterTimerId.current);
        mouseEnterTimerId.current = null;

        stop();
        mouseEnterTimerId.current = setTimeout(() => {
            setIsMouseEntered(true);
        }, 150);
    });

    const handleMouseLeave = useEventCallback((ev) => {
        clearTimeout(mouseEnterTimerId.current);
        setIsMouseEntered(false);
        play();
    });

    const handleIndicatorSelect = useCallback(
        (index) => (ev) => {
            animDirection.current = index >= activeIndex ? 'left' : 'right';
            setActiveIndex(index);
        },
        [activeIndex]
    );

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
                classNames={`carousel__slide-anim-${animDirection.current}`}
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

    if (!itemsLength) {
        return null;
    }

    const shouldShowControl = itemsLength > 1 && control !== 'none';
    const isActiveControl = control === 'always' || (isMouseEntered && control === 'hover');

    return (
        <div
            className={classNames('carousel', className)}
            onMouseOver={handleMouseEnter}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            ref={ref}
            {...other}
        >
            <div className="carousel__items">{items}</div>

            <CarouselIndicators
                size={itemsLength}
                activeIndex={activeIndex}
                onSelect={handleIndicatorSelect}
            />

            {shouldShowControl && (
                <CarouselControl
                    type="prev"
                    active={isActiveControl}
                    onClick={handlePrevControlClick}
                />
            )}

            {shouldShowControl && (
                <CarouselControl
                    type="next"
                    active={isActiveControl}
                    onClick={handleNextControlClick}
                />
            )}
        </div>
    );
});

Carousel.propTypes = {
    children: PropTypes.node,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    control: PropTypes.oneOf(['always', 'hover', 'none']),
    renderThumbneil: PropTypes.func,
    className: PropTypes.string
};

export default Carousel;
