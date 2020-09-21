import React from 'react';
import PropTypes from 'prop-types';
import { Page, PageAside, PageContent, PageSection } from '@components/Page';
import CatalogTopseller from '@pages/CatalogPage/components/CatalogTopseller';

const ProdcutPageView = (props) => {
    return (
        <Page className="product-page">
            <PageSection className="product-page__main-section">
                <PageContent className="product-page__content">Page content</PageContent>
                <PageAside className="product-page__aside">Page Aside</PageAside>
            </PageSection>
            <PageSection>
                <CatalogTopseller />
            </PageSection>
        </Page>
    );
};

ProdcutPageView.propTypes = {};

export default ProdcutPageView;
