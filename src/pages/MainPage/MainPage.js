import React from 'react';
import PropTypes from 'prop-types';

import AdwSlider from '@pages/components/AdwSlider';
import BrandsCarousel from '@pages/components/BrandsCarousel';
import BrandnewCarousel from '@pages/components/BrandnewCarousel';
import TopsellerCarousel from '@pages/components/TopsellerCarousel';
import useMainPageBootstrapData from './hooks/useMainPageBootstrapData';

const MainPage = (props) => {
    const {
        isLoading,
        error,
        data: {
            adwSlidersData = null,
            brandsData = null,
            brandnewData = null,
            topsellerData = null
        }
    } = useMainPageBootstrapData();

    console.log(isLoading, 'Error:', error, adwSlidersData);

    return (
        <div className="page">
            <div className="page__section">
                <AdwSlider data={adwSlidersData} />
            </div>
            <div className="page__section">
                <BrandsCarousel data={brandsData} />
            </div>
            <div className="page__section">
                <BrandnewCarousel data={brandnewData} />
            </div>
            <div className="page__section">
                <TopsellerCarousel data={topsellerData} />
            </div>
        </div>
    );
};

MainPage.propTypes = {};

export default MainPage;
