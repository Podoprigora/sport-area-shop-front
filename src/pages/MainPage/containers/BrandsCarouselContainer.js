import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import BrandsCarousel from '../../components/BrandsCarousel';

import data from '../../../../remote/json/brands.json';

const BrandsCarouselContainer = (props) => {
    const handleItemClick = useCallback((item, ev) => {
        console.log(item);
    }, []);

    return <BrandsCarousel data={data} {...props} onItemClick={handleItemClick} />;
};

export default BrandsCarouselContainer;
