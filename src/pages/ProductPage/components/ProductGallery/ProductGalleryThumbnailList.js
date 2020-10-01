import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProductGalleryThumbnailList = (props) => {
    const { children, activeIndex, onChange } = props;

    const handleThumbneilClick = (index) => (ev) => {
        if (onChange) {
            onChange(ev, index);
        }
    };

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
                onClick={handleThumbneilClick(index)}
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
    onChange: PropTypes.func
};

export default ProductGalleryThumbnailList;
