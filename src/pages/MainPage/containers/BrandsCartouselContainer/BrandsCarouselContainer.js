import React from 'react';
import PropTypes from 'prop-types';
import BrandsCarousel from '../../../components/BrandsCarousel';

import data from '../../../../../remote/json/brands.json';

const BrandsCarouselContainer = (props) => {
    return <BrandsCarousel data={data} {...props} />;
};

export default BrandsCarouselContainer;
