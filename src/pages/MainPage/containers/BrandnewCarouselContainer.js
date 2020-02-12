import React, { useCallback } from 'react';

import BrandnewCarousel from '../../components/BrandnewCarousel';

import data from '../../../../remote/json/brandnew.json';

const BrandnewCarouselContainer = () => {
    const handleItemClick = useCallback((item, ev) => {
        console.log(item);
    }, []);

    return <BrandnewCarousel data={data} onItemClick={handleItemClick} />;
};

export default BrandnewCarouselContainer;
