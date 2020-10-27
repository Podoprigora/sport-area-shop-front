import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ProductStat } from '@components/Product';
import { useProductPageState } from '@pages/ProductPage/context';
import { useProductPageSelectors } from '@pages/ProductPage/context/productPageSelectors';

const ProductTradeTitle = (props) => {
    const { className } = props;

    const state = useProductPageState();
    const { commentsCount, rating } = useProductPageSelectors(state);
    const { name, brand } = state;

    return useMemo(() => {
        return (
            <div className={classNames('product-trade__title', className)}>
                {brand && <h3 className="product-trade__brand product__brand">{brand}</h3>}
                {name && <h4 className="product-trade__name product__name">{name}</h4>}
                {commentsCount > 0 && (
                    <ProductStat
                        className="product-trade__stat"
                        rating={rating}
                        comments={commentsCount}
                    />
                )}
            </div>
        );
    }, [brand, name, commentsCount, rating, className]);
};

ProductTradeTitle.propTypes = {
    className: PropTypes.string
};

export default ProductTradeTitle;
