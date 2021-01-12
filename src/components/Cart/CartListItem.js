import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';

import { ListItem } from '@ui/List';
import NumberInput from '@ui/NumberInput';
import Format from '@utils/Format';
import IconButton from '@ui/IconButton';
import useEventCallback from '@ui/hooks/useEventCallback';
import XCircleIcon from '@ui/svg-icons/feather/XCircleIcon';

const CartListItem = (props) => {
    const {
        id,
        name,
        brand,
        image,
        size,
        price,
        currency,
        qty,
        amount,
        onChange,
        onDelete
    } = props;
    const quantityInputRef = useRef(null);

    const handleQuantityChange = useEventCallback((ev) => {
        if (onChange) {
            const inputValue = ev.target.value;

            if (inputValue > 0) {
                onChange(ev, { id, qty: parseInt(inputValue, 10) });
            }
        }
    });

    const handleQuantityInputFocus = useEventCallback((ev) => {
        if (quantityInputRef.current) {
            quantityInputRef.current.select();
        }
    });

    const handleDeleteBtnClick = useEventCallback((ev) => {
        if (onDelete) {
            onDelete(ev, { id });
        }
    });

    const formatedAmount = Format.price(amount, currency);

    return (
        <ListItem className="cart__item cart__product">
            <IconButton
                size="medium"
                className=" product__icon-button"
                onClick={handleDeleteBtnClick}
            >
                <XCircleIcon />
            </IconButton>
            <div className="cart__item-col product__image-container">
                <img src={image} alt={name} className="product__image" />
            </div>
            <div className="cart__item-col  product__detailes cart__col">
                <div className="product__title">
                    <div className="product__brand">{brand}</div>
                    <div className="product__name">{name}</div>
                </div>
                <div className="cart__item-col  product__size-container">
                    <div className="product__size-label">Size: </div>
                    <div className="product__size-value">{size}</div>
                </div>
            </div>
            <div className="cart__item-col  product__qty">
                <NumberInput
                    value={qty}
                    fullWidth
                    ref={quantityInputRef}
                    inputProps={{
                        style: { textAlign: 'center' }
                    }}
                    onChange={handleQuantityChange}
                    onFocus={handleQuantityInputFocus}
                />
            </div>
            <div className="cart__item-col  product__price">{formatedAmount}</div>
        </ListItem>
    );
};

CartListItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    brand: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    sizeId: PropTypes.number,
    price: PropTypes.number,
    currency: PropTypes.string,
    qty: PropTypes.number,
    amount: PropTypes.number,
    onChange: PropTypes.func,
    onDelete: PropTypes.func
};

export default memo(CartListItem);
