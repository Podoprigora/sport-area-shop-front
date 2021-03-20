import React from 'react';

import { useEventCallback } from '@ui/utils';
import { useWindowManager } from '@ui/WindowManager';
import { Button } from '@ui/Button';

import {
    useProductPageActions,
    useProductPageSelectors,
    useProductPageState
} from '@pages/ProductPage/context';

import ProductCommentsSortByDropdown from './ProductCommentsSortByDropdown';

const ProductCommentsTbar = () => {
    const state = useProductPageState();
    const { commentsSort } = useProductPageSelectors(state);
    const { selectCommentsSort } = useProductPageActions();

    const { openWindow } = useWindowManager();

    const handleAddCommentClick = useEventCallback((ev) => {
        openWindow('ProductCommentEditorWindow');
    });

    const handleSortChange = useEventCallback((ev, value) => {
        if (selectCommentsSort) {
            selectCommentsSort(value);
        }
    });

    return (
        <div className="tbar">
            <ProductCommentsSortByDropdown value={commentsSort} onChange={handleSortChange} />
            <Button primary style={{ marginLeft: 'auto' }} onClick={handleAddCommentClick}>
                Add Comment
            </Button>
        </div>
    );
};

export default ProductCommentsTbar;
