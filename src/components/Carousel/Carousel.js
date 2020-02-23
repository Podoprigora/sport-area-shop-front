import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import useEventCallback from '@components/hooks/useEventCallback';
import CarouselControl from './CarouselControl';
import CarouselIndicators from './CarouselIndicators';

const animationTimeout = 1000;

const Carousel = React.forwardRef(function Carousel(
    { children, autoPlay, interval, className, control, ...props },
    ref
) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const animDirection = useRef('left');
    const mouseEnterTimerId = useRef(null);
    const autoPlayTimerId = useRef(null);
    const itemsLength = React.Children.toArray(children).length;

    const nextSlide = useEventCallback(() => {
        setActiveIndex((prevState) => {
            return (prevState + 1) % itemsLength;
        });
        animDirection.current = 'left';
    }, [itemsLength]);

    const prevSlide = useEventCallback(() => {
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

    useEffect(() => {
        play();

        return () => {
            stop();
        };
    }, [play, stop]);

    useEffect(() => {
        const handleDocumentVisibilityChange = (ev) => {
            if (document.hidden) {
                stop();
            } else {
                play();
            }
        };

        document.addEventListener('visibilitychange', handleDocumentVisibilityChange, false);

        return () => {
            document.removeEventListener('visibilitychange', handleDocumentVisibilityChange, false);
        };
    }, [play, stop]);

    const handleIndicatorSelect = useCallback(
        (index) => (ev) => {
            animDirection.current = index >= activeIndex ? 'left' : 'right';
            setActiveIndex(index);
        },
        [activeIndex]
    );

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={ref}
            {...props}
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
    className: PropTypes.string
};

Carousel.defaultProps = {
    autoPlay: false,
    interval: 5000,
    control: 'hover'
};

export default Carousel;
