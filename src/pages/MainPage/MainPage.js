import React from 'react';
import PropTypes from 'prop-types';

import Skeleton from '@components/Skeleton';
import AdwSlider from '@pages/components/AdwSlider';
import BrandsCarousel from '@pages/components/BrandsCarousel';
import BrandnewCarousel from '@pages/components/BrandnewCarousel';
import TopsellerCarousel from '@pages/components/TopsellerCarousel';
import ProductSkeleton from '@pages/components/Skeletons/ProductSkeleton';
import ProductsCarouselSkeleton from '@pages/components/Skeletons/ProductsCarouselSkeleton';

import useMainPageBootstrapData from './hooks/useMainPageBootstrapData';

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
