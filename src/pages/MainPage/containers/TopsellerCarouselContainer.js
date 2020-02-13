import React, { useCallback } from 'react';
import TopsellerCarousel from '@pages/components/TopsellerCarousel';

import data from '@remote/json/topseller.json';

const TopsellerCarouselContainer = () => {
    const handleItemClick = useCallback((item, ev) => {
        console.log(item);
    }, []);

    return <TopsellerCarousel data={data} onItemClick={handleItemClick} />;
};

export default TopsellerCarouselContainer;
