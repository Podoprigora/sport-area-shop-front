import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CarouselIndicators = memo(function CarouselIndicators({ size, activeIndex, onSelect }) {
    const items = [...Array(size)];

    const indicators = items.map((item, index) => {
        return (
            <li className="carousel__indicator" key={index}>
                <button
                    type="button"
                    aria-label="indicator"
                    className={classNames('carousel__indicator-btn', {
                        'carousel__indicator-btn--active': index === activeIndex
                    })}
                    onClick={onSelect(index)}
                />
            </li>
        );
    });

    if (!size) {
        return null;
    }

    return <ul className="carousel__indicators">{indicators}</ul>;
});

CarouselIndicators.propTypes = {
    size: PropTypes.number,
    activeIndex: PropTypes.number,
    onSelect: PropTypes.func
};

CarouselIndicators.defaultProps = {
    size: 0,
    activeIndex: 0,
    onSelect: () => {}
};

export default CarouselIndicators;
