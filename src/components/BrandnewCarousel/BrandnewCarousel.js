import React from 'react';
import PropTypes from 'prop-types';

import ScrollingCarousel from '@ui/ScrollingCarousel';
import Format from '@utils/Format';
import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import PanelBody from '@ui/Panel/PanelBody';
import TagIcon from '@ui/SvgIcons/feather/TagIcon';
import ChevronRightIcon from '@ui/SvgIcons/feather/ChevronRightIcon';
import Link from '@ui/Link';
import ProductsCarouselSkeleton from '../Skeletons/ProductsCarouselSkeleton';

const BrandnewCarousel = ({ data, className, onItemClick, loading, ...props }) => {
    if (loading) {
        return <ProductsCarouselSkeleton />;
    }

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <Panel className={className} {...props}>
            <PanelHeader icon={TagIcon} title="Brandnew">
                <Link href="#" icon={ChevronRightIcon} iconAlign="right">
                    View all
                </Link>
            </PanelHeader>
            <PanelBody className="products-carousel">
                <ScrollingCarousel>
                    {data.map((item, i) => {
                        const { id, name, brand, image, price, currency } = item;

                        return (
                            <a
                                key={id}
                                href="#"
                                className="products-carousel__item product"
                                onClick={(ev) => onItemClick(item, ev)}
                            >
                                <div className="product__flag product__flag--new">New</div>
                                <div className="product__img-container">
                                    <img src={image} alt={name} className="product__img" />
                                </div>
                                <h4 className="product__title">
                                    {brand && <span className="product__brand">{brand}</span>}
                                    <span className="product__name">{name}</span>
                                </h4>
                                <div className="product__price">
                                    {Format.price(price, currency)}
                                </div>
                            </a>
                        );
                    })}
                </ScrollingCarousel>
            </PanelBody>
        </Panel>
    );
};

BrandnewCarousel.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            brand: PropTypes.string,
            image: PropTypes.string,
            price: PropTypes.number,
            currency: PropTypes.string
        })
    ),
    className: PropTypes.string,
    loading: PropTypes.bool,
    onItemClick: PropTypes.func
};

BrandnewCarousel.defaultProps = {
    onItemClick: () => {}
};

export default BrandnewCarousel;
