import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ScrollingCarousel from '@ui/ScrollingCarousel';
import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import Link from '@ui/Link';
import PanelBody from '@ui/Panel/PanelBody';
import StarIcon from '@svg-icons/feather/StarIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import Calc from '@utils/Calc';
import Format from '@utils/Format';
import ProductsCarouselSkeleton from '../Skeletons/ProductsCarouselSkeleton';

const TopsellerCarousel = ({ data, className, isLoading, onItemClick, ...props }) => {
    if (isLoading) {
        return <ProductsCarouselSkeleton />;
    }

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <Panel className={className} {...props}>
            <PanelHeader title="Topseller" icon={StarIcon}>
                <Link href="#" icon={ChevronRightIcon} iconAlign="right">
                    View all
                </Link>
            </PanelHeader>
            <PanelBody className="products-carousel">
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
                                    <div className="product__flag product__flag--hot">
                                        -{discount}%
                                    </div>
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
            </PanelBody>
        </Panel>
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
    isLoading: PropTypes.bool,
    onItemClick: PropTypes.func
};

TopsellerCarousel.defaultProps = {
    onItemClick: () => {}
};

export default TopsellerCarousel;
