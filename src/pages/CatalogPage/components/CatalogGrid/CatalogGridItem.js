import React from 'react';
import PropTypes from 'prop-types';

import Calc from '@utils/Calc';
import Format from '@utils/Format';

const CatalogGridItem = (props) => {
    const { id, name, brand, image, price, oldPrice, currency, isNew, sizes = [] } = props;

    const shouldDisplaySizes = sizes.length > 0;
    const shouldDisplayHiddenContent = shouldDisplaySizes;

    const discount = Calc.discountPersent(oldPrice, price);

    return (
        <div className="product catalog-grid__item">
            <div className="catalog-grid__item-inner">
                {discount && <div className="product__flag product__flag--hot">-{discount}%</div>}
                {!discount && isNew && <div className="product__flag product__flag--new">New</div>}
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
                    <div className="product__price">{Format.price(price, currency)}</div>
                )}
                {shouldDisplayHiddenContent && (
                    <div className="catalog-grid__item-hidden-content">
                        {shouldDisplaySizes && (
                            <div className="product__sizes">
                                <div className="product__sizes-label">Sizes:</div>
                                <div className="product__sizes-body">
                                    {sizes.map((size, index) => {
                                        return (
                                            <a href="#" key={index} className="product__size-link">
                                                {size}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

CatalogGridItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    oldPrice: PropTypes.number,
    currency: PropTypes.string,
    isNew: PropTypes.bool,
    sizes: PropTypes.array
};

export default CatalogGridItem;
