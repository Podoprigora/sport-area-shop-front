import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollingCarousel from '@ui/ScrollingCarousel';
import BrandsCarouselSkeleton from '../Skeletons/BrandsCarouselSkeleton';

const BrandsCarousel = ({ data, className, onItemClick, loading, ...props }) => {
    if (loading) {
        return <BrandsCarouselSkeleton />;
    }

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className={classNames('brands-carousel', className)} {...props}>
            <ScrollingCarousel disableScrollbar>
                {data.map((item, i) => {
                    const { name, title, image } = item;

                    return (
                        <a
                            href={`brands/${name}`}
                            key={name}
                            className="brands-carousel__item"
                            onClick={(ev) => {
                                ev.preventDefault();

                                onItemClick(item, ev);
                            }}
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
    loading: PropTypes.bool,
    onItemClick: PropTypes.func
};

BrandsCarousel.defaultProps = {
    data: [],
    onItemClick: () => {}
};

export default BrandsCarousel;
