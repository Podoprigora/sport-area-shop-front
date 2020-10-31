import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const ProductLink = (props) => {
    const { children, id, anchorToComments, selectedSize, className, disabled, ...other } = props;

    const to = {};

    if (id && !disabled) {
        to.pathname = `/product/${id}`;
    }

    if (anchorToComments) {
        to.state = { ...to.state, anchorToComments: true };
    }

    if (selectedSize) {
        to.state = { ...to.state, selectedSize };
    }

    return (
        <Link to={to} className={classNames('product__link', className)} {...other}>
            {children}
        </Link>
    );
};

ProductLink.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.number,
    anchorToComments: PropTypes.bool,
    selectedSize: PropTypes.number,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default ProductLink;
