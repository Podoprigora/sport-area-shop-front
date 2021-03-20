import React, { memo } from 'react';

import { Hidden } from '@ui/Hidden';
import { FlexRow } from '@ui/FlexRow';
import { StickyContainer, StickyItem } from '@ui/Sticky';

import { Page, PageSection, PageAside, PageContent, PageHeader, PageTitle } from '@components/Page';
import CatalogFilters from './components/CatalogFilters';
import CatalogGrid from './components/CatalogGrid';
import CatalogTbar from './components/CatalogTbar';
import CatalogFiltersMobile from './components/CatalogFilters/CatalogFiltersMobile';
import CatalogTopseller from './components/CatalogTopseller';

const CatalogPageView = () => {
    return (
        <Page className="catalog-page">
            <PageHeader>
                <PageTitle>Catalog</PageTitle>
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
