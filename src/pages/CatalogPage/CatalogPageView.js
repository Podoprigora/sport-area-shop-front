import React, { memo } from 'react';

import Hidden from '@ui/Hidden';
import FlexRow from '@ui/FlexRow';
import { StickyContainer, StickyItem } from '@ui/Sticky';

import { Page, PageSection, PageAside, PageContent, PageHeader } from '@components/Page';
import Heading from '@ui/Heading';
import CatalogFilters from './components/CatalogFilters';
import CatalogGrid from './components/CatalogGrid';
import CatalogTbar from './components/CatalogTbar';
import CatalogFiltersMobile from './components/CatalogFilters/CatalogFiltersMobile';
import CatalogTopseller from './components/CatalogTopseller';

const CatalogPageView = (props) => {
    return (
        <Page className="catalog-page">
            <PageHeader>
                <Heading size="3" gutterBottom={false}>
                    Catalog
                </Heading>
            </PageHeader>
            <PageSection className="catalog-page__main-section">
                <CatalogTbar />
                <StickyContainer>
                    <FlexRow noWrap className="catalog-page__layout">
                        <Hidden lgDown component={null}>
                            <PageAside className="catalog-page__aside">
                                <StickyItem
                                    className="catalog-page__aside-sticky"
                                    scrollbar
                                    minHeight={400}
                                >
                                    <CatalogFilters />
                                    <CatalogFiltersMobile />
                                </StickyItem>
                            </PageAside>
                        </Hidden>
                        <PageContent>
                            <CatalogGrid />
                        </PageContent>
                    </FlexRow>
                </StickyContainer>
            </PageSection>
            <PageSection>
                <CatalogTopseller />
            </PageSection>
        </Page>
    );
};

export default memo(CatalogPageView);
