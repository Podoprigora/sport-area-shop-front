import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventCallback from '@ui/hooks/useEventCallback';
import HelperText from '@ui/HelperText';
import {
    useProductPageActions,
    useProductPageSelectors,
    useProductPageState
} from '@pages/ProductPage/context';
import ProductTradeSizesList from './ProductTradeSizesList';

const ProductTradeSizes = (props) => {
    const { className } = props;

    const state = useProductPageState();
    const { getErrorByKey } = useProductPageSelectors(state);
    const { selectSize } = useProductPageActions();

    const { sizes = [], selectedSizeId } = state;
    const error = useMemo(() => getErrorByKey('sizes'), [getErrorByKey]);

    const handleSelect = useEventCallback((ev, id) => {
        if (selectSize) {
            selectSize(id);
        }
    });

    return useMemo(() => {
        return (
            <div className={classNames('product-trade__sizes', className)}>
                <span className="product-trade__sizes-label">Select a size:</span>

                <ProductTradeSizesList
                    items={sizes}
                    selectedId={selectedSizeId}
                    onSelect={handleSelect}
                />

                {error && <HelperText error>{error}</HelperText>}
            </div>
        );
    }, [className, error, handleSelect, selectedSizeId, sizes]);
};

ProductTradeSizes.propTypes = {
    className: PropTypes.string
};

export default ProductTradeSizes;
