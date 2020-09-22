import React from 'react';
import PropTypes from 'prop-types';

import { Page, PageAside, PageContent, PageSection } from '@components/Page';
import CatalogTopseller from '@pages/CatalogPage/components/CatalogTopseller';
import ProductTrade from './components/ProductTrade';

const sizes = ['XS', 'S', 'L', 'Xl'];

const ProductPageView = (props) => {
    return (
        <Page className="product-page">
            <PageSection className="product-page__main-section">
                <PageContent className="product-page__center">Page content</PageContent>
                <PageAside className="product-page__aside">
                    <ProductTrade />
                </PageAside>
            </PageSection>
            <PageSection>
                <CatalogTopseller />
            </PageSection>
        </Page>
    );
};

ProductPageView.propTypes = {};

export default ProductPageView;
