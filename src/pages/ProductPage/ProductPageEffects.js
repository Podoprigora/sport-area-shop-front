import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useProductPageActions } from './context';

const ProductPageEffects = (props) => {
    const { children } = props;

    const { id } = useParams();
    const { asyncFetchProduct, asyncRefetchComments } = useProductPageActions();

    const fetchProduct = useCallback(async () => {
        if (!asyncFetchProduct) {
            return;
        }

        try {
            await asyncFetchProduct(id);
        } catch (e) {
            console.error(e);
        }
    }, [id, asyncFetchProduct]);

    const refetchComments = useCallback(async () => {
        if (!asyncRefetchComments) {
            return;
        }

        try {
            await asyncRefetchComments();
        } catch (e) {
            console.error(e);
        }
    }, [asyncRefetchComments]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    useEffect(() => {
        refetchComments();
    }, [refetchComments]);

    return children;
};

ProductPageEffects.propTypes = {
    children: PropTypes.node
};

export default ProductPageEffects;
