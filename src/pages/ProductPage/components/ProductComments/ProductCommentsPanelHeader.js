import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader } from '@ui/Panel';
import MessageSquareIcon from '@ui/svg-icons/feather/MessageSquareIcon';
import { useProductPageState } from '@pages/ProductPage/context';
import { useProductPageSelectors } from '@pages/ProductPage/context/productPageSelectors';

const ProductCommentsPanelHeader = (props) => {
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
