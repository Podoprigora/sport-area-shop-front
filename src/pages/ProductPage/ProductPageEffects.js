import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';

import { useNotification } from '@ui/Notification';
import { useAsyncError } from '@ui/ErrorBoundary';
import { useProductPageActions } from './context';

const ProductPageEffects = (props) => {
    const { children } = props;

    const { id } = useParams();
    const location = useLocation();
    const { showAlert } = useNotification();
    const asyncThrowError = useAsyncError();
    const { asyncFetchProduct, asyncRefetchComments, selectSize } = useProductPageActions();

    const selectedSize = location?.state?.selectedSize;

    const fetchProduct = useCallback(async () => {
        if (!asyncFetchProduct) {
            return;
        }

        try {
            await asyncFetchProduct(id);
        } catch (e) {
            asyncThrowError(e);
        }
    }, [id, asyncFetchProduct, asyncThrowError]);

    const refetchComments = useCallback(async () => {
        if (!asyncRefetchComments) {
            return;
        }

        try {
            await asyncRefetchComments();
        } catch (e) {
            showAlert({
                type: 'error',
                frame: true,
                message: 'Server error occurred!'
            });
        }
    }, [asyncRefetchComments, showAlert]);

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
