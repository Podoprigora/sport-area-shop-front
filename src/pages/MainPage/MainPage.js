import React from 'react';
import PropTypes from 'prop-types';

import AdwSlider from '@components/AdwSlider';
import BrandsCarousel from '@components/BrandsCarousel';
import BrandnewCarousel from '@components/BrandnewCarousel';
import TopsellerCarousel from '@components/TopsellerCarousel';

import useMainPageBootstrapData from './useMainPageBootstrapData';

const MainPage = (props) => {
    const {
        isLoading,
        data: { adwSlidersData, brandsData, brandnewData, topsellerData }
    } = useMainPageBootstrapData();

    return (
        <div className="page">
            <div className="page__section">
                <AdwSlider data={adwSlidersData} isLoading={isLoading} />
            </div>
            <div className="page__section">
                <BrandsCarousel data={brandsData} />
            </div>
            <div className="page__section">
                <BrandnewCarousel data={brandnewData} isLoading={isLoading} />
            </div>
            <div className="page__section">
                <TopsellerCarousel data={topsellerData} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default MainPage;
