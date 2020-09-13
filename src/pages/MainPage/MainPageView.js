import React from 'react';
import PropTypes from 'prop-types';

import { Page, PageSection } from '@components/Page';
import AdwSlider from '@components/AdwSlider';
import BrandsCarousel from '@components/BrandsCarousel';
import BrandnewCarousel from '@components/BrandnewCarousel';
import TopsellerCarousel from '@components/TopsellerCarousel';

const MainPageView = (props) => {
    const { loading, adwSlidersData, brandsData, brandnewData, topsellerData } = props;

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

MainPageView.propTypes = {
    loading: PropTypes.bool,
    adwSlidersData: PropTypes.array,
    brandsData: PropTypes.array,
    brandnewData: PropTypes.array,
    topsellerData: PropTypes.array
};

export default MainPageView;
