import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useWindowManager } from '@ui/WindowManager';
import Button from '@ui/Button';
import useEventCallback from '@ui/hooks/useEventCallback';
import ProductCommentsSortByDropdown from './ProductCommentsSortByDropdown';

const ProductCommentsTbar = (props) => {
    const { openWindow } = useWindowManager();

    const handleAddCommentClick = useEventCallback((ev) => {
        openWindow('ProductCommentEditorWindow');
    });

    return (
        <div className="tbar">
            <ProductCommentsSortByDropdown style={{ minWidth: '14rem' }} />
            <Button primary style={{ marginLeft: 'auto' }} onClick={handleAddCommentClick}>
                Add Comment
            </Button>
        </div>
    );
};

ProductCommentsTbar.propTypes = {};

export default ProductCommentsTbar;
