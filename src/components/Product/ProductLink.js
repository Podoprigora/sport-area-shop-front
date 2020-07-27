import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProductLink = (props) => {
    const { children, className, ...other } = props;

    return (
        <a href="#" className={classNames('product__link', className)}>
            {children}
        </a>
    );
};

ProductLink.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default ProductLink;
