import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useWindowManager } from '@ui/WindowManager';
import Button from '@ui/Button';
import useEventCallback from '@ui/hooks/useEventCallback';
import {
    useProductPageActions,
    useProductPageSelectors,
    useProductPageState
} from '@pages/ProductPage/context';

import ProductCommentsSortByDropdown from './ProductCommentsSortByDropdown';

const ProductCommentsTbar = (props) => {
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

ProductCommentsTbar.propTypes = {};

export default ProductCommentsTbar;
