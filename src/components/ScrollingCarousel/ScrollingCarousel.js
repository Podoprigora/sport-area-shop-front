import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollbarSize from '@components/ScrollbarSize';

const ScrollingCarousel = ({ children, className }) => {
    const [scrollerStyle, setScrollerStyle] = useState({
        marginBottom: null
    });

    const handleScrollbarSizeChange = useCallback((scrollbarHeight) => {
        setScrollerStyle({ marginBottom: -scrollbarHeight });
    }, []);

    const items = React.Children.map(children, (item, i) => {
        return (
            <div key={i} className="scrolling-carousel__item">
                {item}
            </div>
        );
    });

    return (
        <div className={classNames('scrolling-carousel', className)}>
            <div className="scrolling-carousel__scroller" style={scrollerStyle}>
                <ScrollbarSize onChange={handleScrollbarSizeChange} />

                <div className="scrolling-carousel__scroller-content">
                    <div className="scrolling-carousel__items">{items}</div>
                </div>
            </div>
        </div>
    );
};

ScrollingCarousel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default ScrollingCarousel;
