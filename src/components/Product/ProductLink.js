import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useEventCallback from '@ui/hooks/useEventCallback';

const ProductLink = (props) => {
    const { children, className, ...other } = props;

    const handleClick = useEventCallback((ev) => {
        ev.preventDefault();
    });

    return (
        <a href="#" className={classNames('product__link', className)} onClick={handleClick}>
            {children}
        </a>
    );
};

ProductLink.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default ProductLink;
