import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductPageProvider from './context';
import ProductPageEffects from './ProductPageEffects';

import ProductPageView from './ProductPageView';

const ProductPage = (props) => {
    return (
        <ProductPageProvider>
            <ProductPageEffects>
                <ProductPageView />
            </ProductPageEffects>
        </ProductPageProvider>
    );
};

export default ProductPage;
