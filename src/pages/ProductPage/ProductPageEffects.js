import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ProductsService from '@services/ProductsService';
import useMountedRef from '@ui/hooks/useMountedRef';
import { useProductPageActions } from './context';

const ProductPageEffects = (props) => {
    const { children } = props;

    const { id } = useParams();
    const isMoutedRef = useMountedRef();
    const { toggleLoading, requestProduct, receiveProduct } = useProductPageActions();

    const fetchProduct = useCallback(async () => {
        try {
            requestProduct(true);

            const response = await ProductsService.fetchOne(id);

            receiveProduct(response);
        } catch (e) {
            console.error(e);

            if (isMoutedRef.current) {
                toggleLoading(false);
            }
        }
    }, [id, isMoutedRef, toggleLoading, requestProduct, receiveProduct]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return children;
};

ProductPageEffects.propTypes = {
    children: PropTypes.node
};

export default ProductPageEffects;
