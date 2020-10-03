import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProductGalleryThumbnailList = (props) => {
    const { children, activeIndex, animationTimeout = 1000, onChange } = props;

    const hadClickRecentlyRef = useRef(false);
    const timeoutIdRef = useRef(null);

    const handleThumbnailClick = (index) => (ev) => {
        if (!hadClickRecentlyRef.current && onChange) {
            onChange(ev, index);
        }

        hadClickRecentlyRef.current = true;
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = setTimeout(() => {
                hadClickRecentlyRef.current = false;
            }, animationTimeout);
        };
    }, [activeIndex, animationTimeout]);

    if (React.Children.count(children) === 0) {
        return null;
    }

    const items = React.Children.map(children, (child, index) => {
        return (
            <li
                role="presentation"
                className={classNames('product-gallery__thumbnail', {
                    'product-gallery__thumbnail--selected': index === activeIndex
                })}
                onClick={handleThumbnailClick(index)}
            >
                {child}
            </li>
        );
    });

    return <ul className="product-gallery__thumbnail-list">{items}</ul>;
};

ProductGalleryThumbnailList.propTypes = {
    children: PropTypes.node,
    activeIndex: PropTypes.number,
    animationTimeout: PropTypes.number,
    onChange: PropTypes.func
};

export default ProductGalleryThumbnailList;
