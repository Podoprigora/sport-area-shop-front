import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import Button from '@ui/Button';
import CircularProgress from '@ui/CircularProgress';
import CheckCircleIcon from '@svg-icons/feather/CheckCircleIcon';

const ProductTradeActionAddToCart = (props) => {
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    const handleClick = useCallback(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setToggle((prevState) => !prevState);
        }, 2500);
    }, []);

    return (
        <Button
            primary
            plain
            size="large"
            centered={!toggle}
            icon={toggle ? CheckCircleIcon : ShoppingCartIcon}
            loading={loading}
            loadingComponent={<CircularProgress />}
            disabled={loading}
            className={classNames(
                'product-trade__actions-item product-trade__actions-item--add-to-cart',
                {
                    'product-trade__actions-item--selected': toggle || loading
                }
            )}
            onClick={handleClick}
        >
            {toggle ? 'The item already in the cart' : 'Add to Cart'}
        </Button>
    );
};

ProductTradeActionAddToCart.propTypes = {};

export default ProductTradeActionAddToCart;
