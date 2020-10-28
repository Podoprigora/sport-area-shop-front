import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { useProductPageActions } from './context';

const ProductPageEffects = (props) => {
    const { children } = props;

    const { id } = useParams();
    const location = useLocation();
    const { asyncFetchProduct, asyncRefetchComments, selectSize } = useProductPageActions();

    const selectedSize = location?.state?.selectedSize;

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

    useEffect(() => {
        if (selectedSize) {
            selectSize(selectedSize);
        }
    }, [selectedSize, selectSize]);

    return children;
};

ProductPageEffects.propTypes = {
    children: PropTypes.node
};

export default ProductPageEffects;
