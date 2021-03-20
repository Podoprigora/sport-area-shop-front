import React, { useMemo } from 'react';

import { PanelHeader } from '@ui/Panel';
import { MessageSquareIcon } from '@ui/svg-icons/feather';

import { useProductPageState } from '@pages/ProductPage/context';
import { useProductPageSelectors } from '@pages/ProductPage/context/productPageSelectors';

const ProductCommentsPanelHeader = () => {
    const state = useProductPageState();
    const { commentsCount = 0 } = useProductPageSelectors(state);

    return useMemo(() => {
        return (
            <PanelHeader title="Comments" icon={MessageSquareIcon}>
                {commentsCount > 0 && <span className="u-text-large">{`(${commentsCount})`}</span>}
            </PanelHeader>
        );
    }, [commentsCount]);
};

export default ProductCommentsPanelHeader;
