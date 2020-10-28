import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import Button from '@ui/Button';
import CircularProgress from '@ui/CircularProgress';
import CheckCircleIcon from '@svg-icons/feather/CheckCircleIcon';
import { useProductPageActions, useProductPageState } from '@pages/ProductPage/context';
import useEventCallback from '@ui/hooks/useEventCallback';

const ProductTradeActionAddToCart = (props) => {
    const { selectedSizeId } = useProductPageState();
    const { setError } = useProductPageActions();

    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    const handleClick = useEventCallback(() => {
        if (!selectedSizeId) {
            setError('sizes', 'Please select an available size.');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setToggle((prevState) => !prevState);
        }, 2500);
    });

    return useMemo(() => {
        return (
            <Button
                primary
                plain={toggle}
                size="large"
                centered={!toggle}
                icon={toggle ? CheckCircleIcon : ShoppingCartIcon}
                loading={loading}
                loadingComponent={<CircularProgress />}
                disabled={loading}
                className={classNames(
                    'product-trade__actions-item product-trade__actions-item--add-to-cart',
                    {
                        'product-trade__actions-item--selected': toggle
                    }
                )}
                onClick={handleClick}
            >
                {toggle ? 'The item already in the cart' : 'Add to Cart'}
            </Button>
        );
    }, [handleClick, loading, toggle]);
};

ProductTradeActionAddToCart.propTypes = {};

export default ProductTradeActionAddToCart;
