import React from 'react';
import PropTypes from 'prop-types';

import ScrollingCarousel from '@components/ScrollingCarousel';
import Format from '@pages/utils/Format';
import Panel from '@components/Panel';
import PanelHeader from '@components/Panel/PanelHeader';
import PanelBody from '@components/Panel/PanelBody';
import TagIcon from '@components/SvgIcons/feather/TagIcon';
import ChevronRightIcon from '@components/SvgIcons/feather/ChevronRightIcon';
import Link from '@components/Link';

const BrandnewCarousel = ({ data, className, onItemClick, ...props }) => {
    if (!data.length) {
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
    onItemClick: PropTypes.func
};

BrandnewCarousel.defaultProps = {
    onItemClick: () => {}
};

export default BrandnewCarousel;
