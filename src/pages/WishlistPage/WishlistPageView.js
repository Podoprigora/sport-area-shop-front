import React from 'react';
import PropTypes from 'prop-types';

import { Page, PageHeader, PageSection } from '@components/Page';
import Heading from '@ui/Heading';
import WisthlistTbar from './components/WishlistTbar';
import WishlistGrid from './components/WishlistGrid';

const WishlistPageView = (props) => {
    return (
        <Page>
            <PageHeader>
                <Heading size="3" gutterBottom={false}>
                    Wish List
                </Heading>
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
