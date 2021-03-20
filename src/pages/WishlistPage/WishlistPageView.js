import React from 'react';

import { Page, PageHeader, PageSection, PageTitle } from '@components/Page';
import WisthlistTbar from './components/WishlistTbar';
import WishlistGrid from './components/WishlistGrid';

const WishlistPageView = () => {
    return (
        <Page>
            <PageHeader>
                <PageTitle>Wish List</PageTitle>
            </PageHeader>
            <PageSection>
                <WisthlistTbar />
                <WishlistGrid />
            </PageSection>
        </Page>
    );
};

export default WishlistPageView;
