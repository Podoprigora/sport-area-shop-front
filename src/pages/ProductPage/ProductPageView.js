import React from 'react';
import PropTypes from 'prop-types';

import { Page, PageAside, PageContent, PageSection } from '@components/Page';
import ProductTrade from './components/ProductTrade';
import ProductGallery from './components/ProductGallery';
import ProductTopseller from './components/ProductTopseller';
import ProductFeatures from './components/ProductFeatures';

const ProductPageView = (props) => {
    return (
        <Page className="product-page">
            <PageSection className="product-page__main-section">
                <PageContent className="product-page__center">
                    <PageSection>
                        <ProductGallery />
                    </PageSection>

                    <ProductFeatures />
                </PageContent>
                <PageAside className="product-page__aside">
                    <ProductTrade />
                </PageAside>
            </PageSection>
            <PageSection>
                <ProductTopseller />
            </PageSection>
        </Page>
    );
};

ProductPageView.propTypes = {};

export default ProductPageView;
