import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Format from '@utils/Format';
import Calc from '@utils/Calc';
import {
    SummaryList,
    SummaryListItem,
    SummaryListItemLabel,
    SummaryListItemValue
} from '@ui/SummaryList';

const getQtyItemsText = (qty = 0) => {
    if (!qty) {
        return null;
    }

    let itemText = 'items';

    if (qty === 1) {
        itemText = 'item';
    }

    return `(${qty} ${itemText})`;
};

const CartSummary = (props) => {
    const { qty = 0, price = 0, vat = 0, currency } = props;

    if (!qty) {
        return null;
    }

    const formatedPrice = Format.price(price, currency);

    const excludedVat = Calc.exludeVat(price, vat);
    const formatedVat = excludedVat && Format.price(excludedVat, currency);
    const vatPercent = vat > 0 && vat < 1 ? vat * 100 : vat;

    return (
        <SummaryList className="cart__summary cart-window__summary">
            <SummaryListItem>
                <SummaryListItemLabel>Subtotal {getQtyItemsText(qty)}</SummaryListItemLabel>
                <SummaryListItemValue>{formatedPrice}</SummaryListItemValue>
            </SummaryListItem>
            <SummaryListItem>
                <SummaryListItemLabel>Shipping</SummaryListItemLabel>
                <SummaryListItemValue>€ 0.00</SummaryListItemValue>
            </SummaryListItem>
            <SummaryListItem size="large">
                <SummaryListItemLabel>Total</SummaryListItemLabel>
                <SummaryListItemValue>{formatedPrice}</SummaryListItemValue>
            </SummaryListItem>
            {formatedVat && (
                <SummaryListItem size="small" className="u-color-grey">
                    <SummaryListItemLabel>Incl. {vatPercent}% VAT</SummaryListItemLabel>
                    <SummaryListItemValue>{formatedVat}</SummaryListItemValue>
                </SummaryListItem>
            )}
        </SummaryList>
    );
};

CartSummary.propTypes = {
    qty: PropTypes.number,
    price: PropTypes.number,
    currency: PropTypes.string,
    vat: PropTypes.number
};

export default memo(CartSummary);
