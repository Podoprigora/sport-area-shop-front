import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Panel, PanelBody } from '@ui/Panel';

import ProductCommentsTbar from './ProductCommentsTbar';
import ProductCommentsList from './ProductCommentsList';
import ProductCommentsMask from './ProductCommentsMask';
import ProductCommentEditorWindow from './ProductCommentEditorWindow';
import ProductCommentsPanelHeader from './ProductCommentsPanelHeader';

const ProductComments = () => {
    const location = useLocation();
    const nodeRef = useRef(null);

    useEffect(() => {
        if (nodeRef.current && location?.state?.anchorToComments) {
            nodeRef.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [location]);

    return (
        <>
            <Panel ref={nodeRef}>
                <ProductCommentsPanelHeader />
                <PanelBody style={{ position: 'relative' }}>
                    <ProductCommentsMask />
                    <ProductCommentsTbar />
                    <ProductCommentsList />
                </PanelBody>
            </Panel>
            <ProductCommentEditorWindow />
        </>
    );
};

export default ProductComments;
