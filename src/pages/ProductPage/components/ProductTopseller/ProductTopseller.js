import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TopsellerCarouselWithFetchingDataOnDemand from '@components/TopsellerCarouselWithFetchingDataOnDemand';

// TODO: Get cagegoryId from context after product initial data was loaded
const ProductTopseller = (props) => {
    const [categoryId, setCategoryId] = useState(null);

    setTimeout(() => {
        setCategoryId(100);
    }, 500);

    return <TopsellerCarouselWithFetchingDataOnDemand categoryId={categoryId} />;
};

export default ProductTopseller;
