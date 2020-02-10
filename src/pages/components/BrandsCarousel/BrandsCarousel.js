import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollingCarousel from '@components/ScrollingCarousel';

const BrandsCarousel = ({ data, className, onItemClick, ...props }) => {
    if (!data.length) {
        return null;
    }

    return (
        <div className={classNames('brands-carousel', className)} {...props}>
            <ScrollingCarousel disableScrollbar>
                {data.map((item, i) => {
                    const { name, title, image } = item;

                    return (
                        <a
                            role="presentation"
                            key={name}
                            className="brands-carousel__item"
                            onClick={(ev) => onItemClick(item, ev)}
                        >
                            <img src={image} alt={title} className="brands-carousel__img" />
                        </a>
                    );
                })}
            </ScrollingCarousel>
        </div>
    );
};

BrandsCarousel.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            name: PropTypes.string,
            image: PropTypes.string
        })
    ),
    className: PropTypes.string,
    onItemClick: PropTypes.func
};

BrandsCarousel.defaultProps = {
    data: [],
    onItemClick: () => {}
};

export default BrandsCarousel;
