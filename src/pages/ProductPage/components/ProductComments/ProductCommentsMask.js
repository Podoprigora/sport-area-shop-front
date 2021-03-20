import React, { useMemo } from 'react';

import { Mask, MaskProgress } from '@ui/Mask';
import { CircularProgress } from '@ui/CircularProgress';

import { useProductPageSelectors, useProductPageState } from '@pages/ProductPage/context';

const ProductCommentsMask = () => {
    const state = useProductPageState();
    const { commentsLoading: open } = useProductPageSelectors(state);

    return useMemo(() => {
        return (
            <Mask open={open}>
                <MaskProgress primary>
                    <CircularProgress size="large" />
                </MaskProgress>
            </Mask>
        );
    }, [open]);
};

export default ProductCommentsMask;
