import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Product = React.forwardRef(function Product(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('product', className)} {...other} ref={ref}>
            {children}
        </div>
    );
});

Product.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Product;
