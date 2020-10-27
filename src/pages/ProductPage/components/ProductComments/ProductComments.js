import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Panel, { PanelHeader, PanelBody } from '@ui/Panel';

import ProductCommentsTbar from './ProductCommentsTbar';
import ProductCommentsList from './ProductCommentsList';
import ProductCommentsMask from './ProductCommentsMask';
import ProductCommentEditorWindow from './ProductCommentEditorWindow';
import ProductCommentsPanelHeader from './ProductCommentsPanelHeader';

const ProductComments = (props) => {
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

ProductComments.propTypes = {};

export default ProductComments;
