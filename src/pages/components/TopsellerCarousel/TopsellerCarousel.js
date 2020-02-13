import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollingCarousel from '@components/ScrollingCarousel';
import Calc from '@pages/utils/Calc';
import Format from '@pages/utils/Format';

const TopsellerCarousel = ({ data, className, onItemClick, ...props }) => {
    if (!data.length) {
        return null;
    }

    return (
        <div className={classNames('products-carousel', className)} {...props}>
            <ScrollingCarousel>
                {data.map((item, i) => {
                    const { id, name, brand, image, price, oldPrice, currency } = item;
                    const discount = Calc.discountPersent(oldPrice, price);

                    return (
                        <a
                            key={id}
                            href="#"
                            className="products-carousel__item product"
                            onClick={(ev) => onItemClick(item, ev)}
                        >
                            {discount && (
                                <div className="product__flag product__flag--hot">-{discount}%</div>
                            )}
                            <div className="product__img-container">
                                <img src={image} alt={name} className="product__img" />
                            </div>
                            <h4 className="product__title">
                                {brand && <span className="product__brand">{brand}</span>}
                                <span className="product__name">{name}</span>
                            </h4>
                            {oldPrice ? (
                                <div className="product__prices-container">
                                    <div className="product__price product__price--old">
                                        {Format.price(oldPrice, currency)}
                                    </div>
                                    <div className="product__price product__price--new">
                                        {Format.price(price, currency)}
                                    </div>
                                </div>
                            ) : (
                                <div className="product__price">
                                    {Format.price(price, currency)}
                                </div>
                            )}
                        </a>
                    );
                })}
            </ScrollingCarousel>
        </div>
    );
};

TopsellerCarousel.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            brand: PropTypes.string,
            image: PropTypes.string,
            price: PropTypes.number,
            oldPrice: PropTypes.number,
            currency: PropTypes.string
        })
    ),
    className: PropTypes.string,
    onItemClick: PropTypes.func
};

TopsellerCarousel.defaultProps = {
    onItemClick: () => {}
};

export default TopsellerCarousel;
