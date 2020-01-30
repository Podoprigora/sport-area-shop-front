import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';

const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemsLength = React.Children.toArray(children).length;

    const handleIndicatorClick = useCallback(
        (index) => (ev) => {
            setActiveIndex(index);
        },
        []
    );

    const handlePrevControlClick = useCallback(
        (ev) => {
            setActiveIndex((prevState) => {
                return prevState ? prevState - 1 : itemsLength - 1;
            });
        },
        [itemsLength]
    );

    const handleNextControlClick = useCallback(
        (ev) => {
            setActiveIndex((prevState) => {
                return (prevState + 1) % itemsLength;
            });
        },
        [itemsLength]
    );

    const items = React.Children.toArray(children).map((item, index) => {
        return (
            <div
                className={classNames('carousel__item', {
                    'carousel__item--active': index === activeIndex
                })}
                key={index}
            >
                {item}
            </div>
        );
    });

    const indicators = React.Children.toArray(children).map((item, index) => {
        return (
            <li className="carousel__indicator" key={index}>
                <button
                    type="button"
                    aria-label="indicator"
                    className={classNames('carousel__indicator-btn', {
                        'carousel__indicator-btn--active': index === activeIndex
                    })}
                    onClick={handleIndicatorClick(index)}
                />
            </li>
        );
    });

    return (
        <div className={classNames('carousel')}>
            <div className="carousel__items">{items}</div>
            <ul className="carousel__indicators">{indicators}</ul>

            <button
                type="button"
                className={classNames('carousel__control', 'carousel__control--prev')}
                onClick={handlePrevControlClick}
            >
                <ChevronLeftIcon size="xlarge" />
            </button>
            <button
                type="button"
                className={classNames('carousel__control', 'carousel__control--next')}
                onClick={handleNextControlClick}
            >
                <ChevronRightIcon size="xlarge" />
            </button>
        </div>
    );
};

Carousel.propTypes = {
    children: PropTypes.node.isRequired
};

export default Carousel;
