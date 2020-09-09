import React from 'react';
import PropTypes from 'prop-types';

import { Page, PageSection } from '@components/Page';
import AdwSlider from '@components/AdwSlider';
import BrandsCarousel from '@components/BrandsCarousel';
import BrandnewCarousel from '@components/BrandnewCarousel';
import TopsellerCarousel from '@components/TopsellerCarousel';

import useMainPageBootstrapData from './useMainPageBootstrapData';

const MainPage = (props) => {
    const {
        loading,
        data: { adwSlidersData, brandsData, brandnewData, topsellerData }
    } = useMainPageBootstrapData();

    return (
        <Page>
            <PageSection>
                <AdwSlider data={adwSlidersData} loading={loading} />
            </PageSection>
            <PageSection>
                <BrandsCarousel data={brandsData} />
            </PageSection>
            <PageSection>
                <BrandnewCarousel data={brandnewData} loading={loading} />
            </PageSection>
            <PageSection>
                <TopsellerCarousel data={topsellerData} loading={loading} />
            </PageSection>
        </Page>
    );
};

export default MainPage;
