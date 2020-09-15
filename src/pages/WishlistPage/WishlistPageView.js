import React from 'react';
import PropTypes from 'prop-types';

import { Page, PageHeader, PageSection, PageTitle } from '@components/Page';
import WisthlistTbar from './components/WishlistTbar';
import WishlistGrid from './components/WishlistGrid';

const WishlistPageView = (props) => {
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

WishlistPageView.propTypes = {};

export default WishlistPageView;
