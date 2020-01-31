import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import useEventCallback from '@components/hooks/useEventCallback';
import CarouselControl from './CarouselControl';
import CarouselIndicators from './CarouselIndicators';

// When need to update the classNames of CSSTransition dynamically
// https://github.com/reactjs/react-transition-group/issues/182
const dynamicChildFactory = (animClassNames) => (child) => {
    return React.cloneElement(child, {
        classNames: animClassNames
    });
};

let mouseEntedTimerId = null;

const Carousel = ({ children, autoPlay, interval, className, ...props }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const animDirection = useRef('left');
    const itemsLength = React.Children.toArray(children).length;
    const animClassNames = `carousel__slide-anim-${animDirection.current}`;

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

    useEffect(() => {
        if (autoPlay) {
            const timeID = setInterval(() => {
                nextSlide();
            }, interval);

            return () => {
                animDirection.current = 'left';
                clearInterval(timeID);
            };
        }

        return () => {};
    }, [nextSlide, activeIndex, autoPlay, interval]);

    const handleIndicatorSelect = useEventCallback((index) => (ev) => {
        animDirection.current = index >= activeIndex ? 'left' : 'right';
        setActiveIndex(index);
    });

    const handleMouseEnter = useEventCallback((ev) => {
        mouseEntedTimerId = setTimeout(() => {
            setIsMouseEntered(true);
        }, 150);
    });

    const handleMouseLeave = useEventCallback((ev) => {
        clearTimeout(mouseEntedTimerId);
        setIsMouseEntered(false);
    });

    const activeItem = itemsLength && (
        <CSSTransition key={activeIndex} classNames={animClassNames} timeout={1000}>
            <div className="carousel__item">{React.Children.toArray(children)[activeIndex]}</div>
        </CSSTransition>
    );

    if (!itemsLength) {
        return null;
    }

    return (
        <div
            className={classNames('carousel', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <div className="carousel__items">
                <TransitionGroup
                    component={null}
                    childFactory={dynamicChildFactory(animClassNames)}
                >
                    {activeItem}
                </TransitionGroup>
            </div>

            <CarouselIndicators
                size={itemsLength}
                activeIndex={activeIndex}
                onSelect={handleIndicatorSelect}
            />

            {itemsLength > 1 && (
                <CarouselControl
                    type="prev"
                    hover={isMouseEntered}
                    position="outside"
                    onClick={prevSlide}
                />
            )}

            {itemsLength > 1 && (
                <CarouselControl
                    type="next"
                    hover={isMouseEntered}
                    position="outside"
                    onClick={nextSlide}
                />
            )}
        </div>
    );
};

Carousel.propTypes = {
    children: PropTypes.node,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    className: PropTypes.string
};

Carousel.defaultProps = {
    autoPlay: false,
    interval: 5000
};

export default Carousel;
