import React from 'react';
import PropTypes from 'prop-types';

import Calc from '@utils/Calc';
import Format from '@utils/Format';
import Rating from '@ui/Rating';
import Link from '@ui/Link';
import MessageSquareIcon from '@svg-icons/feather/MessageSquareIcon';
import IconButton from '@ui/IconButton';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import FavoriteIcon from '@svg-icons/material/FavoriteIcon';

const CatalogGridItem = (props) => {
    const {
        id,
        name,
        brand,
        image,
        price,
        oldPrice,
        currency,
        isNew,
        sizes = [],
        rating = 0,
        comments = 0,
        favorite
    } = props;

    const shouldDisplaySizes = sizes.length > 0;
    const shouldDisplayHiddenContent = shouldDisplaySizes;

    const discount = Calc.discountPersent(oldPrice, price);

    return (
        <div className="product catalog-grid__item">
            <div className="catalog-grid__item-inner">
                <div className="product__action product__action--favorite">
                    <IconButton size="large">
                        {favorite ? <FavoriteIcon /> : <FavoriteOutlineIcon />}
                    </IconButton>
                </div>
                {discount && <div className="product__flag product__flag--hot">-{discount}%</div>}
                {!discount && isNew && <div className="product__flag product__flag--new">New</div>}
                <div className="product__img-container">
                    <img src={image} alt={name} className="product__img" />
                </div>
                <h4 className="product__title">
                    {brand && <span className="product__brand">{brand}</span>}
                    <span className="product__name">{name}</span>
                </h4>
                <div className="product__stat">
                    <Rating
                        className="product__rating"
                        defaultValue={rating}
                        size="small"
                        readOnly
                    />
                    <Link className="product__comments-link" icon={MessageSquareIcon} size="small">
                        {comments}
                    </Link>
                </div>

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
    sizes: PropTypes.array,
    rating: PropTypes.number,
    comments: PropTypes.number,
    favorite: PropTypes.bool
};

export default CatalogGridItem;
