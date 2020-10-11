import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Panel, { PanelHeader, PanelBody } from '@ui/Panel';
import MessageSquareIcon from '@svg-icons/feather/MessageSquareIcon';

import data from '@remote/json/product-comments.json';
import ProductCommentsTbar from './ProductCommentsTbar';
import ProductCommentsList from './ProductCommentsList';

const ProductComments = (props) => {
    const nodeRef = useRef(null);

    useEffect(() => {
        if (nodeRef.current) {
            nodeRef.current.scrollIntoView();
        }
    }, []);

    return (
        <Panel ref={nodeRef}>
            <PanelHeader title="Comments" icon={MessageSquareIcon}>
                <span className="u-text-large">(10)</span>
            </PanelHeader>
            <PanelBody>
                <ProductCommentsTbar />
                <ProductCommentsList className="paper paper--outlined" />
            </PanelBody>
        </Panel>
    );
};

ProductComments.propTypes = {};

export default ProductComments;
